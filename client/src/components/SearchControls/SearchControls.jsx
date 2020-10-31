/* eslint-disable no-shadow */
import React, { Component } from 'react';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkPanel from 'bpk-component-panel';
import BpkButtonPrimary from 'bpk-component-button';
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
  // TODO: need to take a look at why in skyscanner this happens
  const countryISOCode = countryCode === 'UK' ? 'GB' : countryCode;
  const response = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${countryISOCode}?fields=borders`,
  );
  if (!response.ok) {
    console.log(
      `Error trying to reach restcountries-api for countrycode: ${countryCode.toUpperCase()}`,
    );
    return [];
  }
  const jsonResponse = await response.json();
  return jsonResponse.borders.map(x => {
    const iso2Code = convertIso3Code(x).iso2;
    return iso2Code === 'GB' ? 'UK' : iso2Code;
  });
};

class SearchControls extends Component {
  constructor() {
    super();

    this.state = {
      return: false,
    };
  }

  toggleReturn(e) {
    const isChecked = e.target.checked;
    const { changeTripType, changeEndDate } = this.props;
    this.setState({ return: isChecked });
    if (!isChecked) {
      // set the return date in the store as null
      changeEndDate(null);
      changeTripType();
    }
  }

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

      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const retValue = await response.json();

        if (!response.ok) {
          throw new Error(`${response.status}: ${retValue.message}`);
        }

        // TODO: do something with response
        console.log(retValue);
      } catch (err) {
        console.log(err);
      }
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
    } = this.props;

    return (
      <BpkPanel className={STYLES.SearchControls__mainPanel}>
        <div className={STYLES.SearchControls__searchPanel}>
          <SearchBar title="Origin" setPlace={changeFrom} />
          <SearchBar title="Destination" setPlace={changeTo} />
        </div>
        <div className={STYLES.SearchControls__datePanel}>
          <DatePicker
            title="Departure Date"
            date={startDate}
            onDateSelected={changeStartDate}
          />
          {this.state.return && (
            <DatePicker
              title="Return Date"
              date={endDate}
              onDateSelected={changeEndDate}
            />
          )}
        </div>
        <BpkPanel className={STYLES.SearchControls__bottomPanel}>
          <div className={STYLES.SearchControls__passengersPanel}>
            <BpkCheckbox
              className={STYLES.SearchControls__checkBox}
              name="return-flight"
              onChange={e => this.toggleReturn(e)}
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
          <BpkButtonPrimary
            featured
            className={STYLES.SearchControls__searchButton}
            onClick={() => this.searchFlight()}
          >
            Search
          </BpkButtonPrimary>
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

const locationShape = PropTypes.shape({
  PlaceId: PropTypes.string,
  PlaceName: PropTypes.string,
  LocalizedPlaceName: PropTypes.string,
  CountryId: PropTypes.string,
  CityId: PropTypes.string,
  IataCode: PropTypes.string,
  CountryName: PropTypes.string,
  PlaceNameEn: PropTypes.string,
  RegionId: PropTypes.string,
  CityName: PropTypes.string,
  CityNameEn: PropTypes.string,
  GeoId: PropTypes.string,
  GeoContainerId: PropTypes.string,
  Location: PropTypes.string,
  ResultingPhrase: PropTypes.string,
  Highlighting: PropTypes.array,
});

SearchControls.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  origin: locationShape,
  destination: locationShape,
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

SearchControls.defaultProps = {
  startDate: null,
  endDate: null,
  origin: null,
  destination: null,
};
