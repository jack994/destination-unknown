import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import { BpkExtraLargeSpinner, SPINNER_TYPES } from 'bpk-component-spinner';

import { getMarkets, getIsLoading } from '../../redux/selectors';

import Ticket from './Ticket/Ticket';
import STYLES from './TicketsSection.scss';

const createTicketList = markets =>
  markets.map(item => (
    <>
      <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
        <Ticket vertical market={item} />
      </BpkBreakpoint>
      <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
        <Ticket market={item} />
      </BpkBreakpoint>
    </>
  ));

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
    markets: getMarkets(state),
    isLoading: getIsLoading(state),
  };
};

export default connect(mapStateToProps /** { actions here } */)(TicketsSection);

TicketsSection.propTypes = {
  markets: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
