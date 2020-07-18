import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetTimer, addAssertion } from '../redux/actions';

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

function renderCorrectInput(elem, addCorrectAssertion, difficulty) {
  return (
    <input
      type="button"
      key={elem}
      className="correct"
      data-testid="correct-answer"
      value={elem}
      onClick={() => {
        colorAnswers();
        addCorrectAssertion(difficulty);
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
      questions: [],
    };
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
  }

  componentDidMount() {
    this.defineAlternativesOrder();
  }

  componentDidUpdate() {
    const { player } = this.state;
    const localState = {
      player,
    };
    window.localStorage.setItem('state', JSON.stringify(localState));
  }

  defineAlternativesOrder() {
    let { questions } = this.props;
    questions = questions.map((question) => {
      const { incorrect_answers: incorrectAnswers, correct_answer: correctAnswer } = question;
      const alternatives = shuffleArray([...incorrectAnswers, correctAnswer]);
      return { ...question, alternatives };
    });
    return this.setState({ questions });
  }

  async goToNextQuestion() {
    this.setState((state) => ({ counter: state.counter + 1 }));
    const next = document.querySelector('.next');
    next.style.display = 'none';
  }

  render() {
    console.log('render do Questions');

    const { addCorrectAssertion, resetTimerGlobal, player } = this.props;
    const { counter, questions } = this.state;

    if (counter === 5) return <Redirect to="/feedback" />;

    if (questions.length > 0) {
      const {
        incorrect_answers: incorrectAnswers,
        correct_answer: correctAnswer,
        category,
        question,
        difficulty,
        alternatives,
      } = questions[counter];

      return (
        <div>
          <h2 data-testid="question-category">{category}</h2>
          <h1 data-testid="question-text">{question}</h1>
          <div>
            {alternatives.map((elem) => {
              if (elem === correctAnswer) {
                return renderCorrectInput(elem, addCorrectAssertion, difficulty, player);
              }
              return renderWrongInput(elem, incorrectAnswers);
            })}
          </div>
          {displayButtonNext(this.goToNextQuestion, resetTimerGlobal)}
        </div>
      );
    }

    return <div>Loading...</div>;
  }
}

const mapStateToProps = (state) => ({
  timer: state.reducer.timer,
  player: state.reducer.player,
});

const mapDispatchToProps = (dispatch) => ({
  addCorrectAssertion: (difficulty) => dispatch(addAssertion(difficulty)),
  resetTimerGlobal: () => dispatch(resetTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  addCorrectAssertion: PropTypes.func.isRequired,
  resetTimerGlobal: PropTypes.func.isRequired,
  player: PropTypes.objectOf(PropTypes.any).isRequired,
  // token: PropTypes.string.isRequired,
  // // score: PropTypes.number.isRequired,
  // // assertions: PropTypes.number.isRequired,
};
