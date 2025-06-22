// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MakeTheIndustryNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    string private baseTokenURI;

    constructor(string memory baseURI) ERC721("MakeTheIndustry", "MTINFT") {
        baseTokenURI = baseURI;
    }

    function mint(address recipient) external onlyOwner {
        _tokenIdCounter++;
        _safeMint(recipient, _tokenIdCounter);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }
}
