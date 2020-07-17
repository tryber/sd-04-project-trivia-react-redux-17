import { combineReducers } from 'redux';
import {
  REQUEST_TOKEN,
  RECEIVE_TOKEN_SUCCESS,
  RECEIVE_TOKEN_ERROR,
  USER_LOGIN,
} from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  token: '',
  assertions: 0,
  score: 0,
  email: '',
  name: '',
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
