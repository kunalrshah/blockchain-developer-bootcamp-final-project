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
  networks: {
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
		rinkeby: {
	    provider: function() { 
	    	return new HDWalletProvider(
	          privateKeys.split(','), // Array of account private keys
	          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
	      	)
	      },
	      gas: 4500000,
	      gasPrice: 10000000000,
	      network_id: 4
	  }, 
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

