/** @jsx React.DOM */

// Probably not much react, maybe move out later.


var MockAssetModel = function (props) {
    return {
        props: props,
        getMoniker: function () {
            return props.asset;
        },
        getAddress: function () {
            return props.address;
        },
        getTotalBalance: function () {
            return props.totalBalance; 
        },
        getUnconfirmedBalance: function () {
            return props.unconfirmedBalance;
        },
        getAvailableBalance: function () {
            return props.availableBalance;
        }
        
    };
};

var MockWallet = function () {
    var updateCallback = function (){},
    assetModels = [
        MockAssetModel({
            asset: 'Bitcoin',
            address: '12asdf9fnasdfasdf9rfadvcadv',
            totalBalance: 12.35,
            unconfirmedBalance: undefined
        }),
        MockAssetModel({
            asset: 'Gold-coins',
            address: 'fasdf9fnasdfasdf9rfad@asdasdbe134bje',
            totalBalance: 10.34,
            unconfirmedBalance: 2.2,
            availableBalance: 10.34 - 2.2
        })
    ],
    getAssetModels = function () {
        // for moniker in wallet.get_all_monikers():
        //     asset = wallet.get_asset_definition(moniker)
        //     address = wallet.get_some_address(asset)
        //     total_balance = wallet.get_total_balance(asset)
        //     unconfirmed_balance = wallet.get_unconfirmed_balance(asset)

        //     groupBox = QtGui.QGroupBox(moniker, self.scrollAreaContents)
        //     layout = QtGui.QFormLayout(groupBox)

        //     label = QtGui.QLabel(groupBox)
        //     label.setText('Balance:')
        //     layout.setWidget(0, QtGui.QFormLayout.LabelRole, label)

        //     balance_text = asset.format_value(total_balance)
            // if not (unconfirmed_balance == 0):
            //     balance_text += " (%s unconfirmed, %s available)" % \
            //         (asset.format_value(unconfirmed_balance),
            //          asset.format_value(wallet.get_available_balance(asset)))
        return assetModels;
    },
    isLoggedIn = false,
    loginClicked = function (loginComponent) {
        var passphrase = loginComponent.getPassPhrase();
        if (passphrase === 'test') {
            isLoggedIn = true;
        } else {
            loginComponent.setErrorMessage('Demo error message. The passphrase is test.');
        }
    },
    createWalletClicked = function (loginComponent) {
        var passphrase = loginComponent.getPassPhrase();
        if (window.confirm(
                'Are you sure you want to create a wallet')) {
            isLoggedIn = true;
        } else {
            loginComponent.setErrorMessage('Try again.');
        }
    },
    getIsLoggedIn = function () {
        return isLoggedIn;
    },
    setCallback = function (notifier) {
        updateCallback = notifier;
    };

    return {
        setCallback: setCallback,
        getAssetModels: getAssetModels,
        loginClicked: loginClicked,
        createWalletClicked: createWalletClicked,
        getIsLoggedIn: getIsLoggedIn,
        _bumpBitcoin: function () {
            assetModels[0].props.totalBalance = assetModels[0].props.totalBalance + 0.25;
            updateCallback();
        },
        _addNewAsset: function () {
            assetModels.push(MockAssetModel({
                asset: 'Surprise-voucher',
                address: 'asdfadf@asdasdsdfasdf9rfadvcadv',
                totalBalance: 99.00,
                unconfirmedBalance: 10,
                availableBalance: 89
            }));
            updateCallback();
        }

    };
};

var mockWallet = MockWallet(),
    wallet = mockWallet;

window.setInterval(function (){
    mockWallet._bumpBitcoin();
}, 3000);

window.setTimeout(function (){
    mockWallet._addNewAsset();
}, 10000);
