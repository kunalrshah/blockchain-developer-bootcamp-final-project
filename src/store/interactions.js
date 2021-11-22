import Web3 from 'web3'
import {
  web3Loaded,
  web3AccountLoaded,
  pearlzzExchangeLoaded,
	addingLoyaltyIssuer,
	addingLoyaltyAccountToWallet,
	loyaltyIssuerAdded,
	addedAccountToWallet
} from './actions'

//  pearlzzTokenLoaded,

import PearlZZExchange from '../abis/PearlZZExchange.json'

import { ETHER_ADDRESS } from '../helpers'

export const loadWeb3 = async (dispatch) => {
  if(typeof window.ethereum!=='undefined'){
    const web3 = new Web3(window.ethereum)
    dispatch(web3Loaded(web3))
    return web3
  } else {
    // window.alert('Please install MetaMask')
    window.location.assign("https://metamask.io/")
  }
}

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts()
  console.log("loadAccount::::Accounts: [", accounts, "]")
  const account = await accounts[0]
	console.log("loadAccount::::Account: [", account, "]")

  if(typeof account !== 'undefined'){
    dispatch(web3AccountLoaded(account))
    return account
  } else {
    // window.alert('Please login with MetaMask')
    return null
  }
}

export const loadPearlZZExchange = async (web3, networkId, dispatch) => {
  try {
		console.log("loadPearlZZExchange: Interaction.js: networkId: ", networkId, "]")
    const exchange = new web3.eth.Contract(PearlZZExchange.abi, 
													PearlZZExchange.networks[networkId].address)
    dispatch(pearlzzExchangeLoaded(exchange))
    return exchange
  } catch (error) {
    console.log('PearlZZ Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const addIssuer = async (account, issuerName, programName, numOfMembers, stakedAmount,
																		usdValPt1KDivisor, rwdsEarnDivisor, 
																		minRwdsPtsThreshold, xferOutScalingPercent,
																		exchange, dispatch, networkId) => {
	try {
			console.log("addIssuer:::::networkId:[", networkId, "].");
			console.log("addIssuer:::::Account:[", account, "].");
			console.log("addIssuer:::::[", account, issuerName, programName, "].");
			await exchange.methods.addIssuer(
						account, issuerName, programName, numOfMembers, stakedAmount, 
						usdValPt1KDivisor, rwdsEarnDivisor, minRwdsPtsThreshold, xferOutScalingPercent)
						.send({ from: account }).on('transactionHash', (hash) => {
     				dispatch(addingLoyaltyIssuer(issuerName))
  				}
			)
//		return onboardIssuerStream
	} // try
	catch (error) {
		console.log("addIssuer catch error section")
		console.log(error)
		// alert(error)
		return null
	} // catch
} // onboardLoyaltyIssuer()

export const addAccountToWallet = async (account, issuerName, programName, loyaltyId, pointsEarned,
										exchange, dispatch, networkId) => {
	try {
			console.log("Interactions.js:::ADD ACCOUNT TO WALLET:[", account, issuerName, programName, loyaltyId, pointsEarned, "].");
			await exchange.methods.addAccountToUserWallet(
						account, issuerName, programName, loyaltyId, pointsEarned)
						.send({ from: account }).on('transactionHash', (hash) => {
						dispatch(addingLoyaltyAccountToWallet(account))
					} // hash
			) // on()
	} // try
	catch (error) {
		console.log("addAccountToWallet catch error section");
		console.log(error);
		// alert(error);
		return null;
	} // catch
} // addAccountToWallet()


export const subscribeToEvents = async (exchange, dispatch) => {
	exchange.events.LoyaltyIssuerAdded({}, (error,event) => {
		dispatch(loyaltyIssuerAdded(event.returnValues))
	})

  exchange.events.AccountAddedToWallet({}, (error, event) => {
    dispatch(addedAccountToWallet(event.returnValues))
  })

} // subscribeToEvents
