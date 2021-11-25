const truffleAssert = require('truffle-assertions');
const PearlZZExchange = artifacts.require("PearlZZExchange");

const EVM_REVERT = 'VM Exception while processing transaction: revert'
const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

const ether = (n) => {
	return new web3.utils.BN(
		web3.utils.toWei(n.toString(), 'ether')
	)
}

// same as ether
// export 
const tokens = (n) => ether(n)
require ('chai')
	.use(require('chai-as-promised'))
	.should()


contract('PearlZZExchange', (accounts) => {
	const tokenName = 'PearlZZ'
	const tokenSymbol = 'PRLZ'
	const tokenDecimals = 18
	const tstIssuerAddress = accounts[9];

	const tokenTotalSupply = tokens(245678).toString()
	const stakedAmount = tokens(555666).toString()


//	let pearlzzExchange, pearlzzToken

	let pearlzzExchange

	beforeEach(async () => {
		pearlzzExchange = await PearlZZExchange.new(accounts)
	  pearlzzExchange.mint(255555, 2220000);
	})


	describe('buyPoints', () => {
		it('Ensure BuyOrderEvent fires', async () => {
			const ordId = 1;
			const iName = "TCP";
			const aId = "MPR12345";
			const uName = "amitabhbachchan";
			const nP = 5557;
	
			const result = await pearlzzExchange.buyPoints("TCP", "MPR12345", "amitabhbachchan", 5557);

			console.log("-----------------------------------------");
			console.log(result);
			console.log("-----------------------------------------");

			truffleAssert.eventEmitted(result, 'BuyOrderEvent', (evt) => {

				console.log("This is the event object:[", evt, "].");
				console.log("Input Order Id:[", ordId, "].]");
				console.log("Event Order Id:[", evt[0].orderId, "].");
				console.log("Event Issuer:[", evt[0].addToIssuer, "].");
				console.log("Event Account:[", evt[0].addToAccount, "].");
				console.log("Event User:[", evt[0].addToUser, "].");
				console.log("Event Num Of Points:[", evt[0].numOfPoints, "].");


				assert.equal(evt[0].orderId, ordId, 'OrderId did not match');
				assert.equal(evt[0].addToIssuer, iName, 'Issuer Name did not match');
				assert.equal(evt[0].addToAccount, aId, 'Account Id did not match');
				assert.equal(evt[0].addToUser, uName, 'User Name did not match');
				assert.equal(evt[0].numOfPoints, nP, 'Num of Points did not match');
				return true; 
			}, 'BuyOrderEvent orderId should match the orderId provided as input');
		})
	}) // buyPoints

	describe('sellPoints', () => {
		it('Ensure SellOrderEvent fires', async () => {
			const ordId = 1;
			const iName = "Walmart";
			const aId = "WL4395";
			const uName = "vinodkhanna";
			const nP = 125;
	
			const result = await pearlzzExchange.sellPoints(iName, aId, uName, nP);

			console.log("-----------------------------------------");
			console.log(result);
			console.log("-----------------------------------------");

			truffleAssert.eventEmitted(result, 'SellOrderEvent', (evt) => {
				console.log("This is the event object:[", evt, "].");
				console.log("Input Order Id:[", ordId, "].]");
				console.log("Event Order Id:[", evt[0].orderId, "].");
				console.log("Event Issuer:[", evt[0].takeFromIssuer, "].");
				console.log("Event Account:[", evt[0].takeFromAccount, "].");
				console.log("Event User:[", evt[0].takeFromUser, "].");
				console.log("Event Num Of Points:[", evt[0].numOfPoints, "].");

				assert.equal(evt[0].orderId, ordId, 'OrderId did not match');
				assert.equal(evt[0].takeFromIssuer, iName, 'Issuer Name did not match');
				assert.equal(evt[0].takeFromAccount, aId, 'Account Id did not match');
				assert.equal(evt[0].takeFromUser, uName, 'User Name did not match');
				assert.equal(evt[0].numOfPoints, nP, 'Num of Points did not match');
				return true; 
			}, 'SellOrderEvent orderId should match the orderId provided as input');
		}) 
	}) // sellPoints

	describe('transferPoints', () => {
		it('Ensure TransferOrderEvent fires', async () => {
			const TFordId = 0; // sell side of the Xfer points order

			const TFiName = "Walmart";
			const TFaId = "WL4395";
			const TFnP = 125;
	
			const ATordId = 0; // buy side of the Xfer points order

			const ATiName = "TCP";
			const ATaId = "MPR56789";

			const ATTFuName = "vinodkhanna";

			const result = await pearlzzExchange.transferPoints(ATiName, ATaId, 
																												TFiName, TFaId, 
																												ATTFuName, TFnP);

			console.log("-----------------------------------------");
			console.log(result);
			console.log("-----------------------------------------");

			truffleAssert.eventEmitted(result, 'TransferOrderEvent', (evt) => {
				console.log("This is the event object:[", evt, "].");
				console.log("Event Buy Order Id:[", evt[0].buyOrderId, "].");
				console.log("Event Sell Order Id:[", evt[0].sellOrderId, "].");

//				assert.equal(evt[0].buyOrderId, ordId, 'OrderId did not match');
//				assert.equal(evt[0].sellOrderId, ordId, 'OrderId did not match');
				return true; 
			}, 'TransferOrderEvent returned a buyOrderId, and sellOrderId for buy & sell side of the transfer transaction');
		}) 
	}) // transferPoints

	describe('cancelSellOrder', () => {
		it('Ensure CancelledSellOrderEvent fires', async () => {
			const ordId = 1;
			const iName = "Walmart";
			const aId = "WL4395";
			const uName = "vinodkhanna";
			const nP = 125;
	
			const result = await pearlzzExchange.sellPoints(iName, aId, uName, nP);
			console.log("-----------------------------------------");
			console.log(result);
			console.log("-----------------------------------------");
			truffleAssert.eventEmitted(result, 'SellOrderEvent', (sellPointsEvt) => {
				console.log("This is the event object:[", sellPointsEvt, "].");
				console.log("Input Order Id:[", ordId, "].]");
				console.log("Event Order Id:[", sellPointsEvt[0].orderId, "].");
				console.log("Event Issuer:[", sellPointsEvt[0].takeFromIssuer, "].");
				console.log("Event Account:[", sellPointsEvt[0].takeFromAccount, "].");
				console.log("Event User:[", sellPointsEvt[0].takeFromUser, "].");
				console.log("Event Num Of Points:[", sellPointsEvt[0].numOfPoints, "].");

				assert.equal(sellPointsEvt[0].orderId, ordId, 'OrderId did not match');
				assert.equal(sellPointsEvt[0].takeFromIssuer, iName, 'Issuer Name did not match');
				assert.equal(sellPointsEvt[0].takeFromAccount, aId, 'Account Id did not match');
				assert.equal(sellPointsEvt[0].takeFromUser, uName, 'User Name did not match');
				assert.equal(sellPointsEvt[0].numOfPoints, nP, 'Num of Points did not match');
				return true; 
			}, 'SellOrderEvent orderId should match the orderId provided as input');

			const cancelResult = await pearlzzExchange.cancelSellOrder(ordId);

			console.log("-----------------------------------------");
			console.log("This is the result from the cancelSellOrder:[", cancelResult, "].");
			console.log("-----------------------------------------");

			truffleAssert.eventEmitted(cancelResult, 'CancelledSellOrderEvent', (cancelledSellOrderEvent) => {
				console.log("This is the event object:[", cancelledSellOrderEvent, "].");

//				console.log("Input Order Id:[", ordId, "].]");
//				console.log("Event Order Id:[", cancelledSellOrderEvent[1].orderId, "].");
//				console.log("Event Order Id:[", cancelledSellOrderEvent[0].orderId, "].");
//				console.log("Event Issuer:[", cancelledSellOrderEvent[0].takeFromIssuer, "].");
//				console.log("Event Account:[", cancelledSellOrderEvent[0].takeFromAccount, "].");
//				console.log("Event User:[", cancelledSellOrderEvent[0].takeFromUser, "].");
//				console.log("Event Num Of Points:[", cancelledSellOrderEvent[0].numOfPoints, "].");
//
//				assert.equal(cancelledSellOrderEvent[0].orderId, ordId, 'OrderId did not match');
//				assert.equal(cancelledSellOrderEvent[0].takeFromIssuer, iName, 'Issuer Name did not match');
//				assert.equal(cancelledSellOrderEvent[0].takeFromAccount, aId, 'Account Id did not match');
//				assert.equal(cancelledSellOrderEvent[0].takeFromUser, uName, 'User Name did not match');
//				assert.equal(cancelledSellOrderEvent[0].numOfPoints, nP, 'Num of Points did not match');
				return true; 
			}, 'CancelledSellOrderEvent orderId should match the orderId provided as input');
		}) 
	}) // cancelSellOrder

	describe('cancelBuyOrder', () => {
		it('Ensure CancelledBuyOrderEvent fires', async () => {
			const ordId = 1;
			const iName = "Walmart";
			const aId = "WL4395";
			const uName = "vinodkhanna";
			const nP = 125;
	
			const result = await pearlzzExchange.buyPoints(iName, aId, uName, nP);
			console.log("-----------------------------------------");
			console.log(result);
			console.log("-----------------------------------------");
			truffleAssert.eventEmitted(result, 'BuyOrderEvent', (buyPointsEvt) => {
				console.log("This is the event object:[", buyPointsEvt, "].");
				console.log("Input Order Id:[", ordId, "].]");
				console.log("Event Order Id:[", buyPointsEvt[0].orderId, "].");
				console.log("Event Issuer:[", buyPointsEvt[0].addToIssuer, "].");
				console.log("Event Account:[", buyPointsEvt[0].addToAccount, "].");
				console.log("Event User:[", buyPointsEvt[0].addToUser, "].");
				console.log("Event Num Of Points:[", buyPointsEvt[0].numOfPoints, "].");

				assert.equal(buyPointsEvt[0].orderId, ordId, 'OrderId did not match');
				assert.equal(buyPointsEvt[0].addToIssuer, iName, 'Issuer Name did not match');
				assert.equal(buyPointsEvt[0].addToAccount, aId, 'Account Id did not match');
				assert.equal(buyPointsEvt[0].addToUser, uName, 'User Name did not match');
				assert.equal(buyPointsEvt[0].numOfPoints, nP, 'Num of Points did not match');
				return true; 
			}, 'BuyOrderEvent orderId should match the orderId provided as input');

			const cancelResult = await pearlzzExchange.cancelBuyOrder(ordId);

			console.log("-----------------------------------------");
			console.log("This is the result from the cancelBuyOrder:[", cancelResult, "].");
			console.log("-----------------------------------------");

			truffleAssert.eventEmitted(cancelResult, 'CancelledBuyOrderEvent', (cancelledBuyOrderEvent) => {
				console.log("This is the event object:[", cancelledBuyOrderEvent, "].");

//				console.log("Input Order Id:[", ordId, "].]");
//				console.log("Event Order Id:[", cancelledBuyOrderEvent[1].orderId, "].");
//				console.log("Event Order Id:[", cancelledBuyOrderEvent[0].orderId, "].");
//				console.log("Event Issuer:[", cancelledBuyOrderEvent[0].addToIssuer, "].");
//				console.log("Event Account:[", cancelledBuyOrderEvent[0].addToAccount, "].");
//				console.log("Event User:[", cancelledBuyOrderEvent[0].addToUser, "].");
//				console.log("Event Num Of Points:[", cancelledBuyOrderEvent[0].numOfPoints, "].");
//
//				assert.equal(cancelledBuyOrderEvent[0].orderId, ordId, 'OrderId did not match');
//				assert.equal(cancelledBuyOrderEvent[0].addToIssuer, iName, 'Issuer Name did not match');
//				assert.equal(cancelledBuyOrderEvent[0].addToAccount, aId, 'Account Id did not match');
//				assert.equal(cancelledBuyOrderEvent[0].addToUser, uName, 'User Name did not match');
//				assert.equal(cancelledBuyOrderEvent[0].numOfPoints, nP, 'Num of Points did not match');
				return true; 
			}, 'CancelledBuyOrderEvent orderId should match the orderId provided as input');
		}) 
	}) // cancelBuyOrder
})
