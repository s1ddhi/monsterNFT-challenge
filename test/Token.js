const { expect } = require("chai");
const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Token", () => {
    async function deploy() {
        const [owner, addr1] = await ethers.getSigners();
        const token = await ethers.deployContract("MTK");
        await token.waitForDeployment();
        return { token, owner, addr1 };
    }
    describe("Deploy", () => {
        it("Should set the right owner", async () => {
            const { token, owner } = await deploy();
            expect(await token.owner()).to.equal(owner.address);
        });

        it("Should be named Monster Token", async () => {
            const { token } = await deploy();
            expect(await token.name()).to.equal("Monster Token");
        });

        it("Should have the symbol MTK", async () => {
            const { token } = await deploy();
            expect(await token.symbol()).to.equal("MTK");
        });

        it("Should have a total supply of 1,000,000,000" , async () => {
            const { token } = await deploy();
            expect(await token.totalSupply()).to.equal(1000000000);
        });

        it("Should mint 1,000,000,000 tokens to the owner", async () => {
            const { token, owner, addr1 } = await deploy();
            expect(await token.balanceOf(owner.address)).to.equal(1000000000);
            expect(await token.balanceOf(addr1.address)).to.equal(0);
        });
    })
})