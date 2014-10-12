/** @jsx React.DOM */

console.log('loading cc-wallet-engine');

var ccWalletEngine = null;

try {
    ccWalletEngine = require('cc-wallet-engine');
} catch (x) {
    console.log('error:' + x.toString());
}

console.log('done. creating wallet');

var systemAssetDefinitions = [{
    monikers: ['gold'],
    colorDescs: ['epobc:b95323a763fa507110a89ab857af8e949810cf1e67e91104cd64222a04ccd0bb:0:180679']
    }];

var wallet = new ccWalletEngine(
    {testnet: true, systemAssetDefinitions: systemAssetDefinitions}
);

console.log('done!');

wallet.update();

setInterval(function () {
    if (wallet.isInitialized())
        wallet.ccWallet.scanAllAddresses(function (err) {
            if (err) console.log(err);
            wallet.update();
        });
    }, 15000);

module.exports = {
    wallet: wallet
};
