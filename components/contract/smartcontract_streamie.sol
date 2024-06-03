// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Donats {
    address public owner;
    AggregatorV3Interface internal priceFeed;

    struct Streamer {
        string username;
        uint256 balance;
        uint256 totalIncome;
    }
    
    mapping(address => Streamer) public streamers;
    mapping(string => address) private usernameToAddress;
    
    event StreamerRegistered(address indexed streamerAddress, string username);
    event DonationReceived(address indexed streamerAddress, address indexed donor, uint256 amount);
    event Withdrawal(address indexed streamerAddress, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can take this action");
        _;
    }
    
    constructor(address _priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }
    
    function registerStreamer(string memory _username) external {
        require(usernameToAddress[_username] == address(0), "Username already exist");
        Streamer storage newStreamer = streamers[msg.sender];
        newStreamer.username = _username;
        usernameToAddress[_username] = msg.sender;
        emit StreamerRegistered(msg.sender, _username);
    }
    
    function donate(string memory _username) external payable {
        address streamerAddress = usernameToAddress[_username];
        require(streamerAddress != address(0), "Streamer not found");
        require(msg.value > 0, "Donations should more than zero");
        
        Streamer storage streamer = streamers[streamerAddress];
        streamer.balance += msg.value;
        streamer.totalIncome += msg.value;
        
        emit DonationReceived(streamerAddress, msg.sender, msg.value);
    }
    
    function withdraw(uint256 _amount) external {
        Streamer storage streamer = streamers[msg.sender];
        require(_amount <= streamer.balance, "Balance is not enough");
        
        streamer.balance -= _amount;
        payable(msg.sender).transfer(_amount);
        
        emit Withdrawal(msg.sender, _amount);
    }
    
    function getBalance() external view returns (uint256) {
        return streamers[msg.sender].balance;
    }
    
    function getTotalIncome() external view returns (uint256) {
        return streamers[msg.sender].totalIncome;
    }
    
    function getStreamerUsername() external view returns (string memory) {
        return streamers[msg.sender].username;
    }

    function getPriceFeed() public view returns (int256) {
        (
            , 
            int256 price,
            ,
            ,
            
        ) = priceFeed.latestRoundData();
        return price;
    }
}
