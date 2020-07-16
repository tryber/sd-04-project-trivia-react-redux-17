import { USER_LOGIN } from '../actions/actionsLogin';

const initialState = {
  userEmail: '',
  userName: '',
  isLogged: false,
  token: '',
};

const loginReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case USER_LOGIN:
      return {
        ...data,
        isLogged: true,
      };
    default:
      return state;
  }
};

export default loginReducer;
