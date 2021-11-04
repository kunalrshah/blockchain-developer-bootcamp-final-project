const initialState = []
// [{
//     name: 'United Airlines',
//     address: '0x5eE8dDFa4a1Fb0a790dDF697A164C2C4fdC49Ead',
//     loyalty: 250000000000, // $2.5 Billion USD 
//     pointsLiability: 500000000, // 500 million points
//     program: 'United Mileage Plus',
//     members: 50000000,
//   },
//   {
//     name: 'Walmart',
//     address: '0x5eE8dDFa4a1Fb0a790dDF697A164C2C4fdC49Ead',
//     loyalty: 500000, // 500,000.00
//     pointsLiability: 7000000, // 7 million
//     program: 'My Mart Rewards',
//     members: 2000000,
//   },
//   {
//     name: 'Amazon',
//     address: '0x5eE8dDFa4a1Fb0a790dDF697A164C2C4fdC49Ead',
//     loyalty: 50000000, // 50 million
//     pointsLiability: 17500000000, // 17 billion points
//     program: 'Prime Rewards',
//     members: 175000000, // 175 million
//   },
//   {
//     name: 'GolfSmith',
//     address: '0x5eE8dDFa4a1Fb0a790dDF697A164C2C4fdC49Ead',
//     loyalty: 750000, // 
//     pointsLiability: 68000000, // 68 million
//     program: 'Score More Rewards',
//     members: 5000000,
//   },
//   {
//     name: 'Starbucks',
//     address: '0x5eE8dDFa4a1Fb0a790dDF697A164C2C4fdC49Ead',
//     loyalty: 1500000, // 500,000.00
//     pointsLiability: 100000000, // 100 million
//     program: 'My Bucks',
//     members: 20000000, // 20 million
//   }];

const issuerReducer = (state = initialState, action) => {
  if (action.type === "ADD_ISSUER") {
    return [
      ...state,
      {
        address: action.payload.address,
        name: action.payload.name,
        loyalty: action.payload.loyalty,
        program: action.payload.program,
        members: action.payload.members,
        pointsLiability:action.payload.pointsLiability,
        ppvalue: action.payload.ppvalue
      }
      
    ];
  }
  if(action.type === "REMOVE_ISSUER"){
    return []
  }

  return state;
};
export default issuerReducer;
