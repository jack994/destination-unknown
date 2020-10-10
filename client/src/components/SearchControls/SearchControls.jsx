/* eslint-disable no-shadow */
import React, { Component } from 'react';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkPanel from 'bpk-component-panel';
import BpkButton from 'bpk-component-button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { convertIso3Code } from 'convert-country-codes';

import {
  changeStartDate,
  changeEndDate,
  changeFrom,
  changeTo,
  changePassengers,
  changeChildren,
  changeInfants,
  changeTripType,
} from '../../redux/actions';
import {
  getStartDateState,
  getEndDateState,
  getFromState,
  getToState,
  getNumberOfPeopleState,
  getNumberOfChildrenState,
  getNumberOfInfantsState,
} from '../../redux/selectors';

import DatePicker from './DatePicker/DatePicker';
import SearchBar from './SearchBar/SearchBar';
import PassengerSelector from './PassengerSelector/PassengerSelector';
import STYLES from './SearchControls.scss';
import { formatDateSkyscannerApi } from './searchControlsUtils';

const getNeighbouringCountries = async countryCode => {
  if (!countryCode) {
    console.log('countryCode is NULL');
    return [];
  }
  // TODO: need to take a look at why in skyscanner this happens (wtf):
  const countryISOCode = countryCode === 'UK' ? 'GB' : countryCode;
  const response = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${countryISOCode}?fields=borders`,
  );
  if (!response.ok) {
    console.log(
      `Error trying to reach restcountries-api for countrycode: ${countryCode.toUpperCase()}`,
    );
  }
  const jsonResponse = await response.json();
  return jsonResponse.borders.map(x => {
    const iso2Code = convertIso3Code(x).iso2;
    return iso2Code === 'GB' ? 'UK' : iso2Code;
  });
};

class SearchControls extends Component {
  async searchFlight() {
    const {
      startDate,
      endDate,
      origin,
      destination,
      adults,
      infants,
      children,
    } = this.props;

    const originIATA = origin && origin.PlaceId;
    const originCountry = origin && origin.CountryId;
    const destinationIATA = destination && destination.PlaceId;
    const destinationCountry = destination && destination.CountryId;

    const oriBorders = await getNeighbouringCountries(originCountry);
    const destBorders = await getNeighbouringCountries(destinationCountry);
    const allBorders = oriBorders.concat(destBorders);
    allBorders.push(originCountry);
    allBorders.push(destinationCountry);
    const uniqueBorders = [...new Set(allBorders)];

    if (startDate && origin && adults && adults > 0) {
      const requestBody = {
        targeting: {
          outboundDate: formatDateSkyscannerApi(startDate),
          inboundDate: endDate ? formatDateSkyscannerApi(endDate) : undefined,
          originPlace: originIATA,
          destinationPlace: destinationIATA,
          adults,
          children,
          infants,
        },
        borders: uniqueBorders,
      };

      // TODO: if destination is 4 letter city code request fails
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.log(`${response.status}: ${response.statusText}`);
      }

      const retValue = await response.json();

      // TODO: do something with response
      console.log(retValue);
    }
  }

  render() {
    const {
      startDate,
      endDate,
      adults,
      infants,
      children,
      changeStartDate,
      changeEndDate,
      changeFrom,
      changeTo,
      changePassengers,
      changeChildren,
      changeInfants,
      changeTripType,
    } = this.props;

    return (
      <BpkPanel className={STYLES.SearchControls__mainPanel}>
        <SearchBar title="From" setPlace={changeFrom} />
        <SearchBar title="To" setPlace={changeTo} />
        <DatePicker
          title="Depart"
          date={startDate}
          onDateSelected={changeStartDate}
        />
        <DatePicker
          title="Return"
          date={endDate}
          onDateSelected={changeEndDate}
        />
        <BpkPanel className={STYLES.SearchControls__bottomPanel}>
          <div className={STYLES.SearchControls__passengersPanel}>
            <BpkCheckbox
              className={STYLES.SearchControls__checkBox}
              name="return-flight"
              onChange={changeTripType}
              label="Return Flight"
            />
            <PassengerSelector
              min={1}
              title="Adults (16+ years old)"
              total={adults}
              changeTotal={changePassengers}
            />
            <PassengerSelector
              title="Children (1-16 years old)"
              total={children}
              changeTotal={changeChildren}
            />
            <PassengerSelector
              title="Infants (0-12 months old)"
              total={infants}
              changeTotal={changeInfants}
            />
          </div>
          <BpkButton
            featured
            className={STYLES.SearchControls__searchButton}
            onClick={() => this.searchFlight()}
          >
            Search
          </BpkButton>
        </BpkPanel>
      </BpkPanel>
    );
  }
}

const mapStateToProps = state => {
  return {
    startDate: getStartDateState(state),
    endDate: getEndDateState(state),
    origin: getFromState(state),
    destination: getToState(state),
    adults: getNumberOfPeopleState(state),
    children: getNumberOfChildrenState(state),
    infants: getNumberOfInfantsState(state),
  };
};

export default connect(mapStateToProps, {
  changeStartDate,
  changeEndDate,
  changeFrom,
  changeTo,
  changePassengers,
  changeChildren,
  changeInfants,
  changeTripType,
})(SearchControls);

// TODO: date warning in console, it should be date not string in prop validation

SearchControls.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired, // TODO: this is location type
  destination: PropTypes.string.isRequired, // TODO: this is location type
  adults: PropTypes.number.isRequired,
  children: PropTypes.number.isRequired,
  infants: PropTypes.number.isRequired,
  changeStartDate: PropTypes.func.isRequired,
  changeEndDate: PropTypes.func.isRequired,
  changeFrom: PropTypes.func.isRequired,
  changeTo: PropTypes.func.isRequired,
  changePassengers: PropTypes.func.isRequired,
  changeChildren: PropTypes.func.isRequired,
  changeInfants: PropTypes.func.isRequired,
  changeTripType: PropTypes.func.isRequired,
};
