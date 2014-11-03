/** @jsx React.DOM */

console.log('loading cc-wallet-engine');

var ccWalletEngine = null;

try {
    ccWalletEngine = require('cc-wallet-engine');
} catch (err) {
    if (console.error) {
        console.error(err);
    }
    console.log('error:' + err.toString());
    throw err;
}

console.log('done. creating wallet');

var gold = {
        monikers: ['gold'],
        colorDescs: ['epobc:b95323a763fa507110a89ab857af8e949810cf1e67e91104cd64222a04ccd0bb:0:180679']
    },
    euro = {
        "colorDescs": ["epobc:0261b29b587020eeca15f831a5290a9d81038851da4365689be04e588ce58c66:0:303510"],
        "monikers": ["euro"], 
        "unit": 100
    },
    systemAssetDefinitions = [euro, gold],
walletOptions = {
    testnet: true, 
    systemAssetDefinitions: systemAssetDefinitions
};

try {
    var wallet = new ccWalletEngine(walletOptions);
} catch (err) {
    if (console.error) {
        console.error(err);
    }
    var ok = window.confirm("An unexpected error occurred when starting. Do you agree to wipe out local data and retry so you can recover your wallet. Only click OK if you have access to your secret phrase and password.");
    if (ok) {
        localStorage.clear();
        window.location.reload();
    }
}

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
    wallet: wallet,
    walletOptions: walletOptions
};
