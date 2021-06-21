//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.5;

contract Adoption {
    address[16] public adopters;
    address payable private owner;
    
    constructor(){
        owner = msg.sender;
    }
    
    modifier onlyOwner(){
        require(msg.sender==owner);
        _;
    }

    modifier onlyBuyer(){
        require(msg.sender!=owner);
        _;
    }

    function buy(uint256 petId) public payable onlyBuyer returns (uint256) {  
        require(petId >= 0 && petId <= 15);
        adopters[petId] = msg.sender;
        return petId;
    }

    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }
    
    function getContractBalance() public view returns (uint){
        return address(this).balance;
    }
    
    function withdrawal()public onlyOwner {
        owner.transfer(address(this).balance);
    }
    
    function getOwnerBalance() public view returns (uint){
        return owner.balance;
    }
}
