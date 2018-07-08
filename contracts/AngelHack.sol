pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract AngelHack is MintableToken {
    function () external payable {}
    string public name = "AngelHack Token";
    string public symbol = "AHT";
    uint8 public decimals = 18;
}