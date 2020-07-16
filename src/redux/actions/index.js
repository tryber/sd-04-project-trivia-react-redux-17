import { getToken } from '../../services/api';

export const REQUEST_TRIVIA = 'REQUEST_TRIVIA';
export const RECEIVE_TRIVIA_SUCCESS = 'RECEIVE_TRIVIA_SUCCESS';
export const RECEIVE_TRIVIA_ERROR = 'RECEIVE_TRIVIA_ERROR';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';

export const requestTrivia = () => ({
  type: REQUEST_TRIVIA,
});

export const receiveTriviaSuccess = (data) => ({
  type: RECEIVE_TRIVIA_SUCCESS,
  data,
});

export const receiveTriviaError = (error) => ({
  type: RECEIVE_TRIVIA_ERROR,
  error,
});

export function fetchTrivia() {
  return (dispatch) => {
    dispatch(requestTrivia());
    return getToken().then(
      (data) => dispatch(receiveTriviaSuccess(data)),
      (error) => dispatch(receiveTriviaError(error.message)),
    );
  };
}

export const saveQuestions = (questions) => ({
  type: SAVE_QUESTIONS,
  questions,
});
