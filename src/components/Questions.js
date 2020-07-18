import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  resetTimer,
} from '../redux/actions';

function shuffleArray(received) {
  const array = [...received];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayButtonNext(goToNextQuestion, resetTimerGlobal) {
  return (
    <input
      type="button"
      data-testid="btn-next"
      className="next"
      style={{ display: 'none' }}
      onClick={() => {
        goToNextQuestion();
        resetTimerGlobal();
      }}
      value="Próximo"
    />
  );
}

function colorAnswers() {
  const wrong = Array.from(document.querySelectorAll('.wrong'));
  const correct = document.querySelector('.correct');
  wrong.forEach((item) => {
    item.classList.add('wrongStyle');
  });
  correct.classList.add('correctStyle');
  const next = document.querySelector('.next');
  next.style.display = 'block';
}

function renderCorrectInput(elem, addCorrectAssertion) {
  return (
    <input
      type="button"
      key={elem}
      className="correct"
      data-testid="correct-answer"
      value={elem}
      onClick={() => {
        colorAnswers();
        addCorrectAssertion();
      }}
    />
  );
}

function renderWrongInput(elem, incorrectAnswers) {
  return (
    <input
      type="button"
      key={elem}
      className="wrong"
      data-testid={`wrong-answer-${incorrectAnswers.indexOf(elem)}`}
      value={elem}
      onClick={() => colorAnswers()}
    />
  );
}

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
  }

  goToNextQuestion() {
    this.setState((state) => ({ counter: state.counter + 1 }));
    const next = document.querySelector('.next');
    next.style.display = 'none';
  }

  render() {
    const { questions, addCorrectAssertion, resetTimerGlobal } = this.props;
    const { counter } = this.state;

    if (counter === 5) return <Redirect to="/feedback" />;

    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
      category,
      question,
    } = questions[counter];
    const alternatives = shuffleArray([...incorrectAnswers, correctAnswer]);

    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h1 data-testid="question-text">{question}</h1>
        <div>
          {alternatives.map((elem) => {
            if (elem === correctAnswer) {
              return renderCorrectInput(elem, addCorrectAssertion);
            }
            return renderWrongInput(elem, incorrectAnswers);
          })}
        </div>
        {displayButtonNext(this.goToNextQuestion, resetTimerGlobal)}
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   timer: state.reducer.timer,
// });

const mapDispatchToProps = (dispatch) => ({
  // setTimerGlobal: () => dispatch(setTimer()),
  resetTimerGlobal: () => dispatch(resetTimer()),
});

export default connect(null, mapDispatchToProps)(Questions);

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  addCorrectAssertion: PropTypes.func.isRequired,
  resetTimerGlobal: PropTypes.func.isRequired,
  // token: PropTypes.string.isRequired,
  // // score: PropTypes.number.isRequired,
  // // assertions: PropTypes.number.isRequired,
};
