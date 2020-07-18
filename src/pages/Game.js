import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken } from '../redux/actions';
import { getQuestions } from '../services/api';
import Header from '../components/Header';
import Ranking from './Ranking';
import Timer from '../components/Timer';
import './Game.css';
import Questions from '../components/Questions';

function disableButtons() {
  const wrong = Array.from(document.querySelectorAll('.wrong'));
  const correct = document.querySelector('.correct');
  wrong.forEach((item) => {
    item.setAttribute('disabled', true);
  });
  correct.setAttribute('disabled', true);
  const next = document.querySelector('.next');
  next.style.display = 'block';
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  async componentDidMount() {
    const { fetchTriviaToken, token } = this.props;
    await fetchTriviaToken();
    const questions = await getQuestions(token);
    this.setState({ questions: questions.results });
  }

  render() {
    const { isFetching, timer } = this.props;
    const { questions } = this.state;
    if (isFetching || questions.length === 0) return <p>Loading...</p>;
    if (timer === 0) disableButtons();

    return (
      <div>
        <Header />
        <Ranking />
        <Questions
          questions={questions}
          goToNextQuestion={this.goToNextQuestion}
        />
        <Timer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.reducer.isFetching,
  token: state.reducer.token,
  timer: state.reducer.timer,
  // assertions: state.reducer.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaToken: () => dispatch(fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  fetchTriviaToken: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};
