import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MD5 from 'crypto-js/md5';
import { resetUserLogin, updateRanking } from '../redux/actions';

const hashEmail = (email) => MD5(email).toString().toLowerCase().trim();

class RankingSort extends React.Component {
  constructor(props) {
    super(props);
    this.storageRanking = this.storageRanking.bind(this);
  }

  storageRanking() {
    const { player, dispatchUpdateRanking } = this.props;
    const hash = hashEmail(player.gravatarEmail);
    const pictureGravatar = `https://www.gravatar.com/avatar/${hash}?d=https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3`;

    dispatchUpdateRanking(player.name, player.score, pictureGravatar);
    const sortRanking = [
      { name: player.name, score: player.score, picture: pictureGravatar },
      ...JSON.parse(localStorage.getItem('ranking')),
    ]
      .sort((a, b) => a.score - b.score)
      .reverse();
    console.log(sortRanking);
    localStorage.setItem('ranking', JSON.stringify(sortRanking));
  }

  render() {
    const { resetLogin } = this.props;
    const emptyStorage = JSON.parse(localStorage.getItem('ranking'));
    if (!emptyStorage) localStorage.setItem('ranking', JSON.stringify([]));
    this.storageRanking();
    const sortRanking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
          <ol>
            {sortRanking.map((player, index) => (
              <li key={`${player.name}_${player.score}`}>
                <img src={player.picture} alt="avatar" />
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
  dispatchUpdateRanking: (name, score, picture) => dispatch(updateRanking(name, score, picture)),
});

const mapStateToProps = (state) => ({
  player: state.reducer.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(RankingSort);

RankingSort.propTypes = {
  dispatchUpdateRanking: PropTypes.func.isRequired,
  player: PropTypes.shape({
    gravatarEmail: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  resetLogin: PropTypes.func.isRequired,
};
