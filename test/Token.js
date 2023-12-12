const { expect } = require("chai");
const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Token", () => {
    async function deploy() {
        const [owner] = await ethers.getSigners();
        const token = await ethers.deployContract("MTK");
        await token.waitForDeployment();
        return { token, owner };
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
    })
})