import { combineReducers } from 'redux';
import {
  REQUEST_TOKEN,
  RECEIVE_TOKEN_SUCCESS,
  RECEIVE_TOKEN_ERROR,
  USER_LOGIN,
  SAVE_SETTINGS,
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
  // ranking: [{ name: '', score: 0, picture: '' }],
  isLogged: false,
};

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
    default:
      return state;
  }
}

const INITIAL_SETTINGS = {
  settings: {
    category: 'all',
    difficulty: 'all',
    type: 'all',
  },
};

function settingsReducer(state = INITIAL_SETTINGS, action) {
  switch (action.type) {
    case SAVE_SETTINGS:
      return {
        ...state,
        settings: action.settings,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  reducer,
  settingsReducer,
});

export default rootReducer;
