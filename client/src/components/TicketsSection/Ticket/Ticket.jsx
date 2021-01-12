import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BpkTicket from 'bpk-component-ticket';
import BpkPanel from 'bpk-component-panel';
import BpkButtonPrimary from 'bpk-component-button';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';

import { getTicketFromMarket } from '../../../redux/selectors';
import {
  formatDepartureArrivalFromString,
  convertTime,
} from '../../DatesUtils';

import STYLES from './Ticket.scss';

const renderAgents = agents =>
  agents.map(item => <span key={item}>{item}</span>);

const renderLeg = (leg, isReturnLeg) => (
  <BpkPanel className={STYLES.Ticket__legContainer}>
    <span>
      <b>{isReturnLeg ? 'Inbound' : 'Outbound'}</b>
    </span>
    <div className={STYLES.Ticket__departureArrivalContainer}>
      <span>
        {formatDepartureArrivalFromString(leg.departure, leg.arrival)}
      </span>
    </div>
    <div className={STYLES.Ticket__durationStopsContainer}>
      <span>duration: {convertTime(leg.duration)}</span>
      <span>{leg.stops === 0 ? 'Direct' : `stops: ${leg.stops}`}</span>
    </div>
  </BpkPanel>
);

const Ticket = props => {
  const { agents, price, url, outbound, inbound } = props.ticketData;
  return (
    <BpkTicket
      className={STYLES.Ticket}
      vertical={props.vertical}
      stub={
        <div className={STYLES.Ticket__stub}>
          <p className={STYLES.Ticket__price}>{price.toFixed(2)}€</p>
          <BpkButtonPrimary
            featured
            href={url}
            target="_blank"
            className={STYLES.Ticket__bookButton}
          >
            Book
          </BpkButtonPrimary>
        </div>
      }
    >
      <div className={STYLES.Ticket__marketAgentContainer}>
        <div>market: {props.market}</div>
        <div>agent(s): {renderAgents(agents)}</div>
      </div>
      {renderLeg(outbound, false)}
      {inbound && renderLeg(inbound, true)}
    </BpkTicket>
  );
};

const ticketBreakpointSpecific = props => (
  <>
    <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
      <Ticket vertical {...props} />
    </BpkBreakpoint>
    <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
      <Ticket {...props} />
    </BpkBreakpoint>
  </>
);

const mapStateToProps = (state, ownProps) => {
  return {
    ticketData: getTicketFromMarket(state, ownProps.market),
  };
};

export default connect(mapStateToProps /** { actions here } */)(
  ticketBreakpointSpecific,
);

const leg = PropTypes.shape({
  departure: PropTypes.string.isRequired,
  arrival: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  stops: PropTypes.number.isRequired,
});

Ticket.propTypes = {
  vertical: PropTypes.bool,
  market: PropTypes.string.isRequired,
  ticketData: PropTypes.shape({
    market: PropTypes.string.isRequired,
    agents: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    outbound: leg.isRequired,
    inbound: leg,
  }).isRequired,
};

Ticket.defaultProps = {
  vertical: false,
};
