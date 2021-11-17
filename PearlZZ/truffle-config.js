require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKeys = process.env.PRIVATE_KEYS || ""

/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// const HDWalletProvider = require('@truffle/hdwallet-provider');
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    //
		// host: "172.21.176.1",  
		// ----- This is for Kunal's local Ganache instance - connecting from Ubuntu to Windows based Ganache 
		// -----	via - vEthernet (WSL)
		//		port: 7545,            // Standard Ethereum port (default: none)
	development: {
		host: "127.0.0.1",     // Localhost (default: none)
		port: 8545,            // Standard Ganache CLI port
		network_id: "*",       // Any network (default: none)
 	},
  kovan: {
  	provider: function() {
    	return new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys
          `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
      	)
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42
  },
    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websocket: true        // Enable EventEmitter interface for web3 (default: false)
    // },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    // ropsten: {
    // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
    // network_id: 3,       // Ropsten's id
    // gas: 5500000,        // Ropsten has a lower block limit than mainnet
    // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  }, // networks definitions ends here

//  // define the contract directory and contracts build directory here
//  // to align with the "src" directory structure for the React Web App
//  // we are going to move the "contracts" directory and the "abis" directory under "src"
//  // 
	contracts_directory: './src/contracts/',
	contracts_build_directory: './src/abis/',

  // Configure your compilers
  // av common man u need to find ur compiler
  compilers: {
    solc: {
       version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
         enabled: false,
          runs: 200
        },
        evmVersion: "byzantium"
       }
    }
  },
	plugins: [
		"truffle-plugin-debugger"
	]	
  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};


/*
Ketan Accounts

(0) 0xC908afFAE9950ff222EC83f85168c67262a210D6 (100 ETH)
(1) 0xf4FA9Eee6b721A50f981527369E5DE0Cd45B7cf0 (100 ETH)
(2) 0x9F585CF8d2fB1F46d879D684686a06617Edea63c (100 ETH)
(3) 0xFD1cDcf7a3626885dfe43E293661Add9D57516cb (100 ETH)
(4) 0x2f845F322067A1f0b8CEE616f1f5d0F6F5B8268b (100 ETH)
(5) 0x8c51407388683f8326b0Dc7b4922478a7F4F9095 (100 ETH)
(6) 0x7FEd3Ee2BA28236D6b82Ec7013bD8D0f174935D8 (100 ETH)
(7) 0x62e5b46BD6d3E0B3aDA04F3120140805AC15c2CD (100 ETH)
(8) 0x5B46eB97D574009c0D533be7eC9473e1fc67A621 (100 ETH)
(9) 0xd8a293aE708968C0F770d02B272BB9b8Ce934F62 (100 ETH)

Private Keys
==================
(0) 0x6a3dceb0dd55bcd11e50818bbb11dd426107d001d3087205ee23ca1b3cd84fb7
(1) 0x14c8e1e21557573b6f13a68c293fdb82b91aefa5e0d73a016da8a64bd90218d7
(2) 0x250207a1916d991513ae40cf1552e25938da525a9591dd81ee3ce10f92434c0c
(3) 0xf484c7303fffa1b2420c196dc1e66e75c6c7edfbd9154198322cd3920b99dba5
(4) 0x41b71aeb41cc32942a3e90a0e9852046f97b1ae416171a44b4ee6943710213e5
(5) 0x7b3004d7bdfd7c8095214bcb43858635f8bbf506863b7a734b1518ce3e67463d
(6) 0xe07657e9857f99f215f41ca324e2c1e1b742d5fd3805f2dd7341a2175cc95eb5
(7) 0x6c5a97d965214ba8dc39bea0820f80ebd48990f6eed2363de9789783e247be34
(8) 0xd697df7260dc891a04f4752133dc05832c8790df84a35de6ab9e443274570e6f
(9) 0x5ca774780b5ae93906bac1e6edd157e09de5f78e0184a043f3a406686acf5720





*/
