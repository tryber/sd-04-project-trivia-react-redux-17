import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchToken,
  addAssertion,
  setTimer,
  resetTimer,
} from '../redux/actions';
import { getQuestions } from '../services/api';
import Header from '../components/Header';
import Timer from '../components/Timer';
import './Game.css';
import Questions from '../components/Questions';

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

  // setTimer() {
  //   this.setState((state) => {
  //     if (state.timer === 0) return { timer: 30 };
  //     return { timer: state.timer - 1 };
  //   });
  // }

  // resetTimer() {
  //   this.setState({ timer: 30 });
  // }

  render() {
    const {
      isFetching,
      addCorrectAssertion,
      setTimerGlobal,
      resetTimerGlobal,
    } = this.props;
    const { questions, timer } = this.state;
    if (isFetching || questions.length === 0) return <p>Loading...</p>;
    return (
      <div>
        <Header />
        <Questions
          questions={questions}
          addCorrectAssertion={addCorrectAssertion}
          goToNextQuestion={this.goToNextQuestion}
        />
        {/* {renderQuestion(questions[counter], addCorrectAssertion, this.goToNextQuestion)} */}
        <Timer timer={timer} setTimer={setTimerGlobal} resetTimer={resetTimerGlobal} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.reducer.isFetching,
  token: state.reducer.token,
  // score: state.reducer.player.score,
  // assertions: state.reducer.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaToken: () => dispatch(fetchToken()),
  addCorrectAssertion: () => dispatch(addAssertion()),
  setTimerGlobal: () => dispatch(setTimer()),
  resetTimerGlobal: () => dispatch(resetTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  fetchTriviaToken: PropTypes.func.isRequired,
  addCorrectAssertion: PropTypes.func.isRequired,
  setTimerGlobal: PropTypes.func.isRequired,
  resetTimerGlobal: PropTypes.func.isRequired,
};
