import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function shuffleArray(received) {
  const array = [...received];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayButtonNext(goToNextQuestion) {
  return (
    <input
      type="button"
      data-testid="btn-next"
      className="next"
      style={{ display: 'none' }}
      onClick={() => {
        goToNextQuestion();
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

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
  }

  goToNextQuestion() {
    this.setState((state) => ({ counter: state.counter + 1 }));
  }

  // updateAlternatives(question) {
  //   const { incorrect_answers: incorrectAnswers, correct_answer: correctAnswer } = question;
  // }

  render() {
    const { questions, addCorrectAssertion } = this.props;
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
        {displayButtonNext(this.goToNextQuestion, this.updateAlternatives)}
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  addCorrectAssertion: PropTypes.func.isRequired,
  // token: PropTypes.string.isRequired,
  // fetchTriviaToken: PropTypes.func.isRequired,
  // // score: PropTypes.number.isRequired,
  // // assertions: PropTypes.number.isRequired,
};
