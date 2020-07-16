import React, { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { fetchTrivia, saveQuestions } from '../redux/actions';
import { getQuestions } from '../services/api';
import { queryHelpers } from '@testing-library/react';
// import PropTypes from 'prop-types';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      counter: 0,
    };
  }
  async componentDidMount() {
    const { fetchTriviaToken, token } = this.props;
    await fetchTriviaToken();
    const questions = await getQuestions(token);
    this.setState({ questions: questions.results });
  }

  renderQuestion(currentQuestion) {
    const {
      incorrect_answers,
      correct_answer,
      category,
      question,
      // difficulty,
      // type,
    } = currentQuestion;

    let questions = [...incorrect_answers, correct_answer];
    shuffleArray(questions);

    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h1 data-testid="question-text">{question}</h1>
        <div>
          {questions.map((elem, index) => {
            if (elem === correct_answer) {
              return (
                <input
                  type="button"
                  id={index}
                  name="questions"
                  key={elem}
                  data-testid="correct-answer"
                  value={elem}
                />
              );
            }
            return (
              <input
                type="button"
                id={index}
                name="questions"
                data-testid={`wrong-answer-${incorrect_answers.indexOf(elem)}`}
                value={elem}
              />
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    const { isFetching } = this.props;
    const { questions, counter } = this.state;
    if (isFetching || questions.length === 0) return <p>Loading...</p>;
    console.log(questions[counter]);
    return <div>{this.renderQuestion(questions[counter])}</div>;
  }
}

const mapStateToProps = (state) => ({
  isFething: state.reducer.isFetching,
  token: state.reducer.token,
  questions: state.reducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaToken: () => dispatch(fetchTrivia()),
  // fetchTriviaQuestions: (token) => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
