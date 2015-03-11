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
    systemAssetDefinitions = [euro, gold];

var walletOptions = {
    testnet: true,
    networks: [
        {
            name: 'ElectrumJS',
            args: [{
                testnet: true
            }]
        },
        {
            name: 'Chain',
            args: [{
                testnet: true,
                apiKeyId: 'DEMO-4a5e1e4',
                requestTimeout: 15000
            }]
        }
    ],
    blockchain: {name: 'Naive'},
    systemAssetDefinitions: systemAssetDefinitions
};

try {
    var wallet = new ccWalletEngine(walletOptions);
} catch (err) {
    if (console.error) {
        console.error(err.stack || err);
    }
    var ok = window.confirm("An unexpected error occurred when starting. Do you agree to wipe out local data and retry so you can recover your wallet. Only click OK if you have access to your secret phrase and password.");
    if (ok) {
        localStorage.clear();
        window.location.reload();
    }
}

console.log('done!');

wallet.on('error', function (err) {
    console.log(err.stack || err);
});

module.exports = {
    wallet: wallet,
    walletOptions: walletOptions
};
