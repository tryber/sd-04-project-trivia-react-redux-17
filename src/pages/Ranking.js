import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RankingSort from '../components/RankingSort';

const Ranking = ({ isLogged }) => {
  if (isLogged) {
    return (
      <div>
        <RankingSort />
      </div>
    );
  }
  return (
    <span>
      <Link to="/">Logar!</Link>
    </span>
  );
};

Ranking.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({ isLogged: state.reducer.isLogged });

export default connect(mapStateToProps)(Ranking);
