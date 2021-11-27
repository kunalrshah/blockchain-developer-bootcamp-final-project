# kunalrshah - Final project - PearlZZ Peer-to-Peer Loyalty Points Exchange

## MVP Scope for the Project:
-- a loyalty points exchange (points trading marketplace)
-- a Unified Loyalty Wallet +
-- a B2B Loyalty Alliances Marketplace

## Deployed version url:

https://pearlzz.herokuapp.com

## How to run this project locally:

### Prerequisites

- npm
- Node.js >= v14.18.1
- Truffle 
- Ganache
- clone the repository from "https://github.com/kunalrshah/blockchain-developer-bootcamp-final-project"

### Deployment of Contracts

- Run `npm install` in project root to install all relevant dependencies
- Run local blockchain using Ganache-cli on port `8545` 
- `truffle migrate --network development`
- `truffle test --network development`
- You must also follow the instructions on the "Environment Variables" section of this README file, 
- to configure the test account private key and the Infura API key for connectivity to the test network (Kovan in this case)

### Testing the PearlZZ DApp - Consensys Blockchain Developer Bootcamp Final Project - by kunalrshah (@cryptoconan)
- Disclaimer: The core Smart Contract based functionality of loyalty points exchange (buying, selling, cancelling, fulfilling, transferring, etc.) is the core focus of this project
- The React front-end is functional, but does not support all such transactions fully, while it does meet all the requirements of the final project as per the bootcamp

## Accessing the front-end locally
### From the root directory of the project, execute `npm run dev`. This opens up `http://localhost:3000` automatically on your browser
## Accessing the front-end on the public URL: "https://pearlzz.herokuapp.com"

## The right sequence of steps to use the DApp for the purpose of testing it properly
### Step-1: go to the either "localhost:3000/issuer" or "https://pearlzz.herokuapp.com/issuer" 
- this seeds in the initial five "loyalty issuer" brands with their respective "Loyalty Liability Amounts" to be staked on PearlZZ
- This results in five Smart Contract transactions for "minting" new PRLZ tokens 
- This is equivalent to each of the brands' "Loyalty Liability Amount" they are staking on PearlZZ
- You should see five Loyalty Issuers listed on the page with their respective "Loyalty Liability Amounts" 
- and the corresponding "Liability Points Promised" amount
- These are transactions that would require metamask signing of transactions
- The "Marketcap" value displayed on the home page is retrieved from the "pearlzzTokenTotalSupply()" method from the PearlZZExchange smart contract on the blockchain 
- Which in turn calls the totalSupply() method on the member variable of type PearlZZToken (another smart contract embedded within the PearlZZExchange) 
### Step-2: Either click on "Go to Dashboard" from the Issuers page or go straight to either "localhost:3000" or "https://pearlzz.herokuapp.com"
- As soon as you go to this page, 
- the DApp is designed to seed in four test "Buy" orders and four test "Sell" orders on the "PearlZZ Exchange"
- This seeding of 4 buy orders and 4 sell orders would also require a metamask signing of transactions
- Please note the "Market Cap" value on the top left portion of the screen
- This is the total of "Loyalty Liability Amounts" across all the five "loyalty issuers" that were configured in the first step
- And, it is also the number of PRLZ tokens minted as a result on the PearlZZ Exchange
- Thereby making it the "Market Cap" of the PearlZZ Exchange in terms of the dollar value LLA staked
- which also corresponds to the cumulative number of points promised across all the issuers that were onboarded
### Step-3: Fulfilling Orders from the OrderBook on the left pane of the DApp
- The orders placed by any users are all shown on the "Order Book" 
- A user could fulfill an order - by selecting it from the Order Book
- Which opens up a new dialog box to place the "opposite" order of the order selected from the Order Book
- and submitting that "opposite" order as a fulfillment order 
- That is, for a "Buy Points Order" on the order book to be fulfilled - another user has to submit a corresponding "Sell Points Order"
- And, similarly for a "Sell Points Order" on the order book to be fulfilled - another user has to submit a corresponding "Buy Points Order"
- Currently, this project has only been tested with a single user (single Metamask address)
- But, this project doesn't end with the Bootcamp and I'll continue to build it further and continue to add more functionality
### Step-4: The token name and the token symbol captured dynamically from the blockchain, for the "PearlZZ (PRLZ) Exchange" heading above the Order Book
- so if you change the PearlZZToken constructor to put in a different Token Name, or a different Token Symbol
- The heading will change accordingly
- While this is not super important, it is another example of pulling values from the smart contract methods dynamically at runtime
### How to run the truffle tests, five tests should pass successfully
- `truffle test --network development`
## Screencast link
- **TBD - Youtube link most likely
## Public Ethereum wallet for certification:
`0x8BE4cB72302C02e5BDd20c95F3E94048d078086F`
# Project description
## 1. PearlZZ B2B Loyalty Alliances Marketplace
- (1.1) Onboard a loyalty issuer brand or a business onto PearlZZ allowing them to stake their Loyalty Liability Amount (LLA) from their balancesheet onto PearlZZ
- (1.2) Each time a new issuer brand/business is onboarded, or each time they stake more Loyalty Liability Amount, PearlZZ will "mint" PRLZ tokens adding to its totalSupply
- (1.3) For the purposes of this final project, we've assumed an alliance of five issuers for our prototype solution
- (1.4) These five issuers are seeded in when you visit either "localhost:3000/issuer" or "pearlzz.herokuapp.com/issuer"
## 2. PearlZZ Exchange
### (2.1) PearlZZ Exchange - PRLZ Token as a translation mechanism for the peer-to-peer exchange (trading) of Loyalty Points earned:
-
- The PearlZZ (PRLZ) token is the "fungible (value translation) medium" by which to enable the exchange of loyalty points 
- Either across a single consumer's different loyalty accounts 
- or across two different consumers' individual loyalty accounts
- But, PRLZ is purposely not designed as a true ERC20 token, is not meant to be traded as an ERC20 token
-
- (2.1.1) Allow individual users to place "buy points" orders, to add to a specific loyalty account in their wallet 
- (2.1.2) Allow individual users to place "sell points" orders, to sell from a specific Loyalty account from their wallet
- (2.1.3) Allow individual users to fulfill another user's orders, 
- (2.1.4) sell points to fulfill someone's buy order, if they choose to
- (2.1.5) buy points to fulfill someone's sell order, if they choose to
- (2.1.6) Allow individual users to transfer points from one of their own loyalty accounts to another one of their own loyalty accounts 
- (2.1.7) For the most part - for each new address you utilize, the behavior and sequence of test steps remain the same
- (2.1.8) same seeding of issuers and buy/sell orders is performed
### - (2.2) PearlZZ Wallet - the actual creation of Wallet and maintenance of accounts on the Wallet have been left out of this project for now
- (2.2.1) Allow individual users of PearlZZ to add/maintain their Loyalty Accounts to the PearlZZ Wallet
- (2.2.2) Currently, the React front-end shows some placeholder Wallet user interface, but the underlying "Member.sol" solidity code was taken out for simplification
- (2.2.3) Similary, the actual smart contract for managing the Loyalty Issuers and their Loyalty Liability Amount (LLA) was deemed to be managed off-chain
- (2.2.4) However, the simulation of when a loyalty issuer is added to PearlZZ off-chain component is incorporated on the front-end
- (2.2.5) And, it therefore results in real "minting" of PearlZZ tokens via the PearlZZExchange.min() method, which in turn calls the PearlZZToken.mint() method
# Directory structure
## src/
- contracts - All Solidity Smart Contract source code is here
- abis - All abis generated from the compile step for the solidity code is here
- store - All front-end functionality related to interactions, selectors, reducers, actions, etc. is here
- components - All React UI front-end components are here
- assets - All static files and images are here
## migrations 
- truffle migrations scripts are here
## test
- All truffle test scripts are here
## node_modules
- all modules listed on the package.json file are installed under this directory
## Environment variables (not needed for running project locally), only needed for running the project on a test network.
### Currently the PearlZZ Smart Contracts are only deployed on the Kovan Test Network
- Provide "PRIVATE_KEYS" environment variable, which is supposed to be a comma-separated list of private keys associated with ethereum account addresses, but omit the "0x" at the beginning of each private key
- Currently, the application only requires a single account; so defining a single private key for the PRIVATE_KEYS environment variable is fine by itself. 
- Also provide "INFURA_API_KEY" environment variable with your specific API KEY for Infura gateway

```
PRIVATE_KEYS="<provide comma-separated list of private keys corresponding to as many ethereum account addresses as you wish to use>"
INFURA_API_KEY="<include your Infura API Key Here>"
```

## Work to be continued on the project
- B2B Loyalty Alliances Marketplace - complete functionality to create a new Alliance, add new loyalty issuer members to the alliance
- PearlZZ Wallet management - registration & signup process, adding loyalty accounts to the wallet, searching for loyalty issuers, etc.
- Loyalty Rewards (based on points thresholds) as NFT Coupons & exchange of these NFT coupons 
- Metrics on the benefits derived by the loyalty issuers from staking their "Loyalty Liability Amount" on PearlZZ
- That is, what has PearlZZ done for their business lately :-)
