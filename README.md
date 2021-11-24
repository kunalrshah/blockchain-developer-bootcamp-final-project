kunalrshah - Final project - PearlZZ Unified Loyalty Wallet and Peer-to-Peer Points Exchange

MVP Scope for the Project:
-- a B2B Loyalty Alliances Marketplace
-- a Unified Loyalty Wallet +
-- a loyalty points exchange (points trading marketplace)

## Deployed version url:

https://pearlzz.herokuapp.com

## How to run this project locally:

### Prerequisites

- Node.js >= v14.18.1
- Truffle and Ganache
- npm
- clone the repository from "https://github.com/kunalrshah/blockchain-developer-bootcamp-final-project"

### Deployment of Contracts

- Run `npm install` in project root to install all relevant dependencies
- Run Ganache local blockchain on port `8545` 
- `truffle migrate --network development`
- `truffle test --network development`

### Frontend

- `npm run dev`
- Opens `http://localhost:3000` automatically on your browser

### How to seed the PearlZZExchange with Loyalty Issuers & their Loyalty Liabilities; as well as add multiple test user accounts and their respective Loyalty Membership accounts & points

- `truffle migrate --network development`
- `truffle console --network development`
- `truffle exec scripts/seed-pearlzz-exchange-issuers.js`
- `truffle exec scripts/seed-pearlzz-exchange-loyalty-accounts-n-points.js`
- `truffle exec scripts/seed-pearlzz-exchange-buy-n-sell-oders.js`

## Screencast link

TBD - Youtube link most likely

## Public Ethereum wallet for certification:

`0x8BE4cB72302C02e5BDd20c95F3E94048d078086F`

## Project description

# 1. PearlZZ B2B Loyalty Alliances Marketplace
- (1.1) Onboard a loyalty issuer brand or a business onto PearlZZ allowing them to stake their Loyalty Liability Amount (LLA) from their balancesheet onto PearlZZ
- (1.2) Each time a new issuer brand/business is onboarded, or each time they stake more Loyalty Liability Amount, PearlZZ will "mint" PRLZ tokens adding to its totalSupply
- (1.3) For the purposes of this final project, we've assumed an alliance of five issuers for our prototype solution - this may change based on the success/failure of the batch seeding of test data

# 2. PearlZZ Wallet and PearlZZ Exchange

# - (2.1) PearlZZ Wallet
- (2.1.1) Allow individual users of PearlZZ to add/maintain their Loyalty Accounts to the PearlZZ Wallet
- (2.1.2) This project is using the 10 starter accounts that come with Ganache to seed in some Loyalty Accounts per address (signifying a different user per address) 
- (2.1.3) This project is also seeding in some "Buy Points" and "Sell Points" orders on the behalf of some of the addresses
- (2.1.4) The intention is to keep the 10 Ganache addresses configurable for the person testing from Consensys perspective to put in their own 10 addresses

# (2.2) PearlZZ Exchange - PRLZ Token as a translation mechanism for the peer-to-peer exchange (trading) of Loyalty Points earned:
- The PearlZZ cryptocurrency (PRLZ) is the "fungible (value translation) medium" by which to enable the exchange of loyalty points 
- across a consumer's different loyalty accounts 
- or across different consumer's individual loyalty accounts
- But, PRLZ is purposely not designed as a true ERC20 token, is not meant to be traded as an ERC20 token
- (2.2.1) Allow individual users to place "buy points" orders, to add to a specific loyalty account in their wallet 
- (2.2.2) Allow individual users to place "sell points" orders, to sell from a specific Loyalty account from their wallet
- (2.2.3) Allow individual users to fulfill another user's orders, 
- (2.2.4) sell points to fulfill someone's buy order, if they choose to
- (2.2.5) buy points to fulfill someone's sell order, if they choose to
- (2.2.6) Allow individual users to transfer points from one of their own loyalty accounts to another one of their own loyalty accounts 


## What and How to use the PearlZZ DApp
1. A user to place either a "Buy" or "Sell" points order of their own, adding it to the OrderBook
2. A user to fulfill either a buy or sell order previously placed on the PearlZZExchange OrderBook by another user
3. A user to cancel either a buy order or a sell order, previously placed by the same user
4. A user adding a new Loyalty Account to their Wallet
5. A PearlZZ project admin adding or onboarding a new Loyalty Issuer brand/business

## Directory structure
# src/
- contracts - All Solidity Smart Contract source code is here
- abis - All abis generated from the compile step for the solidity code is here
- store - All front-end functionality related to interactions, selectors, reducers, actions, etc. is here
- components - All React UI front-end components are here
- assets - All static files and images are here
# migrations 
- truffle migrations scripts are here
# test
- All truffle test scripts are here
# scripts
- Test data seeding scripts are here
# node_modules
- all modules listed on the package.json file are installed under this directory



## Environment variables (not needed for running project locally)
- Provide "PRIVATE_KEYS" environment variable, which is supposed to be a comma-separated list of private keys associated with ethereum account addresses, but omit the "0x" at the beginning of each private key
- Also provide "INFURA_API_KEY" environment variable with your specific API KEY for Infura gateway

```
PRIVATE_KEYS="<provide comma-separated list of private keys corresponding to as many ethereum account addresses as you wish to use>"
INFURA_API_KEY="<include your Infura API Key Here"
```

## TODO features
- B2B Loyalty Alliances Marketplace
- Loyalty Rewards as NFT Coupons after reaching a certain points threshold
- Metrics on Loyalty Liability breakage and margin capital per Loyalty Issuer as a measure of "benefits derived from staking their "Loyalty Liability Amount" to mint PRLZ tokens
