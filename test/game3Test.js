const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(0);
    const acc1 = ethers.provider.getSigner(1);
    const acc2 = ethers.provider.getSigner(2);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();
    const addr1 = await acc1.getAddress();
    const addr2 = await acc2.getAddress();

    return { game, signer, acc1, acc2, address, addr1, addr2 };
  }

  it('should be a winner', async function () {
    const { game, signer, acc1, acc2, address, addr1, addr2 } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage
    await game.connect(acc1).buy({ value: '2' });
    await game.connect(acc2).buy({ value: '3' });

    // to call a contract as a signer you can use contract.connect
    await game.connect(signer).buy({ value: '1' });

    // TODO: win expects three arguments
    await game.win(addr1, addr2, address);


    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
