const initialState = [{
  issuer: 'United Airlines',
  id: 'WN12345',
  points: 25000,
},
{
  issuer: 'Walmart',
  id: 'WL4395',
  points: 567,
},
{
  issuer: 'Amazon',
  id: 'AL4395',
  points: 499,
},
{
  issuer: 'GolfSmith',
  id: 'GL4395',
  points: 555,
},
{
  issuer: 'Starbucks',
  id: 'SWL4395',
  points: 900,
}];

const accountReducer = (state = initialState, action) => {
  if (action.type === "ADD_ACCOUNT") {
    return [
      ...state,
      {
        id: action.payload.id,
        issuer: action.payload.issuer,
        points: action.payload.points,
        program: action.payload.program,
      }

    ];
  }
  if (action.type === "REMOVE_ACCOUNT") {
    return []
  }

  return state;
};
export default accountReducer;

