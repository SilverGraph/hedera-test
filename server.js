const express = require('express')
require('dotenv').config()

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Server running...</h1>')
    // res.send(process.env.PRIVATE_KEY)
})



const { 
    Client,
    Hbar,
    HbarUnit,
    AccountBalanceQuery,
    AccountInfoQuery,
    AccountCreateTransaction,
    txResponse,
    PublicKey,
    TransferTransaction
} = require('@hashgraph/sdk')



// BUILD A HEDERA CLIENT
async function main() {
    //Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.ACCOUNT_ID;
    const myPrivateKey = process.env.PRIVATE_KEY;
    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null || myPrivateKey == null ) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    } else {
        console.log('Keys imported successfully from env');
    }

    const client = Client.forTestnet()
    client.setOperator(process.env.ACCOUNT_ID, process.env.PRIVATE_KEY);




    /***** ACCOUNT BALANCE *****/
    //Create the account balance query
    const query = new AccountBalanceQuery()
    .setAccountId(myAccountId);

    //Submit the query to a Hedera network
    const accountBalance = await query.execute(client);
    console.log("Balance: " + accountBalance.hbars);
    /***** ACCOUNT BALANCE *****/



    /***** ACCOUNT INFO *****/
    // const query2 = new AccountInfoQuery()
    // .setAccountId(myAccountId);

    // const accountInfo = await query2.execute(client);
    // console.log(accountInfo);
    /***** ACCOUNT INFO *****/




    /***** TRANSACTION *****/
    // Create a transaction to transfer 100 hbars
    const transaction = new TransferTransaction()
    .addHbarTransfer('0.0.2908916', new Hbar(-1))
    .addHbarTransfer('0.0.2908905', new Hbar(1));

    //Submit the transaction to a Hedera network
    const txResponse = await transaction.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status is " +transactionStatus.toString());
    /***** TRANSACTION *****/
}
main();




// IMPORTING 1 HBAR (100 MIL TINYBARS)
// const amount = new Hbar(1, HbarUnit.TINYBAR)
// console.log(amount);




app.listen(3000, () => {
    console.log('Server started on port 3000');
})