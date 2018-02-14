import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';

import './Search.css';
import { searchTags, clearSuggestions } from './duck';

class Search extends Component {
        onChange = (event, { newValue }) => {
            this.props.searchTags(newValue);
            this.getSuggestions(newValue);
        }

        escapeRegexCharacters = (str) => {
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        getSuggestions = (value) => {
            const escapedValue = this.escapeRegexCharacters(value.trim());

            if (escapedValue === '') {
                return [];
            }

            const regex = new RegExp('^' + escapedValue, 'i');

            return this.props.suggestions
                    .map(section => {
                      return {
                        title: section.title,
                        data: section.data.filter(suggestion => regex.test(suggestion.name))
                      };
                    })
                    .filter(section => section.data.length > 0);
        }

        getSuggestionValue = (suggestion) => {
            return suggestion.name;
        }

        getSectionSuggestions = (section) => {
            return section.data;
        }

        renderSectionTitle = (section) => {
            // debugger
            // console.log(section)
            return (
                <strong>{section.title}</strong>
            );
        }

        renderSuggestion = (suggestion) => {
            // const suggestions = [];
            // suggestion.data.forEach(name => {
            //     suggestions.push(
            //         <span>{suggestion.data.name}</span>
            //     );
            // })
            return <span>{suggestion.name}</span>;
        }


        render() {
            const { value,
                 isLoading,
                 onChange,
                 searchTags,
                 clearSuggestions
             } = this.props.search;
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
                    onSuggestionsFetchRequested={this.searchTags}
                    onSuggestionsClearRequested={this.clearSuggestions}
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
        // tags: [ php, js, ...]
        // conferences: [ name ]
        // speakers: [ name ]
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
