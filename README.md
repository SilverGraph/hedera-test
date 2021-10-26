# hedera-test
A testing environment for transactions (in Hbars) in Hedera TestNet network


### To test it on your local machine:
 - Register to [hedera portal](https://portal.hedera.com/register)
 - Create a `.env` file in the root `/` directory
 - Paste the account id and the keys just as written in `.env.sample`
 - `npm install`
 - `nodemon server.js`

## NOTE: The transaction will be carried as soon as the above command is executed. To check the account info, un-commnet the `/* ACCOUNT INFO */` section in `server.js`.
