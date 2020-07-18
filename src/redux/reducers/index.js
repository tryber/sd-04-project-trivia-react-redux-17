import { combineReducers } from 'redux';
import {
  REQUEST_TOKEN,
  RECEIVE_TOKEN_SUCCESS,
  RECEIVE_TOKEN_ERROR,
  USER_LOGIN,
  RESET_USER_LOGIN,
  SAVE_SETTINGS,
  ADD_ASSERTION,
  SET_TIMER,
  RESET_TIMER,
} from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  token: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  timer: 30,
  // ranking: [{ name: '', score: 0, picture: '' }],
  isLogged: false,
  settings: {
    category: 'all',
    difficulty: 'all',
    type: 'all',
  },
};

function calculateScore(timer, difficulty) {
  let level;
  if (difficulty === 'hard') level = 3;
  if (difficulty === 'medium') level = 2;
  if (difficulty === 'easy') level = 1;
  return 10 + timer * level;
}

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_TOKEN:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.data.token,
      };
    case RECEIVE_TOKEN_ERROR:
      return {
        ...state,
        isFetching: false,
      };
    case USER_LOGIN:
      return {
        ...state,
        player: {
          ...state.player,
          name: action.userName,
          gravatarEmail: action.userEmail,
        },
        isLogged: true,
      };
    case RESET_USER_LOGIN:
      return {
        ...state,
        isLogged: false,
      };
    case SAVE_SETTINGS:
      return {
        ...state,
        settings: action.settings,
      };
    case ADD_ASSERTION: {
      return {
        ...state,
        player: {
          ...state.player,
          assertions: state.player.assertions + 1,
          score: state.player.score + calculateScore(state.timer, action.difficulty),
        },
      };
    }
    case SET_TIMER:
      return {
        ...state,
        timer: state.timer === 0 ? 0 : state.timer - 1,
      };
    case RESET_TIMER:
      return {
        ...state,
        timer: 30,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  reducer,
});

export default rootReducer;
