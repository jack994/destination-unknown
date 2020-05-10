import React, { Component } from 'react';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkPanel from 'bpk-component-panel';

import DatePicker from './DatePicker/DatePicker';
import SearchBar from './SearchBar/SearchBar';
import PassengerSelector from './PassengerSelector/PassengerSelector';
import STYLES from './SearchControls.scss';

class SearchControls extends Component {
  constructor() {
    super();

    this.state = {
      return: false,
    };
  }

  render() {
    return (
      <BpkPanel className={STYLES.SearchControls__mainPanel}>
        <SearchBar />
        <DatePicker title="Between" />
        <DatePicker title="And" />
        <BpkPanel className={STYLES.SearchControls__passengersPanel}>
          <BpkCheckbox
            className={STYLES.SearchControls__checkBox}
            name="return-flight"
            onChange={() =>
              this.setState(prevState => ({ return: !prevState.return }))
            }
            label="Return Flight"
          />
          <PassengerSelector min={1} title="Number of Adults" />
          <PassengerSelector title="Number of Children" />
        </BpkPanel>
      </BpkPanel>
    );
  }
}

export default SearchControls;
