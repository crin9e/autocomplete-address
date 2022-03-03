import React, { useState } from 'react';

const Autocomplete = (props) => {

    // minimal length of input before giving a list of suggestions
    const minInputLength = 0;


    const [suggestions, setSuggestions] = useState([]);
    const [input, setInput] = useState('');
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
    const [feedFromPredefined, setFeedFromPredefined] = useState(false);

    const data = props.data.suggestions;
    
    const handleSuggestionClick = (e) => {
        e.preventDefault()
        
        const inputValue = document.getElementById('autocomplete-input');

        const pickedValue = e.target.innerText;
        inputValue.value = pickedValue;
        setInput(pickedValue);

        let suggestionsArr = [];
        const predefinedArr = [...props.predefinedData.predefinedSuggestions];
        const dataArr = Object.entries(data);

        if (feedFromPredefined) {
            predefinedArr.map(function(e){
                suggestionsArr.push(`${e.postal_code}, ${e.result}`);
                })
            const regex = new RegExp(`${pickedValue}`, 'i');
            setSuggestions(suggestionsArr.sort().filter(value => regex.test(value)));
            console.log('feeding from predefined');
            const suggestionObj = {}
            suggestionObj.data = predefinedArr.filter(function(e){
                return `${e.postal_code}, ${e.result}` === pickedValue
            });
            props.setSuggestionObj(suggestionObj);
            setSuggestionsVisible(false);

        } else {
            // fill suggestionsArr with restricted/unrestricted values
            dataArr.filter(function(e){
                props.isStrict ? suggestionsArr.push(`${e[1].data.postal_code}, ${e[1].value}`):  suggestionsArr.push(`${e[1].data.postal_code}, ${e[1].unrestricted_value}`);
            })
            console.log('feeding from data');

            const regex = new RegExp(`${pickedValue}`, 'i');
                
            // filter suggestionArr with regex from picked value to update suggestions list
            setSuggestions(suggestionsArr.sort().filter(value => regex.test(value)));

            // create an object with the picked value
            const suggestionObj = dataArr.filter(function(e){
                return props.isStrict ? `${e[1].data.postal_code}, ${e[1].value}` === pickedValue:  `${e[1].data.postal_code}, ${e[1].unrestricted_value}` === pickedValue
            });

            props.setSuggestionObj(suggestionObj[0][1]);
            setSuggestionsVisible(false);
        }
    }

    const inputHadler = (e) => {
        setSuggestionsVisible(true);
        setFeedFromPredefined(true);
        props.setFeedFromPredefined(true);
        const value = e.target.value;
        if (value === '') {
        
            const predefinedArr = [...props.predefinedData.predefinedSuggestions];
            let suggestions = [];
            predefinedArr.map(function(e){
                suggestions.push(`${e.postal_code}, ${e.result}`);
            })
            setInput(value);
            setSuggestions(suggestions);

        } else {
            let suggestions = [];
            setFeedFromPredefined(false);
            props.setFeedFromPredefined(false);
            if (value.length > minInputLength) {
                let suggestionsArr = [];
                const dataArr = Object.entries(data);
                dataArr.filter(function(e){
                    props.isStrict ? suggestionsArr.push(`${e[1].data.postal_code}, ${e[1].value}`):  suggestionsArr.push(`${e[1].data.postal_code}, ${e[1].unrestricted_value}`);
                })
                const regex = new RegExp(`${value}`, 'i');
                suggestions = suggestionsArr.sort().filter(value => regex.test(value));
                setInput(value);
                setSuggestions(suggestions);
                }
        }
    }

    const suggestionWithHighlight = (suggestion) => {
        const regex = new RegExp(`${input}`, 'i');
        const matchFrom = regex.exec(suggestion).index;
        return (
            <h5 
                onClick={handleSuggestionClick}
            >
                   {suggestion.substr(0, matchFrom)}
                   <span className='suggestion-highlight'>{suggestion.substr(matchFrom, input.length)}</span>
                   {suggestion.substr(matchFrom + input.length, suggestion.length - matchFrom - input.length)}
            </h5>
        )
    }

    const renderSuggestions = () => {
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <div className="suggestions__list"
            style={{display: suggestionsVisible ? 'block' : 'none' }}
            >
                {suggestions.map((suggestion, index)=>
                    <div key={index} className='suggestion'>
                        {suggestionWithHighlight(suggestion)}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className='autocomplete__container'>
            <input type='text' 
            id="autocomplete-input" 
            autoComplete="off"
            onInput={inputHadler}
            onClick={inputHadler}
            disabled = {props.isDisabled ? "disabled" : ""}
            required = {props.isRequired ? "required" : ""}
            readOnly = {props.isReadonly ? "readonly" : ""}
            />
                <div className='suggestions__container'>
                        {renderSuggestions()}
                </div>
        </div>
    );
};

export default Autocomplete;