import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';

import './Search.css';
import { searchTags } from './duck';

class Search extends Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: [],
        };
        const languages = [
            {
                name: 'C',
                year: 1972,
            },
            {
                name: 'Elm',
                year: 2012,
            },
        ];

        // Teach Autosuggest how to calculate suggestions for any given input value.
        this.getSuggestions = (suggestions) => {
            suggestions.forEach(value => {
                const inputValue = value.trim().toLowerCase();
                const inputLength = inputValue.length;

                return inputLength === 0 ? [] : languages.filter(lang =>
                    lang.name.toLowerCase().slice(0, inputLength) === inputValue
                );
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        const suggestions = this.props.search.data.map(data => data.name);
        this.setState({
            suggestions: suggestions,
        })
        console.log(suggestions)
    }

        onChange = (event, { newValue }) => {
            this.setState({
                value: newValue,
            });

            this.props.searchTags(this.state.value);
        };

        // Autosuggest will call this function every time you need to update suggestions.
        // You already implemented this logic above, so just use it.
        onSuggestionsFetchRequested = ({ value }) => {
            this.setState({
                suggestions: this.getSuggestions(this.state.suggestions),
            });
        };

        // Autosuggest will call this function every time you need to clear suggestions.
        onSuggestionsClearRequested = () => {
            this.setState({
                suggestions: [],
            });
        };

        render() {
            console.log(this.state)
            console.log(this.props)
            // When suggestion is clicked, Autosuggest needs to populate the input
            // based on the clicked suggestion. Teach Autosuggest how to calculate the
            // input value for every given suggestion.
            const getSuggestionValue = suggestion => suggestion.name;

            // Use your imagination to render suggestions.
            const renderSuggestion = suggestion => (
                <div className="p-relative">
                    {suggestion}
                </div>
            );

            const { value, suggestions } = this.state;

            // Autosuggest will pass through all these props to the input.
            const inputProps = {
                className: 'form-control mx-lg-3',
                placeholder: 'Search by location or technology...',
                value,
                onChange: this.onChange,
            };

            return (
                <div>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                </div>
            );
        }
}

const mapStateToProps = ({ search }) => {
    return {
        search,
    }
};

const mapDispatchToProps = {
    searchTags,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
