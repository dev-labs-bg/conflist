import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';

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

        // Section title, when multiSection={true}.
        renderSectionTitle = (section) => {
            return (
                <strong>{section.title}</strong>
            );
        }

        renderSuggestion = (suggestion) => {
            return <span>{suggestion.name}</span>;
        }


        render() {
            const { value } = this.props.search;
            const { suggestions } = this.props;

            // Autosuggest will pass through all these props to the input.
            const inputProps = {
                className: 'form-control mx-lg-3',
                placeholder: 'Search by location or technology...',
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
                />
            );
        }
}

const mapStateToProps = ({ search }) => {
    const suggestions = [
        {
            title: 'tags',
            data: [],
        },
        {
            title: 'conferences',
            data: [],
        },
    ];

    search.suggestions.forEach((data) => {
        if (data.resourceType === 'tag') {
            suggestions[0].data.push({ name: data.name });
        } else if (data.resourceType === 'conference') {
            suggestions[1].data.push({ name: data.name });
        }
    });
    return {
        search,
        suggestions,
    };
};

const mapDispatchToProps = {
    searchTags,
    clearSuggestions,
    updateInputValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
