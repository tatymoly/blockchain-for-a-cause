pragma solidity ^0.4.18;

import './AngelHack.sol';
import 'zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';


contract AngelHackCrowdsale is TimedCrowdsale, MintedCrowdsale {
    // function () external payable {}
    function deposit() external payable {
        // deposits[msg.sender] += msg.value;
    } 
    function AngelHackCrowdsale
    (
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _rate,
        address _wallet,
        MintableToken _token
    )
    public
    Crowdsale(_rate, _wallet, _token)
    TimedCrowdsale(_openingTime, _closingTime) {
    }
}