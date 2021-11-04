// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity >=0.7.0 <0.9.0;

import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

import "./PearlZZToken.sol";
import "./GenericContract.sol"; 



contract PearlZZExchange is GenericContract, Ownable {
  using SafeMath for uint;

	//
  // Variables
	//
	address[] public accounts;
	PearlZZToken public pearlzzToken;

	address constant ETHER_ADDR = address(0); 

	uint256 public numOfBuyOrders;
	mapping(uint256 => BuyOrderStruct) public buyOrders;

	uint256 public numOfSellOrders;
	mapping(uint256 => SellOrderStruct) public sellOrders;

	uint256 public numOfFulfilledOrders;
//	mapping(uint256 => FulfilledOrderStruct) public fulfilledOrders;

	mapping(uint256 => bool) public buyOrdersCancelled;
	mapping(uint256 => bool) public buyOrdersFulfilled;

	mapping(uint256 => bool) public sellOrdersCancelled;
	mapping(uint256 => bool) public sellOrdersFulfilled;

	// 
	// Events
	//
	event	SetAccountsEvent(address[] _accounts);

	//
	//
	//
	event BuyOrderEvent(BuyOrderStruct);
	event SellOrderEvent(SellOrderStruct);

//	event BuyOrderEvent(uint256 orderId, string addToIssuer, string addToAccount, 
//							string addToUser, uint256 numOfPoints, uint256 buyOrderTimestamp);
//	event SellOrderEvent(uint256 orderId, string takeFromIssuer, string takeFromAccount, 
//							string takeFromUser, uint256 numOfPoints, uint256 sellOrderTimestamp);

	//
	// Actual trade / exchange of points
	// when an open order is selected by an user to fulfill it 
	// (buy order is fulfilled by a corresponding sell order)
	// (sell order is fulfilled by a corresponding buy order)
	//
	event FulfilledBuyOrderEvent(uint256 buyOrderId, uint256 sellOrderId, uint256 fulfilledTimestamp);
	event FulfilledSellOrderEvent(uint256 sellOrderId, uint256 buyOrderId, uint256 fulfilledTimestamp);

//	event CancelledBuyOrderEvent(uint256 buyOrderId, uint256 fulfilledTimestamp);
//	event CancelledSellOrderEvent(uint256 sellOrderId, uint256 fulfilledTimestamp);

	event CancelledBuyOrderEvent(BuyOrderStruct);
	event CancelledSellOrderEvent(SellOrderStruct);

	event TransferOrderEvent(uint256 buyOrderId, uint256 sellOrderId, uint256 transferTimestamp);

	// structs
	struct BuyOrderStruct {
						uint256 orderId;
						string addToIssuer;
						string addToAccount; 
						string addToUser;
						uint256 numOfPoints;
						uint256 buyOrderTimestamp;
	}

	struct SellOrderStruct{
						uint256 orderId;
						string takeFromIssuer;
						string takeFromAccount;
						string takeFromUser;
						uint256 numOfPoints; 
						uint256 sellOrderTimestamp;
	}

	constructor(address[] memory _accounts) {
		accounts = _accounts;	
		pearlzzToken = new PearlZZToken();
		emit SetAccountsEvent(accounts);
  } // constructor

	fallback() external {
		revert();
	}

	//
	// buy points
	//
	function buyPoints(string memory addToIssuer, string memory addToAccount, 
						string memory addToUser, uint256 numOfPoints) public returns(uint256) {
		numOfBuyOrders = numOfBuyOrders.add(1);
		buyOrders[numOfBuyOrders] = BuyOrderStruct(numOfBuyOrders, addToIssuer, addToAccount, 
																	addToUser, numOfPoints, 
																	block.timestamp);
//		emit BuyOrderEvent(numOfBuyOrders, addToIssuer, addToAccount, addToUser, numOfPoints, block.timestamp);

		emit BuyOrderEvent(buyOrders[numOfBuyOrders]);
		return(numOfBuyOrders);
	} // buyPoints

	//
	// fulfillBuyOrder
	//
	function fulfillABuyOrder(uint256 buyOrderId, string memory takeFromIssuer, 
						string memory takeFromAccount, string memory takeFromUser) public returns(uint256, uint256) {
		require(buyOrderId > 0 && buyOrderId <= numOfBuyOrders, "Error: orderId out of valid range. Invalid Id.");
		require(!buyOrdersFulfilled[buyOrderId], "Error: Buy Order already fulfilled.");
		require(!buyOrdersCancelled[buyOrderId], "Error: Buy Order already cancelled.");
		BuyOrderStruct storage buyOrder = buyOrders[buyOrderId];
		uint256 sellOrderId = sellPoints(takeFromIssuer, takeFromAccount, 
														takeFromUser, buyOrder.numOfPoints);
		emit FulfilledBuyOrderEvent(buyOrderId, sellOrderId, block.timestamp);
		buyOrdersFulfilled[buyOrderId] = true;
		numOfFulfilledOrders = numOfFulfilledOrders.add(1);
		return(buyOrderId, sellOrderId);
	} // fulfillABuyOrder

	//
	// sell points
	//
	function sellPoints(string memory takeFromIssuer, string memory takeFromAccount, 
							string memory takeFromUser, uint256 numOfPoints ) public returns(uint256) {
		numOfSellOrders = numOfSellOrders.add(1);
		sellOrders[numOfSellOrders] = SellOrderStruct(numOfSellOrders, takeFromIssuer, 
																		takeFromAccount, takeFromUser, 
																		numOfPoints, block.timestamp);

//		emit SellOrderEvent(numOfSellOrders, takeFromIssuer, takeFromAccount, takeFromUser, numOfPoints, block.timestamp);

		emit SellOrderEvent(sellOrders[numOfSellOrders]);
		return(numOfSellOrders);
	} // sellPoints()

	//
	//
	//
	function fulfillASellOrder(uint256 sellOrderId, string memory addToIssuer, 
							string memory addToAccount, string memory addToUser) public returns(uint256, uint256) {
		require(sellOrderId > 0 && sellOrderId <= numOfSellOrders, "Error: orderId out of valid range. Invalid Id.");
		require(!sellOrdersFulfilled[sellOrderId], "Error: Sell Order already fulfilled.");
		require(!sellOrdersCancelled[sellOrderId], "Error: Sell Order already cancelled.");
		SellOrderStruct storage sellOrder = sellOrders[sellOrderId];
		uint256 buyOrderId = buyPoints(addToIssuer, addToAccount, addToUser, sellOrder.numOfPoints);
		emit FulfilledSellOrderEvent(sellOrderId, buyOrderId, block.timestamp);
		sellOrdersFulfilled[sellOrderId] = true;
		numOfFulfilledOrders = numOfFulfilledOrders.add(1);
		return(sellOrderId, buyOrderId);
	} // fulfillSellOrder

	//
	// transfer points from one account to the other for the same user
	//
	function transferPoints(
													string memory addToIssuer, string memory addToAccount,
													string memory takeFromIssuer, string memory takeFromAccount,
													string memory addToTakeFromUser, 
													uint256 numOfPoints) public onlyOwner returns(uint256, uint256) {
		uint256 buyOrderId;
		uint256 sellOrderId;
		buyOrderId = buyPoints(addToIssuer, addToAccount, addToTakeFromUser, numOfPoints);
		(buyOrderId, sellOrderId) = fulfillABuyOrder(buyOrderId, takeFromIssuer, 
																		takeFromAccount, addToTakeFromUser);
		emit TransferOrderEvent(buyOrderId, sellOrderId, block.timestamp);
		return(buyOrderId, sellOrderId);
	} // transferPoints

	//
	// cancel a buy order
	//
	function cancelBuyOrder(uint256 _orderId) public onlyOwner {
		BuyOrderStruct storage buyOrder = buyOrders[_orderId];
		require(buyOrder.orderId == _orderId, "The order doesn't exist."); 
		// in reality we should check if the order cancellation is being requested by the same user who originally created it
		// match msg.sender with the address on the order obejct itself
		// we don't store an address right now, for thie MVP/POC.
		//
		buyOrdersCancelled[_orderId] = true;	
//		emit CancelledBuyOrderEvent(_orderId, block.timestamp);
		emit CancelledBuyOrderEvent(buyOrder);
	}	// cancelBuyOrder

	function cancelSellOrder(uint256 _orderId) public onlyOwner {
		SellOrderStruct storage sellOrder = sellOrders[_orderId];
		require(sellOrder.orderId == _orderId, "The order doesn't exist."); // check if the order actually exists
		// in reality we should check if the order cancellation is being requested by the same user who originally created it
		// match msg.sender with the address on the order obejct itself
		// we don't store an address right now, for thie MVP/POC.
		//
		sellOrdersCancelled[_orderId] = true;	
//		emit CancelledSellOrderEvent(_orderId, block.timestamp);
		emit CancelledSellOrderEvent(sellOrder);
	}	// cancelSellOrder

	//
	// mint PRLZ tokens
	//
  function mint(uint256 _stakedLiabilityAmt, uint256 _totalPtsPromised) public onlyOwner returns(bool) {
		bool minted = pearlzzToken.mint(_stakedLiabilityAmt, _totalPtsPromised);
		return(minted);
	} // mint()

	function getAccounts() public view onlyOwner returns(address[] memory) {
		return(accounts);
	}

	function getPearlZZToken() public view onlyOwner returns(PearlZZToken) {
		return(pearlzzToken);
	}

	function pearlzzTokenName() public view returns(string memory) {
		return(pearlzzToken.name());	
	}

	function pearlzzTokenSymbol() public view returns(string memory) {
		return(pearlzzToken.symbol());	
	}

	function pearlzzTokenDecimals() public view returns(uint256) {
		return(pearlzzToken.decimals());	
	}

	function pearlzzTokenTotalSupply() public view returns(uint256) {
		return(pearlzzToken.totalSupply());	
	}

	function pearlzzTokenTotalPtsPromised() public view returns(uint256) {
		return(pearlzzToken.totalPtsPromised());	
	}
} // PearlZZExchange

