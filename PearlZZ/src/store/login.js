const initialState = { isLoggedIn: false };

const loginReducer = (state = initialState, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      isLoggedIn: true,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      isLoggedIn: false,
    };
  }

  return state;
};
export default loginReducer;