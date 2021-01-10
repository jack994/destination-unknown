import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BpkTicket from 'bpk-component-ticket';
import BpkPanel from 'bpk-component-panel';
import BpkButtonPrimary from 'bpk-component-button';

import { getTicketFromMarket } from '../../../redux/selectors';
import { formatDepartureArrivalFromString, convertTime } from '../../Utils';

import STYLES from './Ticket.scss';

const renderAgents = agents => agents.map(item => <span>{item}</span>);

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
  const { market, agents, price, url, outbound, inbound } = props.ticketData;
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
        <div>market: {market}</div>
        <div>agent(s): {renderAgents(agents)}</div>
      </div>
      {renderLeg(outbound, false)}
      {inbound && renderLeg(inbound, true)}
    </BpkTicket>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ticketData: getTicketFromMarket(state, ownProps.market),
  };
};

export default connect(mapStateToProps /** { actions here } */)(Ticket);

const leg = PropTypes.shape({
  departure: PropTypes.instanceOf(Date).isRequired,
  arrival: PropTypes.instanceOf(Date).isRequired,
  duration: PropTypes.number.isRequired,
  stops: PropTypes.number.isRequired,
});

Ticket.propTypes = {
  vertical: PropTypes.bool.isRequired,
  ticketData: PropTypes.shape({
    market: PropTypes.string.isRequired,
    agents: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    outbound: leg.isRequired,
    inbound: leg,
  }).isRequired,
};

// TODO: Ticket.defaultProps = {};
