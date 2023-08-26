const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');


describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    const signer = ethers.provider.getSigner();

    // Create an address that meets the winning condition
    const threshold = 0x00ffffffffffffffffffffffffffffffffffffff;
    let address = threshold;
    let wallet;
    while (address >= threshold){
      wallet = await ethers.Wallet.createRandom();
      address = wallet.address;
    }

    //Connect wallet to Hardhat provider
    wallet = wallet.connect(ethers.provider);

    //Send some ETH to wallet so it could send transactions
    await signer.sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther("1"),
    });

    return { game, wallet };
  }
  it('should be a winner', async function () {
    const { game, wallet } = await loadFixture(deployContractAndSetVariables);

    // good luck
  

    await game.connect(wallet).win();
    // await game.connect(await signer).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
