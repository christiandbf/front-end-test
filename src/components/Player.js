import React from 'react';
import PropTypes from 'prop-types';

const Player = ({ id }) => (
  <div>{id}</div>
);

Player.propTypes = {
  id: PropTypes.string.isRequired
}

export default Player;