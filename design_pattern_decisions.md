Design Pattern Decisions:

// 1. Inter-Contract Execution (Calling functions in external contracts) 
----- My project has two main contracts - PearlZZExchange (which is really the main contract), which embeds within it an instance of a PearlZZToken contract
----- There is that inter-contract execution - calling the "mint()" function on PearlZZExchange, results into an underlying call to the "mint()" function of the PearlZZToken contract

// 2. Inheritance and Interfaces (Importing and extending contracts and/or using contract interfaces) 
----- 2.1 PearlZZExchange and PearlZZToken contracts both inherit from GenericContract and also the Ownable contract from Open Zeppelin
----- 2.2 Originally GenericContract was created for the custom implementation of the onlyOwner modifier, to be used across any other smart contract that inherited from GenericContract
----- 2.3 But once I switched to using the Open Zeppelin Ownable contract, the custom onlyOwner implementation was removed (commented out)
----- 2.4 The GenericContract is still used, and is now mainly used to list common set of events that can be used as a means of fetching values of uint, string, and address data types.
---------2.4.1 this comes in handy in the absence of the console.log capability in solidity. So, kind of like a creative work-around for that.


// 3. Access Control Design Patterns (Restricting access to certain functions using things like Ownable, Role-based Control)
----- 3.1 Open Zeppelin Ownable is used for this project


