import { combineReducers } from 'redux';
import issuerReducer from './issuer';
import loginReducer from "./login";
import accountReducer from "./accounts";
import buyReducer from './buy';
import sellReducer from './sell';

function web3(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state,  connection: action.connection }
    case 'WEB3_ACCOUNT_LOADED':
      return { ...state, account: action.account }
    case 'ETHER_BALANCE_LOADED':
      return { ...state, balance: action.balance }
    default:
      return state
  }
}

// function token(state = {}, action) {
//   switch (action.type) {
//     case 'PEARLZZ_TOKEN_LOADED':
//       return { ...state, loaded: true, contract: action.contract }
//     case 'TOKEN_BALANCE_LOADED':
//       return { ...state, balance: action.balance }
//     default:
//       return state
//   }
// }

function exchange(state = {}, action) {
  switch (action.type) {
    case 'PEARLZZ_EXCHANGE_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  web3,
//  token,
  exchange,
  login: loginReducer,
  issuer: issuerReducer,
  accounts: accountReducer,
  buy: buyReducer,
  sell: sellReducer
})

export default rootReducer
