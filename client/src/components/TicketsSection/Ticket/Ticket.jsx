import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BpkTicket from 'bpk-component-ticket';
import BpkPanel from 'bpk-component-panel';
import BpkButtonPrimary from 'bpk-component-button';

import { getTicketFromMarket } from '../../../redux/selectors';

import STYLES from './Ticket.scss';

const renderAgents = agents => agents.map(item => <span>{item}</span>);

const renderLeg = leg => (
  <BpkPanel className={STYLES.Ticket__legContainer}>
    <div className={STYLES.Ticket__departureArrivalContainer}>
      <div>departure: {leg.departure}</div>
      <div>arrival: {leg.arrival}</div>
    </div>
    <div className={STYLES.Ticket__durationStopsContainer}>
      <div>duration: {leg.duration}</div>
      <div>stops: {leg.stops}</div>
    </div>
  </BpkPanel>
);

const Ticket = props => {
  const { market, agents, price, url, outbound, inbound } = props.ticketData;
  return (
    <BpkTicket
      className={STYLES.Ticket}
      stub={
        <div className={STYLES.Ticket__stub}>
          <p className={STYLES.Ticket__price}>{price}€</p>
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
      {renderLeg(outbound)}
      {inbound && renderLeg(inbound)}
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
  ticketData: PropTypes.shape({
    market: PropTypes.string.isRequired,
    agents: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    outbound: leg.isRequired,
    inbound: leg,
  }).isRequired,
};

// Ticket.defaultProps = {};
