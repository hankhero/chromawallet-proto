/** @jsx React.DOM */

// Probably not much react, maybe move out later.


var MockPaymentModel = function (props) {
    var recipients = [],
        read_only = false;
    
    return {
        checkAddress: function (address)  { return true; },
        checkAmount: function (amount) { return true; },
        addRecipeint: function (address, amount, asset) {
            if (read_only) throw "read-only";
            recipients.push({address: address, amount: amount, asset: asset});
        },
        send: function (callback) {
            if (read_only) throw "read-only";
            if (recipients.length == 0)
                throw "recipient list is empty";
            alert("sending " + recipients[0].amount + " to " + 
                recipients[0].address);
            read_only = true;
            callback(this);
        },
        getStatus: function () {
            if (read_only)
                return "sent";
            else
                return "fresh";
        }
    };
};

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
        },
        makePayment: function () {
            return new MockPaymentModel(props);
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
            unconfirmedBalance: 0.0,
            availableBalance: 12.35
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
    isInitializedFlag = false,
    isInitialized = function () {
        return isInitializedFlag;
    },
    initializeFromSeed = function (seed) {
        isInitializedFlag = true;
        updateCallback();
    },
    generateRandomSeed = function (entropy) {
        return 'random seed';
    },
    setCallback = function (notifier) {
        updateCallback = notifier;
    };

    return {
        setCallback: setCallback,
        getAssetModels: getAssetModels,
        isInitialized: isInitialized,
        initializeFromSeed: initializeFromSeed,
        generateRandomSeed: generateRandomSeed,
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

module.exports = {
    wallet: wallet
};

