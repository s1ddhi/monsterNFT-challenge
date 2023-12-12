// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MonsterNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    event NFTMinted(uint256 tokenId);

    constructor() ERC721("Monster NFT", "MNST") Ownable(msg.sender) {
    }

    function _baseURI () internal pure override returns (string memory) {
        return "https://mynftorganisation.com/api/token/";
    }

    function safeMint(address to, string memory tokenURIString) public onlyOwner() {
        _tokenIdCounter += 1;
        _safeMint(to, _tokenIdCounter);
        _setTokenURI(_tokenIdCounter, tokenURIString);

        emit NFTMinted(_tokenIdCounter);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
