// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity >=0.7.0 <0.9.0;

import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

import "./PearlZZToken.sol";
import "./GenericContract.sol"; 



///	@title Master contract that manages the functionality of Loyalty Alliances, Loyalty Wallet, Points Exchange
/// @author Kunal R. Shah
/// @notice This is the main contract for PearlZZ 
/// @notice It manages "Loyalty Alliances" - an alliance of brands / businesses 
/// @notice It allows for alliances at a local town, city, county, state, country, and global levels
/// @notice	It manages onboarding of Loyalty Issuer's Loyalty Liability stake to PearlZZ
/// @notice It manages individual customers loyalty wallets
/// @notice It enables a peer-to-peer trading of loyalty points
/// @dev The PearlZZToken is a token, but it doesn't yet conform to the ERC20 spec. deliberately
/// @dev The PearlZZToken is meant to be swappable with other ERC20 tokens.
/// @dev It is mainly meant to provide value in terms of loyalty points transferrability / exchange
contract PearlZZExchange is GenericContract, Ownable {
  using SafeMath for uint;

	//
  // Variables
	//

//	address constant ETHER_ADDR = address(0); 

	/// @notice account addresses provided
	address[] public accounts;

	/// @notice pearlZZToken is the instance of the PearlZZToken contract
	PearlZZToken public pearlzzToken;


	/// @notice numOfBuyOrders represents the total number of buy orders on the exchange
	/// @dev this buy orders counter is also incremented by 1 while creating a new buy order
	/// @dev The buy orders counters and the sell orders counters are manintained separately
	uint256 public numOfBuyOrders;

	/// @notice buyOrders is a mapping of buyOrderIds to their respective Order details
	mapping(uint256 => BuyOrderStruct) public buyOrders;

	/// @notice numOfSellOrders represents the total number of sell orders on the exchange
	/// @dev this sell orders counter is also incremented by 1 while creating a new sell order
	/// @dev The sell orders counters and the buy orders counters are manintained separately
	uint256 public numOfSellOrders;

	/// @notice sellOrders is a mapping of sellOrderIds to their respective Order details
	mapping(uint256 => SellOrderStruct) public sellOrders;

	/// @notice numOfFulfilledOrders represents the number of orders fulfilled across both buy and sell orders
	/// @dev please note this counter keeps track of all the fulfilled orders - buy orders and sell orders
	uint256 public numOfFulfilledOrders;

	/// @notice buyOrdersCancelled is the mapping of orderIds and the corresponding buy orders that were cancelled
	mapping(uint256 => bool) public buyOrdersCancelled;

	/// @notice buyOrdersFulfilled is the mapping of orderIds and the corresponding buy orders that were fulfilled
	mapping(uint256 => bool) public buyOrdersFulfilled;

	/// @notice sellOrdersCancelled is the mapping of orderIds and the corresponding sell orders that were cancelled
	mapping(uint256 => bool) public sellOrdersCancelled;

	/// @notice sellOrdersFulfilled is the mapping of orderIds and the corresponding sell orders that were fulfilled
	mapping(uint256 => bool) public sellOrdersFulfilled;

	// 
	// Events
	//

	/// @notice SetAccountsEvent event was used primarily during debugging / learning
	/// @dev this event isn't truly necessary anymore. It doesn't hurt to have it anyway.
	event	SetAccountsEvent(address[] _accounts);

	/// @notice BuyOrderEvent is an event that should be emitted for every Buy Order placed
	/// @param buyOrder is for representing the buy order details in the BuyOrderStruct type
	event BuyOrderEvent(BuyOrderStruct buyOrder);

	/// @notice SellOrderEvent is an event that should be emitted for every Sell Order placed
	/// @param sellOrder is for representing the sell order details in the SellOrderStruct type
	event SellOrderEvent(SellOrderStruct sellOrder);

	//
	// What is Fulfillment Orders on the PearlZZ Exchange - 
	// An open buy order is fulfilled by a sell order that another user places with an intent of fulfilling the buy order
	// An open sell order is fulfilled by a buy order that another user places with an intent of fulfilling the sell order
	// These orders represent the actual peer-to-peer exchange of points 
	//
	// when an open order is selected by an user to fulfill it 
	// (buy order is fulfilled by a corresponding sell order)
	// (sell order is fulfilled by a corresponding buy order)
	//
	// The TransferOrder is similar, with both buy and sell side are accounts for the same user (consumer)
	//

	/// @notice FulfilledBuyOrderEvent is emitted when a buy order is fulfilled by a corresponding sell order
	/// @param buyOrderId is the orderId for the buy order that is being fulfilled
	/// @param sellOrderId is the orderId for the sell order that is fulfilling the buy order
	/// @param fulfilledTimestamp is the timestamp representing the exact time of fulfillment
	event FulfilledBuyOrderEvent(uint256 buyOrderId, uint256 sellOrderId, uint256 fulfilledTimestamp);

	/// @notice FulfilledSellOrderEvent is emitted when a sell order is fulfilled by a corresponding buy order
	/// @param sellOrderId is the orderId for the sell order that is being fulfilled
	/// @param buyOrderId is the orderId for the buy order that is fulfilling the sell order
	event FulfilledSellOrderEvent(uint256 sellOrderId, uint256 buyOrderId, uint256 fulfilledTimestamp);

	/// @notice CancelledBuyOrderEvent is an event that should be emitted for every Cancellation of a Buy Order
	/// @param buyOrder is for representing the buy order details in the BuyOrderStruct type
	event CancelledBuyOrderEvent(BuyOrderStruct buyOrder);

	/// @notice CancelledSellOrderEvent is an event that should be emitted for every Cancellation of a Sell Order
	/// @param sellOrder is for representing the sell order details in the SellOrderStruct type
	event CancelledSellOrderEvent(SellOrderStruct sellOrder);

	/// @notice TransferOrderEvent represents a order for transferring points from one loyalty account to another for same user
	/// @param buyOrderId represents the buy-side order (points are added)
	/// @param sellOrderId represents the sell-side order (points are taken and transferred to buy-side)
	/// @param transferTimestamp represents the timestamp of the placement of this transfer order
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


	/// @notice PearlZZExchange Constructor
	/// @dev initialize PearlZZToken
	constructor(address[] memory _accounts) {
		accounts = _accounts;	
		pearlzzToken = new PearlZZToken();
		emit SetAccountsEvent(accounts);
  } // constructor

	fallback() external {
		revert();
	}

	/// @notice buyPoints
	/// @notice Creates a Buy order (for buying loyalty points) to the PearlZZ Loyalty Points Exchange
	/// @dev Emits BuyOrderEvent
	/// @param addToIssuer A loyalty issuer name
	/// @param addToAccount A loyalty account for this given loyalty issuer
	/// @param addToUser A user who owns the loyalty account
	/// @param numOfPoints Number of points to Buy from the PearlZZ Points Exchange
	/// @return OrderId for the newly created buy order
	function buyPoints(string memory addToIssuer, string memory addToAccount, 
						string memory addToUser, uint256 numOfPoints) public returns(uint256) {
		numOfBuyOrders = numOfBuyOrders.add(1);
		buyOrders[numOfBuyOrders] = BuyOrderStruct(numOfBuyOrders, addToIssuer, addToAccount, 
																	addToUser, numOfPoints, 
																	block.timestamp);
		emit BuyOrderEvent(buyOrders[numOfBuyOrders]);
		return(numOfBuyOrders);
	} // buyPoints

	/// @notice fulfillABuyOrder
	/// @notice This is meant for fulfillment of a buy order on the PearlZZ Points Exchange Orderbook
	/// @dev
	/// @param buyOrderId An Order which is being fulfilled by selling points from a seller's loyalty account
	/// @param takeFromIssuer An Issuer whose Loyalty Liability will reduce by numOfPoints from the fulfillment Buy Order
	/// @param takeFromAccount User's Loyalty Account from which points will be sold to fulfill the buy order
	///	@param takeFromUser User who is fulfilling the Buy Order
	/// @return buyOrderId the same orderId which was chosen for fulfillment by the user from the PearlZZ DApp
	/// @return sellOrderId Newly created sellOrder to fulfill the buyOrder
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

	///	@notice sellPoints
	/// @notice Creates a Sell order (for selling loyalty points) to the PearlZZ Loyalty Points Exchange
	/// @dev Emits SellOrderEvent
	/// @param takeFromIssuer A loyalty issuer name
	/// @param takeFromAccount A loyalty account for this given loyalty issuer
	/// @param takeFromUser A user who owns the loyalty account
	/// @param numOfPoints Number of points to Sell on the PearlZZ Points Exchange
	/// @return OrderId for the newly created sell order
	function sellPoints(string memory takeFromIssuer, string memory takeFromAccount, 
							string memory takeFromUser, uint256 numOfPoints ) public returns(uint256) {
		numOfSellOrders = numOfSellOrders.add(1);
		sellOrders[numOfSellOrders] = SellOrderStruct(numOfSellOrders, takeFromIssuer, 
																		takeFromAccount, takeFromUser, 
																		numOfPoints, block.timestamp);
		emit SellOrderEvent(sellOrders[numOfSellOrders]);
		return(numOfSellOrders);
	} // sellPoints()

	/// @notice fulfillASellOrder
	/// @notice This is meant for fulfillment of a sell order on the PearlZZ Points Exchange Orderbook
	/// @dev Emits FulfilledSellOrderEvent(sellOrderId, buyOrderId, timestamp)
	/// @param sellOrderId An Order which is being fulfilled by buying points for a buyer's loyalty account
	/// @param addToIssuer An Issuer whose Loyalty Liability will increase by numOfPoints from the fulfillment Buy Order
	/// @param addToAccount User's Loyalty Account to which points will be added to fulfill the sell order
	///	@param addToUser User who is fulfilling the Sell Order
	/// @return sellOrderId the same orderId which was chosen for fulfillment by the user from the PearlZZ DApp
	/// @return buyOrderId Newly created buyOrder to fulfill the sellOrder
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

	/// @notice transferPoints
	/// @notice This is meant for a consumer to transfer points across their own two different loyalty accounts 
	/// @dev Emits TransferOrderEvent(buyOrderId, sellOrderId, timestamp)
	/// @param addToIssuer loyalty points will be added to this Issuer, increading their loyalty liability
	/// @param addToAccount loyalty points will be added to this account
	///	@param takeFromIssuer loyalty points will be taken from this Issuer, reducing their loyalty liability
	/// @param takeFromAccount loyalty points will be taken from this account
	/// @param addToTakeFromUser a consumer / user who is transferring their points from one account to another
	/// @param numOfPoints is the number of loyalty points to be transferred from one account to another
	/// @return buyOrderId order for the Buy side of the transfer
	/// @return sellOrderId order for the Sell side of the transfer
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

	/// @notice cancelBuyOrder
	/// @notice cancel a buy order
	/// @dev this contract keeps the IDs for the buy orders separates from sell orders
	/// @dev Emits CancelledBuyOrderEvent(BuyOrderStruct)
	/// @param _orderId Order Id for the buy order to be cancelled
	function cancelBuyOrder(uint256 _orderId) public onlyOwner {
		BuyOrderStruct storage buyOrder = buyOrders[_orderId];
		require(buyOrder.orderId == _orderId, "The order doesn't exist."); 

		// in reality we should check if the order cancellation is being requested by the same user 
		// who originally created it
		// match msg.sender with the address on the order obejct itself
		// we don't store an address right now, for thie MVP/POC.
		//
		buyOrdersCancelled[_orderId] = true;	
		emit CancelledBuyOrderEvent(buyOrder);
	}	// cancelBuyOrder

	/// @notice cancelSellOrder
	/// @notice cancel a sell order
	/// @dev this contract keeps the IDs for the sell orders separates from buy orders
	/// @dev Emits CancelledSellOrderEvent(SellOrderStruct)
	/// @param _orderId Order Id for the sell order to be cancelled
	function cancelSellOrder(uint256 _orderId) public onlyOwner {
		SellOrderStruct storage sellOrder = sellOrders[_orderId];
		require(sellOrder.orderId == _orderId, "The order doesn't exist."); // check if the order actually exists
		// in reality we should check if the order cancellation is being requested by the same user 
		// who originally created it
		// match msg.sender with the address on the order obejct itself
		// we don't store an address right now, for thie MVP/POC.
		//
		sellOrdersCancelled[_orderId] = true;	
		emit CancelledSellOrderEvent(sellOrder);
	}	// cancelSellOrder

	/// @notice mint PRLZ tokens
	/// @notice Use this when onboarding the Loyalty Liability from a Loyalty Issuer 
	/// @notice Or when increasing an existing liability commitment from already onboard Loyalty Issuer
	/// @dev This contract will not provide an option to decrease the Staked Loyalty Liability once committed
	/// @param _stakedLoyaltyLiability is the Loyalty liability that a Loyalty Issuer is bringing to PearlZZ
	/// @param _totalPtsPromised is the total number of loyalty points that an issuer has promised to its customers
	/// @return minted boolean (true or false)
  function mint(uint256 _stakedLoyaltyLiability, uint256 _totalPtsPromised) public onlyOwner returns(bool minted) {
		minted = pearlzzToken.mint(_stakedLoyaltyLiability, _totalPtsPromised);
		return(minted);
	} // mint()

	/// @notice getAccounts
	/// @return list of account addresses
	function getAccounts() public view onlyOwner returns(address[] memory) {
		return(accounts);
	}

	/// @notice getPearlZZToken
	/// @return PearlZZToken contract object
	function getPearlZZToken() public view onlyOwner returns(PearlZZToken) {
		return(pearlzzToken);
	}

	/// @notice pearlzzTokenName
	/// @return PearlZZ token name as a string
	function pearlzzTokenName() public view returns(string memory) {
		return(pearlzzToken.name());	
	}

	/// @notice pearlzzTokenSymbol
	/// @return PearlZZ token symbol name as a string
	function pearlzzTokenSymbol() public view returns(string memory) {
		return(pearlzzToken.symbol());	
	}

	/// @notice pearlzzTokenDecimals
	/// @return PearlZZ token decimals
	function pearlzzTokenDecimals() public view returns(uint256) {
		return(pearlzzToken.decimals());	
	}

	/// @notice pearlzzTokenTotalSupply
	/// @return PearlZZ token total supply
	function pearlzzTokenTotalSupply() public view returns(uint256) {
		return(pearlzzToken.totalSupply());	
	}

	/// @notice pearlzzTokenTotalPtsPromised
	/// @return PearlZZ token total points promised across all loyalty issuers onboarded
	function pearlzzTokenTotalPtsPromised() public view returns(uint256) {
		return(pearlzzToken.totalPtsPromised());	
	}
} // PearlZZExchange

