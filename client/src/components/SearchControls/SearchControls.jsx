/* eslint-disable no-shadow */
import React from 'react';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkPanel from 'bpk-component-panel';
import BpkButton from 'bpk-component-button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

// searchFlight() {
// TODO
// }

const SearchControls = ({
  startDate,
  endDate,
  from,
  to,
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
}) => {
  return (
    <BpkPanel className={STYLES.SearchControls__mainPanel}>
      <SearchBar title="From" place={from} setPlace={changeFrom} />
      <SearchBar title="To" place={to} setPlace={changeTo} />
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
          // TODO onClick={this.searchFlight()}
        >
          Search
        </BpkButton>
      </BpkPanel>
    </BpkPanel>
  );
};

const mapStateToProps = state => {
  return {
    startDate: getStartDateState(state),
    endDate: getEndDateState(state),
    from: getFromState(state),
    to: getToState(state),
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

SearchControls.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
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
