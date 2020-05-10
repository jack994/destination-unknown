import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkDatepicker from 'bpk-component-datepicker';
import BpkLabel from 'bpk-component-label';
import format from 'date-fns/format';

import STYLES from './DatePicker.scss';

const formatDate = date => format(date, 'dd/mm/yyyy');
const formatDateFull = date => format(date, 'dd MMMM yyyy');
const formatMonth = date => format(date, 'MMMM yyyy');
const daysOfWeek = [
  {
    name: 'Monday',
    nameAbbr: 'Mon',
    index: 0,
    isWeekend: false,
  },
  {
    name: 'Tuesday',
    nameAbbr: 'Tue',
    index: 1,
    isWeekend: false,
  },
  {
    name: 'Wednesday',
    nameAbbr: 'Wed',
    index: 2,
    isWeekend: false,
  },
  {
    name: 'Thursday',
    nameAbbr: 'Thu',
    index: 3,
    isWeekend: false,
  },
  {
    name: 'Friday',
    nameAbbr: 'Fri',
    index: 4,
    isWeekend: false,
  },
  {
    name: 'Saturday',
    nameAbbr: 'Sat',
    index: 5,
    isWeekend: true,
  },
  {
    name: 'Sunday',
    nameAbbr: 'Sun',
    index: 6,
    isWeekend: true,
  },
];

class DatePicker extends Component {
  constructor() {
    super();

    this.state = {
      selectedDate: null,
    };
  }

  handleDateSelect = date => {
    this.setState({
      selectedDate: date,
    });
  };

  render() {
    const { title } = this.props;
    const titleId = title.replace(/\s/g, '');
    return (
      <div className={STYLES.DatePicker}>
        <BpkLabel htmlFor={titleId}>{title}</BpkLabel>
        <BpkDatepicker
          id={`${titleId}Datepicker`}
          daysOfWeek={daysOfWeek}
          weekStartsOn={0}
          changeMonthLabel="Change month"
          closeButtonText="Close"
          title={title}
          getApplicationElement={() => document.getElementById('pagewrap')}
          formatDate={formatDate}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          onDateSelect={this.handleDateSelect}
          date={this.state.selectedDate}
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DatePicker;
