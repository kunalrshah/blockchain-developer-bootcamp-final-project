// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
 
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
