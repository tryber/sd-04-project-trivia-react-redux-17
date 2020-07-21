import { getToken } from '../../services/api';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN_SUCCESS = 'RECEIVE_TOKEN_SUCCESS';
export const RECEIVE_TOKEN_ERROR = 'RECEIVE_TOKEN_ERROR';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const USER_LOGIN = 'USER_LOGIN';
export const RESET_USER_LOGIN = 'RESET_USER_LOGIN';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const ADD_ASSERTION = 'ADD_ASSERTION';
export const SET_TIMER = 'SET_TIMER';
export const RESET_TIMER = 'RESET_TIMER';
export const UPDATE_RANKING = 'UPDATE_RANKING';
export const RESET_PLAYER = 'RESET_PLAYER';

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

export function fetchToken() {
  return (dispatch) => {
    dispatch(requestToken());
    return getToken().then(
      (data) => dispatch(receivedTokenSuccess(data)),
      (error) => dispatch(receivedTokenError(error.message)),
    );
  };
}

export const saveQuestions = (questions, score) => ({
  type: SAVE_QUESTIONS,
  questions,
  score,
});

export const userLogin = ({ userName, userEmail }) => ({
  type: USER_LOGIN,
  userName,
  userEmail,
});

export const resetUserLogin = () => ({
  type: RESET_USER_LOGIN,
});

export const saveSettings = (settings) => ({
  type: SAVE_SETTINGS,
  settings,
});

export const addAssertion = (difficulty) => ({
  type: ADD_ASSERTION,
  difficulty,
});

export const setTimer = () => ({
  type: SET_TIMER,
});

export const resetTimer = () => ({
  type: RESET_TIMER,
});

export const updateRanking = (name, score, picture) => ({
  type: UPDATE_RANKING,
  name,
  score,
  picture,
});

export const resetPlayer = () => ({
  type: RESET_PLAYER,
});
