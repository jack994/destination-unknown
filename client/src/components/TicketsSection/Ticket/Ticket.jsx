import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTicketFromMarket } from '../../../redux/selectors';

// import STYLES from './Ticket.scss';

const renderAgents = agents => agents.map(item => <span>{item}</span>);
const Ticket = props => {
  const { market, agents, price, url, outbound, inbound } = props.ticketData;
  return (
    <div>
      <p>market: {market}</p>
      <p>agent(s): {renderAgents(agents)}</p>
      <p>price: {price}€</p>
      <a href={url}>Book</a>
      <h4>Outbound</h4>
      <p>departure: {outbound.departure}</p>
      <p>arrival: {outbound.arrival}</p>
      <p>duration: {outbound.duration}</p>
      <p>stops: {outbound.stops}</p>
      <h4>Inbound</h4>
      {inbound ? (
        <>
          <p>departure: {inbound.departure}</p>
          <p>arrival: {inbound.arrival}</p>
          <p>duration: {inbound.duration}</p>
          <p>stops: {inbound.stops}</p>
        </>
      ) : (
        <p>N/A</p>
      )}
    </div>
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
