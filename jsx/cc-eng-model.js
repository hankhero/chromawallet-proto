/** @jsx React.DOM */
var ccWalletEngine = require('cc-wallet-engine');

var wallet = new ccWalletEngine();
wallet.initializeFromSeed('test');

module.exports = {
    wallet: wallet
};
