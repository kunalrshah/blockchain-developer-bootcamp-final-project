// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity >=0.7.0 <0.9.0;

import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

import "./GenericContract.sol"; 

contract PearlZZToken is GenericContract, Ownable {
  using SafeMath for uint;

    // Variables
//	address private owner;
  string public name = "PearlZZ";
  string public symbol = "PRLZ";
  string public version = '1.0'; 
  uint256 public decimals = 18;
  uint256 public totalSupply = 0;
	uint256 public totalPtsPromised = 0;
  mapping(address => uint256) public balanceOf;


	//
	// PearlZZToken Constructor function
	// PearlZZToken will not have any "totalSupply" of tokens until we onboard a Loyalty Issuer 
	// (brand or business that offers loyalty programs & membership to its customers)
	// That is to say that we will mint new PRLZ tokens equivalent to the USD Loyalty Liability 
	// commitments promised/staked by the Loyalty Issuer
	// --- it seems the compiler doesn't really like the "public" visibility qualifier for 
	// the constructor. Not that it is an error. But, it does result in a warning saying that it is ignored.
	// removing "public" qualifier
	//
	// constructor() public { 
	//
	constructor() {
    name = "PearlZZ";
    symbol = "PRLZ";
		//
		// Initial PearlZZ supply from the constructor's point of view is going to Zero. 
		// We can change this later, if we feel it is necessary.
		// 
		// The only the way the token gets minted is when a Issuer is onboarded 
		// or when an existing Issuer is adding more of their Loyalty Liability
		//
		totalSupply = 0;
    balanceOf[msg.sender] = totalSupply; 

	} // constructor

	// call this "mint" function while on-boarding a Loyalty Issuer (brand or business) 
	// to record their USD Loyalty Liability commitments from their active Loyalty Program to PearlZZ
	// or you may also call this function when a Loyalty Issuer wants to increase their commitment
	//
	// there isn't an option that we intend to provide at this point to reduce the Loyalty Liability 
	// Commitments once staked/committed to PearlZZ
	//
	//
	function mint(uint256 _stakedLoyaltyLiability, uint256 _totalPtsPromised) public onlyOwner returns(bool) {

		totalSupply += _stakedLoyaltyLiability; // does this need to be converted to wei value
		totalPtsPromised += _totalPtsPromised;
		balanceOf[msg.sender] = totalSupply; 

//		balanceOf[msg.sender] = totalSupply * (10 ** decimals);

		return(true);
	} // function mint()


} // PearlZZToken

