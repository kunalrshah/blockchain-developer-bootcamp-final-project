Project Name: PearlZZ.ai
1. PearlZZ.ai B2B Loyalty Alliances Marketplace
2. PearlZZ.ai Wallet and PearlZZ.ai Exchange
3. Minting Loyalty Rewards Coupons (earned at certain Loyaltypoint thresholds) as PearlZZ.ai NFTs

Solidity Smart Contract source files, method signatures, and events emitted:
=============================================================================

1.	GenericContract.sol - is an abstract contract, no implementation - only common event definitions (mainly in place of logging), and modifier definitions
		1.1. 	onlyOwner -- purposely not using Ownable (but given that we are writing several modifiers for the Supply Chain exercise, 
		1.2 	may revert this to use the OpenZepplin Ownable.sol instead
		1.3		in which case this contract may just have a common set of events - mainly for logging debug values for uint, string, address types	


2.	PearlZZExchange.sol - is the main Loyalty Points (Trading) Exchange - that inherits "GenericContract"
		The method signatures for this contract are:

		2.1 buyPoints(string memory addToIssuer, string memory addToAccount, string memory addToUser, uint256 numOfPoints) public onlyOwner returns(uint256)
				2.1.1 Emits an event "BuyOrderEvent(BuyOrderStruct)" 

		2.2 fulfillABuyOrder(uint256 buyOrderId, string memory takeFromIssuer, string memory takeFromAccount, string memory takeFromUser) public onlyOwner returns(uint, uint)
				2.2.1 Emits an event FulfilledBuyOrderEvent(uint buyOrderId, uint sellOrderId, uint fulfilledTimestamp)

		2.3 sellPoints(string memory takeFromIssuer, string memory takeFromAccount, string memory takeFromUser, uint numOfPoints) public  onlyOwner returns(uint)
				2.3.1 Emits an event SellOrderEvent(SellOrderStruct)"

		2.4 fulfillASellOrder(uint sellOrderId, string memory addToIssuer, string memory addToAccount, string memory addToUser) public  onlyOwner returns(uint, uint)
				2.4.1 FulfilledSellOrderEvent(uint sellOrderId, uint buyOrderId, uint fulfilledTimestamp)

		2.5 cancelBuyOrder(uint orderId) public onlyOwner
				2.5.1 Emits an event CanclledBuyOrderEvent(uint orderId, uint timestamp)

		2.6 cancelSellOrder(uint orderId) public onlyOwner
				2.6.1 Emits an event CancelledSellOrderEvent(uint orderId, uint timestamp)

		2.7 transferPoints(
						string memory addToIssuer, string memory addToAccount, 
						string memory takeFromIssuer, string memory takeFromAccount, 
						string memory addToUser, string memory takeFromUser, 
						uint numOfPoints) 
					public onlyOwner returns(uint, uint)

				2.7.1 Emits an event TansferOrderEvent(uint buyOrderId, uint sellOrderId, uint timestamp)

		2.8 mint(
						uint256 _stakedLoyaltyLiability, 
						uint256 _totalPtsPromised) 
					public onlyOwner returns(bool minted)


3. 	PearlZZToken.sol - is for minting the PRLZ token
	 	The method signatures for this contract are:

		3.1 mint(uint stakedLoyaltyLiability, uint totalPointsPromised) public onlyOwner returns(bool)


