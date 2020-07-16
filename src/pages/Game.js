import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTrivia } from '../redux/actions';
import { getQuestions } from '../services/api';
import Header from '../components/Header';

function shuffleArray(received) {
  const array = [...received];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderQuestion(currentQuestion) {
  const {
    incorrect_answers: incorrectAnswers,
    correct_answer: correctAnswer,
    category,
    question,
  } = currentQuestion;
  let questions = [...incorrectAnswers, correctAnswer];
  questions = shuffleArray(questions);

  return (
    <div>
      <Header />
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h1 data-testid="question-text">{question}</h1>
        <div>
          {questions.map((elem) => {
            if (elem === correctAnswer) {
              return <input type="button" key={elem} data-testid="correct-answer" value={elem} />;
            }
            return (
              <input
                type="button"
                data-testid={`wrong-answer-${incorrectAnswers.indexOf(elem)}`}
                value={elem}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
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

  render() {
    const { isFetching } = this.props;
    const { questions, counter } = this.state;
    if (isFetching || questions.length === 0) return <p>Loading...</p>;
    console.log(questions);
    return <div>{renderQuestion(questions[counter])}</div>;
  }
}

const mapStateToProps = (state) => ({
  isFething: state.reducer.isFetching,
  token: state.reducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaToken: () => dispatch(fetchTrivia()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  fetchTriviaToken: PropTypes.func.isRequired,
};
