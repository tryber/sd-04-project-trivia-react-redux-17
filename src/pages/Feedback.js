import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetUserLogin } from '../redux/actions';

function Feedback({ player: { assertions, score }, resetLoginStorage }) {
  return (
    <div>
      <Header />
      <div>
        <h3 data-testid="feedback-text">
          {assertions < 3 ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h3>
        <p>
          Você acertou
          <span data-testid="feedback-total-question">
            {assertions}
          </span>
          questões!
        </p>
        <p>
          Um total de
          <span data-testid="feedback-total-score">
            {score}
          </span>
          pontos
        </p>
        <Link data-testid="btn-ranking" to="/ranking">
          VER RANKING
        </Link>
        <br />
        <Link
          data-testid="btn-play-again"
          to="/"
          onClick={() => resetLoginStorage()}
        >
          JOGAR NOVAMENTE
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  player: state.reducer.player,
});

const mapDispatchToProps = (dispatch) => ({
  resetLoginStorage: () => dispatch(resetUserLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  player: PropTypes.objectOf(PropTypes.any).isRequired,
  resetLoginStorage: PropTypes.func.isRequired,
};
