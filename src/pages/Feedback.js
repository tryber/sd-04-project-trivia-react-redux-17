import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Feedback({ player: { assertions, score } }) {
  return (
    <div>
      <Header />
      <div>
        <h3 data-testid="feedback-text">{assertions < 3 ? 'Podia ser melhor...' : 'Mandou bem!'}</h3>
        <p data-testid="feedback-total-score">Você acertou {assertions} questões!</p>
        <p data-testid="feedback-total-questions">Um total de {score} pontos</p>
        <Link data-testid="btn-ranking" to="/ranking">VER RANKING</Link>
        <br/>
        <Link data-testid="btn-play-again" to="/game">JOGAR NOVAMENTE</Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  player: state.reducer.player,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  player: PropTypes.objectOf(PropTypes.object.isRequired);
};
