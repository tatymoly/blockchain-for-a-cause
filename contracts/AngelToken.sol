// TestToken.sol
pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract AngelToken is StandardToken {
    string public constant name = "AngelToken";
    string public constant symbol = "ANG";
    uint8 public constant decimals = 2;
    uint public INITIAL_SUPPLY = 12000;

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

    function getBalance(address account) public view returns (uint256 totalAmount) {
        return balances[account];
    }

    function sendCoin(address receiver, uint amount) public returns (bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Transfer(msg.sender, receiver, amount);
        return true;
    }
}