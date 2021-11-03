# blockchain-developer-bootcamp-final-project
Kunal's final project for the Blockchain Developer Bootcamp

Project Title / Name: PearlZZ.ai
Token Symbol: PRLZ (The main purpose for PRLZ is to act as a translation mechanism across disparate loyalty programs and their points)


MVP Scope for the Project:
-- a B2B Loyalty Alliances Marketplace
-- a Unified Loyalty Wallet +
-- a loyalty points exchange (points trading marketplace)
-- mint NFTs for loyalty rewards earned as a stretch goal or scope
-- build an Loyalty Coupon NFT Exchange (stretch goal)

Key Themes:
-- Retroactive Public Goods
-- Loyalty Alliances across cohesive set of businesses - with local community, town or city, state, province or state, country, continent, internaltional scope
-- Inherently Loyalty Points / Rewards are retroactive based on a consumer's purchasing activity
-- Use collective Loyalty Points Liability that brands & businesses carry on their balance sheet 
------ as the basis for minting PRLZ token on PearlZZ Platform
-- Build inherent value for consumers by consolidating their loyalty accounts in one place
-- and by providing them with a peer-to-peer exchange of points & rewards so that they don't get unused

Create value for the Loyalty Issuers by providing a fractional share of 
-- the peer-to-peer buy/sell of points/rewards by consumers
-- expand their marketing reach
-- earn scaling factor commissions on transfer outs
-- earn new business / bring new customers (or future leads) from transfer ins

Some of the things to consider going forward are: (an example of an issuer directly sending points/rewards updates to PearlZZ)
--- what identification should we use? 
--- Until we've to co-exist in a crypto and non-crypto world this would've to be an opt-in option for consumers 
--- to explicitly allow sharing of information about their crypto addresses to/by the loyalty issuer to the PearlZZ platform

(a) Loyalty Issuer would've collected their member's Crypto (MetaMask) Addresses (after an explicity opt-in protocol)
(b) Each Loyalty Issuer would have their own Crypto (MetaMask) Address
(c) They will update their member's PearlZZ accounts daily with points / rewards activities
(d) Offchain data feed from Loyalty Management Systems from the brands / merchants, that needs to be processed by PearlZZ
(e) this project will mimick the feed by batchmode injection of points/rewards
(f) PearlZZ user's would use their crypto address to authenticate on PearlZZ using MetaMask (or other social accounts as appropriate for a given user).



1. PearlZZ B2B Loyalty Alliances Marketplace

(1.1) Onboard a brand or a business onto PearlZZ allowing them to stake their Loyalty Liability Amount (LLA) from their balancesheet on PearlZZ
(1.2) This is how PearlZZ would enable "staking" of PRLZ tokens
--------each time a new brand/business is onboarded, or each time they stake more Loyalty Liability Amount
--------call "mint()" function on PearlZZExchange everytime we add an issuer
(1.3) B2B Loyalty Alliance Marketplace
(1.3.1) PearlZZ could either onboard a single loyalty issuer at a time, or better value proposition is to onboard an existing alliance or a new alliance of multiple loyalty issuers (like a cohort) together onto PearlZZ
(1.3.2) With agreements for sharing consumer/customer behavioral data with everyone, not just with the  most powerful brand/business
(1.3.3) thereby eliminating any form of centralization / intermediation even from a loyalty alliance perspective.
(1.3.4) thus allowing each  member within an alliance, complete access to customer data and other relevant data - and enable a more preicse 1:1 personalization and targeted digital marketing 
(1.3.5) We've assumed an alliance of five issuers for our prototype solution and the demo for the EthGlobal Hackathon (September 17th - Oct 15th 2021)


2. PearlZZ Wallet and PearlZZ Exchange

(2.1) PearlZZ Wallet
(2.1.1) Allow individual users of PearlZZ to add/maintain their Loyalty Accounts to the PearlZZ Wallet
selecting from the available brands or businesses as Loyalty Issuers participating on PearlZZ
(2.1.2) Based on an opt-in mechanism for the individual users (consumers), provide different automated methods to keep their loyalty points and rewards current. 
(2.1.2.1) This can only be done by the loyalty issuers providing data to PearlZZ in some shapre or form (push or a pull). 
(2.1.2.2) Or, some other clever approaches of reading from a consumer's text or email loyalty statement updates and ingesting data from there. 
(2.1.2.3) This whole subject of 2.1.2 of syncing up loyalty points on consumer's accounts is out of scope for the EthGlobal hackathon proof-of-concept.


(2.2) PearlZZ Exchange  Key MVP functionality for the exchange:
---- enable each cosumer to maximize the value of their Loyalty accounts
---- we are NOT building a capability for consumers to be able to take their points, convert to PRLZ, and then freely trade them as ERC20 tokens
---- we may restrict that capability for the Loyalty Issuers themselves (allow them to trade PRLZ as an ERC20 token) 

----The PearlZZ cryptocurrency (PRLZ) 
--------is the "fungible (value translation) medium" by which to enable the exchange of points across a consumer's different loyalty accounts or across different consumer's individual loyalty accounts
--------The associated tokenomics needs to be coded 
--------Every "points transfer" transaction will be treated as a "redemption" from the point of view of the account/issuer, from where it is being transferred or sold
--------Thus allowing that loyalty issuer to reduce that much loyalty liability and thereby reducing their reserve capital requirements

(2.2.1) Allow individual users to place "buy points" orders, to add to a specific account in their wallet 
(2.2.2) Allow individual users to place "sell points" orders, to sell from a specific Loyalty account from their wallet
(2.2.3) Allow individual users to fulfill another user's orders, 
(2.2.4) sell points to fulfill someone's buy order, if they choose to
(2.2.5) buy points to fulfill someone's sell order, if they choose to
(2.2.6) Allow individual users to transfer points from one of their own accounts to another account in their own wallet
--------- For example, from their "Starbucks "My Bucks" program to their own "Marriott Bonvoy" account


3. Minting Loyalty Rewards Coupons (earned at certain Loyaltypoint thresholds) as PearlZZ NFTs
(3.1) Ability for Loyalty Issuers to send "Earned Rewards Coupons" as an NFT, 
		or an individual user to mint their "Rewards Coupon" received from a Loyalty Issuer to an NFT
(3.2) Ability for individual users to then be able to trade/exchange these NFTs, 
		so that the coupons do not go waste (or expire worthless)
(3.3) Therefore, as a stretch goal for the EthOnline Hackathon we may consider integrating or 
		simulating an NFT Exchange experience



