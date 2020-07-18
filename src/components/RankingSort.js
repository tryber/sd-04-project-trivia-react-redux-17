import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetUserLogin } from '../redux/actions';

class RankingSort extends React.Component {
  render() {
    const { resetLogin } = this.props;

    const sortRanking = [...JSON.parse(localStorage.getItem('token'))].sort(
      (a, b) => (a.score - b.score) * -1,
    );

    return (
      <div>
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
          <ol>
            {sortRanking.map((player, gravatarEmail, index) => (
              <li key={`${player.name}_${player.score}`}>
                <img src={gravatarEmail} alt="" />
                <h3 data-testid={`player-name-${index}`}>{player.name}</h3>
                <h4 data-testid={`player-score-${index}`}>{player.score}</h4>
              </li>
            ))}
          </ol>
        </div>
        <Link to="/">
          <button data-testid="btn-go-home" type="button" onClick={() => resetLogin()}>
            Jogar Novamente!
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetLogin: () => dispatch(resetUserLogin()),
});

export default connect(null, mapDispatchToProps)(RankingSort);

RankingSort.propTypes = {
  resetLogin: PropTypes.func.isRequired,
};
