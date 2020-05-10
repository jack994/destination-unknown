import React, { Component } from 'react';
import BpkLabel from 'bpk-component-label';
import BpkNudger from 'bpk-component-nudger';
import PropTypes from 'prop-types';

import STYLES from './PassengerSelector.scss';

class PassengerSelector extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.min });
  }

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { title, min, max } = this.props;
    const titleId = title.replace(/\s/g, '');
    return (
      <div className={STYLES.PassengerSelector}>
        <BpkLabel htmlFor={titleId}>{title}</BpkLabel>
        <BpkNudger
          id={`${titleId}Nudger`}
          min={min}
          max={max}
          value={this.state.value}
          onChange={this.handleChange}
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
};

PassengerSelector.defaultProps = {
  min: 0,
  max: 10,
};

export default PassengerSelector;
