Avoiding Common Attackes

// 1. SWC-103 - avoiding floating pragma, favoring a locked (specific) version of the solidity compiler
------- PearlZZ project uses "pragma solidity 0.8.0" specifically, as per the recommendations from SWC-103 - avoiding floating pragma, favoring a locked (specific) version of the solidity compiler
------- Also using a specific solc compiler version configuration in the "compilers" section on truffle-config.js

// 2. SWC-101 Integer Overflow and Underflow
------- PearlZZ project uses vetted safe math libraries for arithmetic operations consistently throughout all the smart contracts for the project. 

// 3. SWC-100 Function Default Visibility
------- PearlZZ project has made conscious decisions on which visibility type is appropriate for every function on the PearlZZExchange & PearlZZToken smart contract, 
-------	thereby dramatically reducing the attack surface. 


