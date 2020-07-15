import React, { Component } from 'react';
import BpkLabel from 'bpk-component-label';
import BpkNudger from 'bpk-component-nudger';
import PropTypes from 'prop-types';

import STYLES from './PassengerSelector.scss';

class PassengerSelector extends Component {
  componentDidMount() {
    this.props.changeTotal(this.props.min);
  }

  render() {
    const { title, min, max, total, changeTotal } = this.props;
    const titleId = title.replace(/\s/g, '');
    return (
      <div className={STYLES.PassengerSelector}>
        <BpkLabel htmlFor={titleId}>{title}</BpkLabel>
        <BpkNudger
          id={`${titleId}Nudger`}
          min={min}
          max={max}
          value={total}
          onChange={changeTotal}
          decreaseButtonLabel="Decrease"
          increaseButtonLabel="Increase"
        />
      </div>
    );
  }
}

PassengerSelector.propTypes = {
  title: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  total: PropTypes.number.isRequired,
  changeTotal: PropTypes.func.isRequired,
};

PassengerSelector.defaultProps = {
  min: 0,
  max: 10,
};

export default PassengerSelector;
