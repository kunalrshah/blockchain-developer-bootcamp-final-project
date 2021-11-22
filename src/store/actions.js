// WEB3
export function web3Loaded(connection) {
  return {
    type: 'WEB3_LOADED',
    connection
  }
}

export function web3AccountLoaded(account) {
  return {
    type: 'WEB3_ACCOUNT_LOADED',
    account
  }
}

// TOKEN
export function pearlzzTokenLoaded(contract) {
  return {
    type: 'PEARLZZ_TOKEN_LOADED',
    contract
  }
}

// EXCHANGE
export function pearlzzExchangeLoaded(contract) {
  return {
    type: 'PEARLZZ_EXCHANGE_LOADED',
    contract
  }
}

export function addingLoyaltyIssuer() {
	return {
		type: 'ADDING_LOYALTY_ISSUER'
	}
}

export function loyaltyIssuerAdded(issuerName) {
	return {
		type: 'LOYALTY_ISSUER_ADDED',
		issuerName
	}
}

export function addingLoyaltyAccountToWallet() {
	return {
		type: 'ADDING_LOYALTY_ACCOUNT'
	}
}

export function addedAccountToWallet(cryptoAddress) {
	return {
		type: 'ADDED_ACCOUNT_TO_WALLET',
		cryptoAddress
	}
}


/* LOGIN */

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const doLogin = () => {
  return {
    type: "LOGIN",
  };
};

export const addIssuer = (data) => {
  return {
    type: "ADD_ISSUER", payload: data
  };
};

export const removeIssuer = () => {
  return {
    type: "REMOVE_ISSUER",
  };
};

export const addAccount = (data) => {
  return {
    type: "ADD_ACCOUNT", payload: data
  };
};

export const removeAccount = () => {
  return {
    type: "REMOVE_ACCOUNT",
  };
};

export const doBuy = (data) => {
  return {
    type: "BUY", payload: data
  };
};

export const doSell = (data) => {
  return {
    type: "SELL", payload: data
  };
};

export const addBuy = (data) => {
  return {
    type: "ADD_BUY", payload: data
  };
};

export const cancelBuy = (data) => {
  return {
    type: "CANCEL_BUY", payload: data
  };
};

export const addSell = (data) => {
  return {
    type: "ADD_SELL", payload: data
  };
};

export const cancelSell = (data) => {
  return {
    type: "CANCEL_SELL", payload: data
  };
};