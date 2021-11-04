const initialState = [];

const buyReducer = (state = initialState, action) => {
  if (action.type === "ADD_SELL") {
    return [
      ...state,
      {
        orderid: action.payload.orderid,
        issuer: action.payload.issuer,
        points: action.payload.points,
      }
      
    ];
  }
  if(action.type === "CANCEL_SELL"){
    return []
  }

  return state;
};
export default buyReducer;

