import { combineReducers } from 'redux';
import {
  REQUEST_TRIVIA,
  RECEIVE_TRIVIA_SUCCESS,
  RECEIVE_TRIVIA_ERROR,
  USER_LOGIN,
} from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  token: '',
  correct: 0,
  userEmail: '',
  userName: '',
  isLogged: false,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_TRIVIA:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_TRIVIA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.data.token,
      };
    case RECEIVE_TRIVIA_ERROR:
      return {
        ...state,
        isFetching: false,
      };
    case USER_LOGIN:
      return {
        ...state,
        userEmail: action.userEmail,
        userName: action.userName,
        isLogged: true,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  reducer,
});

export default rootReducer;
