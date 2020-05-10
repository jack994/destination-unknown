import React, { Component } from 'react';
import BpkLabel from 'bpk-component-label';
import { withRtlSupport } from 'bpk-component-icon';
import FlightIcon from 'bpk-component-icon/lg/flight';
import BpkAutosuggest, {
  BpkAutosuggestSuggestion,
} from 'bpk-component-autosuggest';

const BpkFlightIcon = withRtlSupport(FlightIcon);

const getSuggestions = async value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue ? inputValue.length : 0;
  if (!inputValue || inputLength === 0) {
    return [];
  }

  try {
    const response = await fetch(`/api/${inputValue}`);

    if (!response.ok) {
      throw Error(`${response.status}: ${response.statusText}`);
    }

    const retValue = await response.json();

    return retValue.Places.filter(
      place => place.PlaceName.toLowerCase().indexOf(inputValue) !== -1,
    );
  } catch (error) {
    // TODO: what to do with error?
    return [];
  }
};

const getSuggestionValue = ({ PlaceName, PlaceId }) => {
  const cityCode = PlaceId.slice(0, PlaceId.length - 4);
  return `${PlaceName} (${cityCode})`;
};

const renderSuggestion = suggestion => (
  <BpkAutosuggestSuggestion
    value={getSuggestionValue(suggestion)}
    subHeading={suggestion.CountryName}
    tertiaryLabel="Airport"
    indent={suggestion.indent}
    icon={BpkFlightIcon}
  />
);

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value).then(result => {
      this.setState({
        suggestions: result,
      });
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      id: 'dest-autosuggest',
      name: 'dest-autosuggest',
      placeholder: 'Enter a destination',
      value,
      onChange: this.onChange,
    };

    return (
      <div>
        <BpkLabel htmlFor="my-autosuggest">New Destination</BpkLabel>
        <BpkAutosuggest
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

export default SearchBar;
