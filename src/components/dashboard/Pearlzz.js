import React, { Component } from 'react'
import Navbar from '../Navbar'
import Content from '../Content'
import { connect } from 'react-redux'
import {
	loadWeb3,
	loadAccount,
	loadPearlZZExchange,
	// addAccountToWallet,
	// addIssuer
} from '../../store/interactions'
import { contractsLoadedSelector } from '../../store/selectors'
import './Pearlzz.css';

import Wallet from './Wallet';
import Exchange from './Exchange/Exchange';
import OrderList from './Exchange/OrderList'

class Pearlzz extends Component {
	UNSAFE_componentWillMount() {
		this.loadBlockchainData(this.props.dispatch)
	}
	constructor() {
		super()
		this.state = {
			marketcap: 0
		}
	}
	async loadBlockchainData(dispatch) {
		const web3 = await loadWeb3(dispatch)

		const networkId = await web3.eth.net.getId()
		console.log("Network Id: ", networkId)
		const account = await loadAccount(web3, dispatch)

		const pearlzzExchange = await loadPearlZZExchange(web3, networkId, dispatch)
		console.log("PearlZZExchange:[", pearlzzExchange, "].");
		if (!pearlzzExchange) {
			// window.alert('Pearlzz.js - PearlZZExchange contract not detected on the current network. Please select another network with Metamask.')
			return
		}
		let tempcap = await pearlzzExchange.methods.pearlzzTokenTotalSupply().call();
		var formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		  });
		  
		  let formatted = formatter.format(tempcap); /* $2,500.00 */
		this.setState({
			...this.state,
			marketcap: formatted
		})
		// console.log("Pearlzz.js:::::PearlZZExchange:::", pearlzzExchange, "].");
		// console.log("Pearlzz.js:::::PearlZZExchange.Accounts:::", pearlzzExchange.accounts, "].");
		// console.log("Pearlzz.js:::::Accounts[0]:", account, "].");

		// const issuerName = "TCP";
		// const programName = "MPR";
		// const numMembers = 2000000;
		// const stakedAmount = 255555.00;
		// const usdValPt1KDivisor = 1000;
		// const rwdsEarnDivisor = 25;
		// const minRwdsPtsThreshold = 100;
		// const xferOutScalingPercent = 85;
		// const loyaltyId = "MPR1234";
		// const pointsEarned = 9975;

		//		console.log("Pearlzz.js:::11111:::ADD ISSUER:[", account, issuerName, programName, loyaltyId, pointsEarned, "].");
		//		await addIssuer(account, issuerName, programName, numMembers, stakedAmount, usdValPt1KDivisor,
		//			rwdsEarnDivisor, minRwdsPtsThreshold, xferOutScalingPercent,
		//			pearlzzExchange, dispatch, networkId)
		//
		//		console.log("Pearlzz.js:::22222:::ADD ACCOUNT TO WALLET:[", account, issuerName, programName, loyaltyId, pointsEarned, "].");
		//		await addAccountToWallet(account, issuerName, programName, loyaltyId, pointsEarned,
		//			pearlzzExchange, dispatch, networkId);


	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row align-items-stretch">
					<nav id="sidebarMenu" className="col-md-3 col-lg-3 d-md-block bg-dark text-white navbar-dark mainsidebar collapse text-center">
						<div className="d-flex flex-row align-items-center justify-content-center p-3">
							<h3 className="px-4 fw-light"><i className="bi bi-arrow-left-right text-secondary me-3"></i>PearlZZ Exchange</h3>
						</div>
						<div className="d-flex flex-row align-items-center justify-content-center p-3">
							<h5 className="p-2 fw-light text-light"><i className="bi bi-pie-chart-fill text-secondary me-3"></i>Marketcap {this.state.marketcap}</h5>
							{/* <h5 className="p-2 fw-light"><i className="bi bi-arrow-left-right text-secondary me-3"></i>Total Points Promised</h5> */}
						</div>
						<div className="position-sticky pt-3">
							<ul className="nav flex-column">
								{this.props.contractsLoaded ? <Content /> : <div className="content"></div>}
							</ul>
							<OrderList />
						</div>
					</nav>
					<main className="col-md-9 ms-sm-auto col-lg-9">
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-0 mb-3">
							<Navbar account />
						</div>
						<div className="row align-items-stretch">
							<div className="col-md-5">
								<Exchange />
							</div>
							<div className="col-md-7 border-start">
								<Wallet />
							</div>
						</div>
					</main>
				</div>
			</div>
		);
	}
}

//function mapDispathToProps(dispatch) {
//}

function mapStateToProps(state) {
	return {
		contractsLoaded: contractsLoadedSelector(state),
		// isLoggedIn: loginImage.isLoggedIn,
		// issuer: state.issuer
	}
}

export default connect(mapStateToProps)(Pearlzz)
