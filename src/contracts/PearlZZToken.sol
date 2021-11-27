// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
// pragma solidity >=0.7.0 <0.9.0;
pragma solidity 0.8.0;

import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

import "./GenericContract.sol"; 

/// @title PRLZ Token Contract 
/// @author Kunal R. Shah
/// @notice The totalSupply for this contract will start out at zero
/// @notice When a Loyalty Issuer stakes their loyalty liability on PearlZZ.ai, that's when tokens will be minted
contract PearlZZToken is GenericContract, Ownable {
  using SafeMath for uint;

  // Variables

	/// @notice name represents the name of the PearlZZ Token
  string public name = "";

	/// @notice symbol is the symbol of the PearlZZ Token (PRLZ)
  string public symbol = "";

	/// @notice version
  string public version = '1.0'; 

	/// @notice decimals represents the number of decimals for the token
  uint256 public decimals = 18;

	/// @notice totalSupply represent the total supply of tokens
	/// @notice this totalSupply of PearlZZToken increases with each new Loyalty Issuer onboarded to PearlZZ
  uint256 public totalSupply = 0;

	/// @notice totalPtsPromised is meant to represent the collective number of loyalty points taked by loyalty issuers 
	uint256 public totalPtsPromised = 0;

// balanceOf variable isn't currently being used. 
// But, it could be used to keep an account of the loyalty liability amount staked by each loyalty issuer
// Given that this contract does't use Loyalty Issuer crypto addresses yet
// -- it needs at least an issuer name to keep track of loyality liability amounts per issuer
// -- double check if this is already being tracked in PearlZZExchaneg contract first
// mapping(address => uint256) public balanceOf;


	/// @notice PearlZZToken Constructor
	/// @notice Tokens will only be minted when a loyalty issuer stakes some of its loyalty liability to PearlZZ
	/// @dev Each token will be an equivalent of 1 USD
	constructor() {
    name = "PearlZZ";
    symbol = "PRLZ";
		//
		// Initial PearlZZ supply from the constructor's point of view is going to be Zero. 
		// We can change this later, if we feel it is necessary.
		// 
		// The only the way the token gets minted is when a Issuer is onboarded 
		// or when an existing Issuer is adding more of their Loyalty Liability
		//
		totalSupply = 0;
//    balanceOf[msg.sender] = totalSupply; 

	} // constructor

	/// @notice Use this when onboarding the Loyalty Liability from a Loyalty Issuer 
	/// @notice Or when increasing an existing liability commitment from already onboard Loyalty Issuer
	/// @dev This contract will not provide an option to decrease the Staked Loyalty Liability once committed
	/// @param _stakedLoyaltyLiability is the Loyalty liability that a Loyalty Issuer is bringing to PearlZZ
	/// @param _totalPtsPromised is the total number of loyalty points that an issuer has promised to its customers
	/// @return minted boolean (true or false)
	function mint(uint256 _stakedLoyaltyLiability, uint256 _totalPtsPromised) public onlyOwner returns(bool minted) {

		minted = false;
		totalSupply += _stakedLoyaltyLiability; // does this need to be converted to wei value
		totalPtsPromised += _totalPtsPromised;
//		balanceOf[msg.sender] = totalSupply * (10 ** decimals);

		minted = true;
		return(minted);
	} // function mint()

} // PearlZZToken

