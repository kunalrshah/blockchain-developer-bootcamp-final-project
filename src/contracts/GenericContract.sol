// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;
 
/// @title GenericContract
/// @author Kunal R. Shah
/// @notice This contract is not meant to have any implementation
/// @notice It is simply a contract to list out all common events and any other useful variables for all contracts
/// @dev originally was created to provide the onlyOwner modifier implementation to inherit from
/// @dev since the contracts were switched to Open Zeppelin Ownable, custom onlyOwner is no longer required
contract GenericContract {

	event UintValue(uint256 uintValue);
	event StrValue(string stringValue);
	event AddressValue(address addressValue);

//
// Commenting out the code below, as now I'm using OpenZeppelin Ownable.sol
//
//
//  // Variables
//	address private owner;
//
//	constructor() {
//		owner = msg.sender;
//  } // constructor
//
//	modifier onlyOwner() {
//        require(msg.sender == owner, "You're not the owner of the contract");
//        _;
//	}

}
