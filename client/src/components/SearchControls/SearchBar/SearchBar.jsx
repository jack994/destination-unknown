import React, { Component } from 'react';
import BpkLabel from 'bpk-component-label';
import PropTypes from 'prop-types';
import { withRtlSupport } from 'bpk-component-icon';
import FlightIcon from 'bpk-component-icon/lg/flight';
import BpkAutosuggest, {
  BpkAutosuggestSuggestion,
} from 'bpk-component-autosuggest';

import STYLES from './SearchBar.scss';

const BpkFlightIcon = withRtlSupport(FlightIcon);

const getSuggestions = async value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue ? inputValue.length : 0;
  if (!inputValue || inputLength === 0) {
    return [];
  }

  try {
    const response = await fetch(`/api/autosuggest/${inputValue}`);

    if (!response.ok) {
      throw Error(`${response.status}: ${response.statusText}`);
    }

    const retValue = await response.json();

    return retValue.filter(
      place => place.PlaceName.toLowerCase().indexOf(inputValue) !== -1,
    );
  } catch (error) {
    console.log(error);
    // TODO: what to do with error?
    return [];
  }
};

const getSuggestionValue = ({ PlaceName, PlaceId }) => {
  const placeIdvalue = PlaceId ? `(${PlaceId})` : '';
  return `${PlaceName} ${placeIdvalue}`;
};

const renderSuggestion = suggestion => (
  <BpkAutosuggestSuggestion
    value={getSuggestionValue(suggestion)}
    subHeading={suggestion.CountryName}
    tertiaryLabel="Airport" // TODO: not always airport
    indent={suggestion.indent}
    icon={BpkFlightIcon}
  />
);

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      suggestions: [],
    };
  }

  onChange = (e, { newValue }) => {
    this.props.setPlace(newValue);
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
    const { suggestions } = this.state;
    const { title, place } = this.props;
    const titleId = title.replace(/\s/g, '');

    const inputProps = {
      id: 'dest-autosuggest',
      name: 'dest-autosuggest',
      placeholder: 'Enter a destination',
      value: place || '',
      onChange: this.onChange,
    };

    return (
      <div className={STYLES.SearchBar}>
        <BpkLabel htmlFor={titleId}>{title}</BpkLabel>
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

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  setPlace: PropTypes.func.isRequired,
};

export default SearchBar;