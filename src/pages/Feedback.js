import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Feedback({ assertions }) {
  return (
    <div>
      <Header />
      <div>
        <h3 data-testid="feedback-text">{assertions < 3 ? 'Podia ser melhor...' : 'Mandou bem!'}</h3>
        <p data-testid="feedback-total-score">Você acertou {assertions * 20} questões!</p>
        <p data-testid="feedback-total-questions">Um total de {assertions} pontos</p>
        <Link to="/ranking">VER RANKING</Link>
        <Link to="/game">JOGAR NOVAMENTE</Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  assertions: state.reducer.assertions,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};
