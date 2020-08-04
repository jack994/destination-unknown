import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkDatepicker from 'bpk-component-datepicker';
import BpkLabel from 'bpk-component-label';

import {
  formatDate,
  formatDateFull,
  formatMonth,
} from '../searchControlsUtils';

import STYLES from './DatePicker.scss';

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

const DatePicker = ({ title, onDateSelected, date }) => {
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
        onDateSelect={onDateSelected}
        date={date}
      />
    </div>
  );
};

DatePicker.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onDateSelected: PropTypes.func.isRequired,
};

export default DatePicker;
