import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';

import { getMarkets } from '../../redux/selectors';

import Ticket from './Ticket/Ticket';

// import STYLES from './TicketsSection.scss';

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
  const { markets } = props;
  return createTicketList(markets);
};

const mapStateToProps = state => {
  return {
    markets: getMarkets(state),
  };
};

export default connect(mapStateToProps /** { actions here } */)(TicketsSection);

TicketsSection.propTypes = {
  markets: PropTypes.arrayOf(PropTypes.string).isRequired,
};
