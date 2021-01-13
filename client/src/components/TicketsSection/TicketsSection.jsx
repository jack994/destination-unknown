import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BpkPanel from 'bpk-component-panel';
import { BpkExtraLargeSpinner, SPINNER_TYPES } from 'bpk-component-spinner';

import { getMarketsSortedByPrice, getIsLoading } from '../../redux/selectors';

import Ticket from './Ticket/Ticket';
import STYLES from './TicketsSection.scss';

const createTicketList = markets => {
  return markets && markets.length === 0 ? (
    <BpkPanel className={STYLES.TicketsSection__noFlightsPanel}>
      No results found on these dates
    </BpkPanel>
  ) : (
    markets && markets.map(item => <Ticket key={item} market={item} />)
  );
};

const TicketsSection = props => {
  const { markets, isLoading } = props;
  return (
    <div className={STYLES.TicketsSection}>
      {isLoading ? (
        <BpkExtraLargeSpinner
          className={STYLES.TicketsSection__spinner}
          type={SPINNER_TYPES.primary}
        />
      ) : (
        createTicketList(markets)
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    markets: getMarketsSortedByPrice(state),
    isLoading: getIsLoading(state),
  };
};

export default connect(mapStateToProps /** { actions here } */)(TicketsSection);

TicketsSection.propTypes = {
  markets: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool.isRequired,
};

TicketsSection.defaultProps = {
  markets: null,
};
