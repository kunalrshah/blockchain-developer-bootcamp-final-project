var GenericContract = artifacts.require("./GenericContract.sol")
var PearlZZExchange = artifacts.require("./PearlZZExchange.sol")

module.exports = async function (deployer, network, accounts){
//	accounts = await web3.eth.getAccounts()

	console.log(accounts, network);
	const userAccount = accounts[1];
	const issuerAccount = accounts[9]
	console.log("User and Issuer Accounts::::::---- ", userAccount, issuerAccount);

	await Promise.all([
		deployer.deploy(GenericContract),
		deployer.deploy(PearlZZExchange, accounts)
	]);

	instances = await Promise.all([
		GenericContract.deployed(),
		PearlZZExchange.deployed()
	]);


	prlzExchange = instances[1].contract;
//	console.log(prlzExchange);


	msgSender = accounts[0];


//	const issuerAddr3 = accounts[4];
//	const issuerAddr2 = accounts[5];
//	const issuerAddr1 = accounts[6];
//	console.log("Issuers: [", issuerAddr3, issuerAddr2, issuerAddr1, "].");
//
//	const usrAddr3 = accounts[7];
//	const usrAddr2 = accounts[8];
//	const usrAddr1 = accounts[9];
//	console.log("Users: [", usrAddr3, usrAddr2, usrAddr1, "].");
//
//	await prlzExchange.methods.addPearlZZUser(usrAddr1).send({ from: msgSender });
//	await prlzExchange.methods.getPearlzzUserByAddress(usrAddr1).call();
//
//	await prlzExchange.methods.addPearlZZUser(usrAddr2).send({ from: msgSender });
//	await prlzExchange.methods.getPearlzzUserByAddress(usrAddr2).call();
//
//	await prlzExchange.methods.addPearlZZUser(usrAddr3).send({ from: msgSender });
//	await prlzExchange.methods.getPearlzzUserByAddress(usrAddr3).call();
//
//	await prlzExchange.methods.addIssuer(issuerAddr1, "SBUCKS", "MBUCKS", 15000000, 888777, 35, 70, 2000, 85).send({ from: msgSender });
//	await prlzExchange.methods.getIssuerByProgramName("MBUCKS").call();
//
//	prlzExchange.methods.addIssuer(issuerAddr1, "UAL", "UMP", 211000000, 555555, 1000, 5, 25, 80).send({ from: msgSender });	
//	prlzExchange.methods.addIssuer(issuerAddr1, "TCP", "MPR", 2110000, 555555, 1000, 20, 100, 90).send({ from: msgSender});	
//
//	prlzExchange.methods.addAccountToUserWallet(usrAddr1, "TCP", "MPR", "MPR1234", 258).send({ from: msgSender });
//	prlzExchange.methods.addAccountToUserWallet(usrAddr1, "UAL", "UMP", "WN999888", 5435).send({ from: msgSender });
//
//	prlzExchange.methods.addAccountToUserWallet(usrAddr2, "TCP", "MPR", "MPR9999", 3441).send({ from: msgSender });
//	prlzExchange.methods.addAccountToUserWallet(usrAddr2, "SBUCKS", "MBUCKS", "SMB111111", 359).send({ from: msgSender });
//	prlzExchange.methods.addAccountToUserWallet(usrAddr3, "UAL", "UMP", "WN777777", 19589).send({ from: msgSender });
//
//	prlzExchange.methods.addAccountToUserWallet(usrAddr3, "TCP", "MPR", "MPR66666", 5488).send({ from: msgSender });
//	prlzExchange.methods.addAccountToUserWallet(usrAddr3, "SBUCKS", "MBUCKS", "SMB555555", 4876).send({ from: msgSender });
	
}

