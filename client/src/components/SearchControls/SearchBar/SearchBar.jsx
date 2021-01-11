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
    const retValue = await response.json();

    if (!response.ok) {
      throw Error(`${response.status}: ${retValue.message}`);
    }

    return retValue.filter(
      place =>
        place.PlaceName &&
        place.PlaceName.toLowerCase().indexOf(inputValue) !== -1 &&
        place.PlaceId &&
        place.PlaceId.length === 3, // filter-out non-airports
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getSuggestionValue = ({ PlaceName, PlaceId }) => {
  const placeIdValue = PlaceId ? `(${PlaceId})` : '';
  return `${PlaceName} ${placeIdValue}`;
};

const renderSuggestion = suggestion => (
  <BpkAutosuggestSuggestion
    value={getSuggestionValue(suggestion)}
    subHeading={suggestion.CountryName}
    tertiaryLabel="Airport" // hardcoded to airport
    indent={suggestion.indent}
    icon={BpkFlightIcon}
  />
);

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      suggestions: [],
      currentSuggestion: null,
    };
  }

  onChange = (e, { newValue }) => {
    this.setState({
      currentSuggestion: newValue,
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.setPlace(suggestion);
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
    const { title, id } = this.props;
    const titleId = title.replace(/\s/g, '');

    const inputProps = {
      id,
      name: id,
      placeholder: 'Enter a destination',
      value: this.state.currentSuggestion || '',
      onChange: this.onChange,
    };

    return (
      <div className={STYLES.SearchBar}>
        <BpkLabel htmlFor={titleId}>{title}</BpkLabel>
        <BpkAutosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  setPlace: PropTypes.func.isRequired,
};

export default SearchBar;
