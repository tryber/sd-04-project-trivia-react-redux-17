export import { getToken } from 'src/services/api';

export const REQUEST_TRIVIA = 'REQUEST_TRIVIA';
export const RECEIVE_TRIVIA_SUCCESS = 'RECEIVE_TRIVIA_SUCCESS';
export const RECEIVE_TRIVIA_ERROR = 'RECEIVE_TRIVIA_ERROR';


export const requestTrivia = () => ({
  type: REQUEST_TRIVIA
});

export const receiveTriviaSuccess = (data) => ({
  type: RECEIVE_TRIVIA_SUCCESS,
  data,
});

export const receiveTriviaError = (error) => ({
  type: RECEIVE_TRIVIA_ERROR,
  error,
});

export function fetchTrivia(token) {
  return (dispatch) => {
    dispatch(requestTrivia());
    getToken(token).then(
      (data) => dispatch(receiveTriviaSuccess(data)),
      (error) => dispatch(receiveTriviaError(error.message)),
    );
  };
}
