/** @jsx React.DOM */
var ccWalletEngine = require('cc-wallet-engine');

var wallet = new ccWalletEngine();
wallet.initializeFromSeed('test');

var adm = wallet.wallet.adManager;
if (adm.getByMoniker('gold') == null) {
    wallet.wallet.addAssetDefinition({
            monikers: ['gold'],
    colorSchemes: ['epobc:b95323a763fa507110a89ab857af8e949810cf1e67e91104cd64222a04ccd0bb:0:180679']
        });
    wallet.update();
}

module.exports = {
    wallet: wallet
};
