import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { withRouter } from 'react-router-dom';
import './Search.css';
import { searchTags, clearSuggestions, updateInputValue } from './duck';

class Search extends Component {
        static propTypes = {
            search: PropTypes.shape({
                value: PropTypes.string,
            }).isRequired,
            suggestions: PropTypes.arrayOf(PropTypes.object),
            searchTags: PropTypes.func.isRequired,
            clearSuggestions: PropTypes.func.isRequired,
            updateInputValue: PropTypes.func.isRequired,
        };

        static defaultProps = {
            suggestions: {},
        };

        onChange = (event, { newValue, method }) => {
            if (this.props.search.value !== newValue && newValue.length !== 0) {
                if (method === 'type' || method === 'enter') {
                    this.props.searchTags(newValue);
                    this.getSuggestions(newValue);
                }
            }
        }

        // Autosuggest will call this function every time suggestions need to be
        // updated.
        onSuggestionsFetchRequested = ({ value }) => {
            this.props.updateInputValue(value);
        };

        onSuggestionSelected = (event, {
            suggestion,
            suggestionValue,
            suggestionIndex,
            sectionIndex,
            method
        }) => {
            // Suggestion is tag
            if (sectionIndex === 0) {
                this.props.history.push({
                    pathname: `/search/${suggestionValue}`,
                    state: {
                        wishListData: this.props.wishList.data,
                    }
                });
            } else if (sectionIndex === 1) {
                this.props.history.push(`/event/${suggestion.alias}`);
            } else {
                this.props.history.push({
                    pathname: `/speaker/${suggestionValue}`,
                    state: {
                        wishListData: this.props.wishList.data,
                        speaker: suggestion,
                    }
                })
            }
        }

        // When suggestion is clicked, Autosuggest needs to populate the input
        // based on the clicked suggestion.
        getSuggestionValue = (suggestion) => {
            return suggestion.name;
        }

        // Teach Autosuggest where to find the suggestions for every section,
        // when multiSection={true}.
        getSectionSuggestions = (section) => {
            return section.data;
        }

        // Calculate suggestions for any given input value.
        getSuggestions = (value) => {
            return this.props.suggestions
                    .map(section => {
                      return {
                        title: section.title,
                        data: section.data.filter(suggestion => suggestion.name)
                      };
                    })
                    .filter(section => section.data.length > 0);
        }

        // Section title, when multiSection={true}.
        renderSectionTitle = (section) => {
            if (section.data.length === 0) { return; }
            return (
                <strong>{section.title}</strong>
            );
        }

        renderSuggestion = (suggestion) => {
            // show speaker pictures
            if (suggestion.pictureUrl) {
                return (
                    <span>
                        <img
                            className="rounded-circle mr-2"
                            src={suggestion.pictureUrl}
                            alt={suggestion.name}
                            width="40"
                            height="40"
                        />
                        {suggestion.name}
                    </span>);
            }

            return <span>{suggestion.name}</span>;
        }

        render() {
            const { value } = this.props.search;
            const { suggestions } = this.props;

            // Autosuggest will pass through all these props to the input.
            const inputProps = {
                className: 'form-control',
                placeholder: 'Search by name or technology...',
                value,
                onChange: this.onChange,
            };

            return (
                <Autosuggest
                    multiSection={true}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.props.clearSuggestions}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    renderSectionTitle={this.renderSectionTitle}
                    getSectionSuggestions={this.getSectionSuggestions}
                    inputProps={inputProps}
                    onSuggestionSelected={this.onSuggestionSelected}
                />
            );
        }
}

const mapStateToProps = ({ search, wishList }) => {
    const suggestions = [
        {
            title: 'tags',
            data: [],
        },
        {
            title: 'conferences',
            data: [],
        },
        {
            title: 'speakers',
            data: [],
        },
        {
            title: 'empty',
            data: [],
        },
    ];

    search.suggestions.forEach((data) => {
        if (data.resourceType === 'tag') {
            suggestions[0].data.push({ name: data.name });
        } else if (data.resourceType === 'conference') {
            suggestions[1].data.push({ name: data.name, alias: data.alias });
        } else if (data.resourceType === 'speaker') {
            suggestions[2].data.push({
                name: data.name,
                pictureUrl: data.pictureUrl,
                id: data._id,
                twitterName: data.twitterName
            });
        }
    });

    return {
        search,
        suggestions,
        wishList,
    };
};

const mapDispatchToProps = {
    searchTags,
    clearSuggestions,
    updateInputValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
