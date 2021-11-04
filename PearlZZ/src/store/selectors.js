import { get } from 'lodash'
import { createSelector } from 'reselect'
// import moment from 'moment'
import { ether, tokens } from '../helpers'

// import { groupBy, reject, maxBy, minBy } from 'lodash'
// import { ETHER_ADDRESS, GREEN, RED } from '../helpers'

// TODO: Move me to helpers file
export const formatBalance = (balance) => {
  const precision = 100 // 2 decimal places

  balance = ether(balance)
  balance = Math.round(balance * precision) / precision // Use 2 decimal places

  return balance
}

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)

const web3 = state => get(state, 'web3.connection')
export const web3Selector = createSelector(web3, w => w)

const pearlzzTokenLoaded = state => get(state, 'token.loaded', false)
export const pearlzzTokenLoadedSelector = createSelector(pearlzzTokenLoaded, tl => tl)

const pearlzzToken = state => get(state, 'token.contract')
export const tokenSelector = createSelector(pearlzzToken, t => t)

const pearlzzExchangeLoaded = state => get(state, 'exchange.loaded', false)
export const pearlzzExchangeLoadedSelector = createSelector(pearlzzExchangeLoaded, el => el)

const pearlzzExchange = state => get(state, 'exchange.contract')
export const exchangeSelector = createSelector(pearlzzExchange, e => e)

export const contractsLoadedSelector = createSelector(
//  pearlzzTokenLoaded,
  pearlzzExchangeLoaded,
//  (tl, el) => (tl && el)
// 	(tl) => (tl)
 	(el) => (el)
)

const etherBalance = state => get(state, 'web3.balance', 0)
export const etherBalanceSelector = createSelector(
  etherBalance,
  (balance) => {
    return formatBalance(balance)
  }
)

const tokenBalance = state => get(state, 'token.balance', 0)
export const tokenBalanceSelector = createSelector(
  tokenBalance,
  (balance) => {
    return formatBalance(balance)
  }
)

