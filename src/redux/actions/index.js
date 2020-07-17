import { getToken } from '../../services/api';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN_SUCCESS = 'RECEIVE_TOKEN_SUCCESS';
export const RECEIVE_TOKEN_ERROR = 'RECEIVE_TOKEN_ERROR';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const USER_LOGIN = 'USER_LOGIN';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const receivedTokenSuccess = (data) => ({
  type: RECEIVE_TOKEN_SUCCESS,
  data,
});

export const receivedTokenError = (error) => ({
  type: RECEIVE_TOKEN_ERROR,
  error,
});

export function fetchTrivia() {
  return (dispatch) => {
    dispatch(requestToken());
    return getToken().then(
      (data) => dispatch(receivedTokenSuccess(data)),
      (error) => dispatch(receivedTokenError(error.message)),
    );
  };
}

export const saveQuestions = (questions) => ({
  type: SAVE_QUESTIONS,
  questions,
});
export const userLogin = ({ name, email }) => ({
  type: USER_LOGIN,
  name,
  email,
});
