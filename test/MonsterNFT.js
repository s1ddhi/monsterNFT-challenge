const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

const NFTMintedItem = {
    name: "Monster NFT",
    symbol: "MNST",
    id: 1,
    tokenURIString: "4391b700c0a752cc513435bdc7f7035a31e919e5f864f19d1f01bea962eca9a2"
};
const baseURI = "https://mynftorganisation.com/api/token/";

describe("MonsterNFT", () => {
    async function deployMonsterNFTFixture() {
        const [owner, addr1] = await ethers.getSigners();
        const nft = await ethers.deployContract("MonsterNFT");
        await nft.waitForDeployment();
        return {nft, owner, addr1};
    }

    describe("Deploy", () => {
        it("Should be named Monster NFT", async () => {
            const { nft } = await loadFixture(deployMonsterNFTFixture);
            expect(await nft.name()).to.equal(NFTMintedItem.name);
        });

        it("Should have the symbol MNST", async () => {
            const { nft } = await loadFixture(deployMonsterNFTFixture);
            expect(await nft.symbol()).to.equal(NFTMintedItem.symbol);
        });
    })

    describe("Minting", () => {
        it("Should mint a new NFT to owner", async () => {
            const { nft, owner } = await loadFixture(deployMonsterNFTFixture);
            await nft.safeMint(owner.address, NFTMintedItem.tokenURIString);
            expect(await nft.balanceOf(owner.address)).to.equal(1);
        });

        it("Only owner can mint", async () => {
            const { nft, owner, addr1 } = await loadFixture(deployMonsterNFTFixture);
            await expect(nft.connect(owner).safeMint(owner.address, NFTMintedItem.tokenURIString)).to.not.be.reverted;
            await expect(nft.connect(addr1).safeMint(owner.address, NFTMintedItem.tokenURIString)).to.be.reverted;
        });

        it("Should mint a new NFT to owner with tokenURI", async () => {
            const { nft, owner } = await loadFixture(deployMonsterNFTFixture);
            await expect(nft.safeMint(owner.address, NFTMintedItem.tokenURIString)).to.emit(nft, "NFTMinted").withArgs(NFTMintedItem.id);
            expect(await nft.ownerOf(NFTMintedItem.id)).to.equal(owner.address);
            expect(await nft.balanceOf(owner.address)).to.equal(1);
        });

        it("Should mint a new NFT for another owner", async () => {
            const { nft, owner, addr1 } = await loadFixture(deployMonsterNFTFixture);
            await expect(nft.connect(owner).safeMint(addr1.address, NFTMintedItem.tokenURIString)).to.emit(nft, "NFTMinted").withArgs(NFTMintedItem.id);
            expect(await nft.ownerOf(NFTMintedItem.id)).to.equal(addr1.address);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);
        });

        it("Should mint a new NFT with tokenURI", async () => {
            const { nft, owner } = await loadFixture(deployMonsterNFTFixture);
            await expect(nft.safeMint(owner.address, NFTMintedItem.tokenURIString)).to.emit(nft, "NFTMinted").withArgs(NFTMintedItem.id);
            const tokenURI = await nft.tokenURI(NFTMintedItem.id);
            expect(tokenURI).to.equal(baseURI + NFTMintedItem.tokenURIString);
        });
    });
});