// TestToken.sol
pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract AngelToken is StandardToken {
    string public constant name = "AngelToken";
    string public constant symbol = "ANG";
    uint8 public constant decimals = 18;
    uint public INITIAL_SUPPLY = 12000;

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }
}