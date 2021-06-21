const Adoption = artifacts.require("Adoption");

contract("Adoption", (accounts) => {
    let adoption;
    let Id=8;
    let amount = 1000000000000000000;
    let walletBefore;
    let walletAfter;
    let wallet;
    let ownerBalanceBefore;
    let ownerBalanceAfter;
    let ownerBalance;

    before(async () => {
        adoption = await Adoption.deployed();
        // accounts[1].balance = 100000000000000000000;
    });

    describe("check initial balance of smart contract and owner, perform buy transaction, and the withdrawal transaction", async () => {
        before("get contract balance, owner balance and perform the buy transaction", async () => {
            walletBefore = await adoption.getContractBalance();
            ownerBalanceBefore = await adoption.getOwnerBalance();
            await adoption.buy(Id, { from: accounts[1], value: amount });
            expectedAdopter = accounts[1];
        });

        it("can fetch the address of an owner by pet id", async () => {
            const adopter = await adoption.adopters(Id);
            assert.equal(adopter, expectedAdopter, "The owner of the adopted pet should be the first account.");
        });
        
        it("can fetch the collection of all pet owners' addresses", async () => {
            const adopters = await adoption.getAdopters();
            assert.equal(adopters[Id], expectedAdopter, "The owner of the adopted pet should be in the collection.");
        });
        
        it("can store msg.value correctly", async () => {
            walletAfter = await adoption.getContractBalance();
            wallet = walletAfter - walletBefore;
            assert.equal(wallet, amount, "The amount in smart contract should be the same as the msg.value sent.");
        });
        
        it("can empty the smart contract balance and transfer to owner", async () => {
            await adoption.withdrawal();
            walletAfter = await adoption.getContractBalance();
            wallet = walletAfter - walletBefore;
            assert.equal(wallet, 0, "The amount in smart contract should be 0 after withdrawal");
        });

        it("owner balance is more after the withdrawal of smart contract balance", async () => {
            ownerBalanceAfter = await adoption.getOwnerBalance();
            ownerBalance = ownerBalanceAfter - ownerBalanceBefore;
            console.log(ownerBalance);
            assert.notEqual(ownerBalanceAfter, ownerBalanceBefore, "The owner account is less after smart contract withdrawal")
        });
    });
});