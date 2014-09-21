/** @jsx React.DOM */

console.log('loading cc-wallet-engine');

var ccWalletEngine = null;

try {
    ccWalletEngine = require('cc-wallet-engine');
} catch (x) {
    console.log('error:' + x.toString());
}

console.log('done. creating wallet');

var wallet = new ccWalletEngine({testnet: true});

console.log('done!');

//var adm = wallet.wallet.adManager;
//if (adm.getByMoniker('gold') == null) {
//    wallet.wallet.addAssetDefinition({
//            monikers: ['gold'],
//    colorSchemes: ['epobc:b95323a763fa507110a89ab857af8e949810cf1e67e91104cd64222a04ccd0bb:0:180679']
//        });
//    wallet.update();
//}

setInterval(function () { wallet.update(); }, 10000);

wallet.update();


module.exports = {
    wallet: wallet
};
