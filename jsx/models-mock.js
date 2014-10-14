/** @jsx React.DOM */

// Probably not much react, maybe move out later.


var MockPaymentModel = function (props) {
    var recipients = [],
        read_only = false;
    
    return {
        checkAddress: function (address)  { return true; },
        checkAmount: function (amount) { return true; },
        addRecipient: function (address, amount) {
            if (read_only) throw "read-only";
            recipients.push({address: address, amount: amount});
        },
        send: function (callback) {
            if (read_only) throw "read-only";
            if (recipients.length == 0)
                throw "recipient list is empty";
            alert("sending " + recipients[0].amount + " to " + 
                recipients[0].address);
            read_only = true;
            err = false;
            txid = '049bd47af99c347698fe416736c7315f73563f72d612d89a288a1485271aad91'
            callback(err, txid);
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

var MockAssetTarget = function (address, assetMoniker, formattedValue) {
    return {
        getAddress: function () {
            return address;
        },
        getAssetMoniker: function () {
            return assetMoniker;
        },
        getFormattedValue: function () {
            return formattedValue;
        }
    };
};


var MockHistoryEntryModel = function(props) {
    return {
        isTrade: function () {
            return (props.txType === 'trade');
        },
        isSend: function () {
            return (props.txType === 'send');
        },
        isReceive: function () {
            return (props.txType === 'receive');
        },
        getTransactionTypeString: function () {
            return props.txType;
        },
        getTargets: function () {
            return props.targets;
        },
        getAddress: function () {
            return props.address;
        },
        getTxId: function () {
            return props.txId;
        },
        getDate: function () {
            //datetime = QtCore.QDateTime.fromTime_t(ent.txtime)
            return props.date;
        },
        // For trades
        getInValues: function () {
            return props.inValues;
        },
        getOutValues: function () {
            return props.outValues;
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
    historyEntries = [
        MockHistoryEntryModel({
            date: '2014-07-20',
            address: 'fasdf9fnasdfasdf9rfad@asdasdbe134bje',
            txId : '64dd5fc37a22ce15957565d0673c4f948160a6bf0a2f54bfc0035ed769e70368',
            txType: 'send',
            targets: [
                MockAssetTarget('fasdf9fnasdfasdf9rfad@asdasdbe134bje', 
                'Gold', "120")
            ]
        }),
        MockHistoryEntryModel({
            date: '2014-07-21',
            address: 'fasdf9fnasdfasdf9rfad@asdasdbe134bje',
            txId : '049bd47af99c347698fe416736c7315f73563f72d612d89a288a1485271aad91',
            txType: 'receive',
            targets: [
                MockAssetTarget('fasdf9fnasdfasdf9rfad@asdasdbe134bje',
                'Silver', "100")
            ]
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
    getHistory = function () {return historyEntries;},
    hasSeedFlag = false;
    hasPinFlag = false;
    isInitializedFlag = false,

    initialize = function(mnemonic, password) {
        isInitializedFlag = true;
        hasSeedFlag = true;
    },
    isInitialized = function () {
        return isInitializedFlag;
    },
    setSeed = function(mnemonic, password) {
        isInitializedFlag = true;
        hasSeedFlag = true;
    },
    getSeed = function() {
        if(hasSeedFlag){
          return "random seed";
        }
        return "";
    },
    hasSeed = function () {
        return hasSeedFlag;
    },
    canResetSeed = function () {
        return !hasSeedFlag;
    },
    generateMnemonic = function() {
        return "tag capable scheme february vague first unfair mouse lift marriage salmon riot";
    },
    generateRandomSeed = function (entropy) {
        return 'random seed';
    },
    hasPin = function () {
        return hasPinFlag;
    },
    getPin = function () {
        return "1234";
    },
    setPin = function (pin) {
      hasPinFlag = true;
    },
    getPinEncrypted = function () {
      return "encryptedpin";
    },
    setPinEncrypted = function (encryptedpin){
      hasPinFlag = true;
    },
    setCallback = function (notifier) {
        updateCallback = notifier;
    };

    return {
        setCallback: setCallback,
        getAssetModels: getAssetModels,
        getHistory: getHistory,
        initialize : initialize,
        generateMnemonic : generateMnemonic,
        isInitialized: isInitialized,
        hasPin: hasPin,
        getPin: getPin,
        setPin: setPin,
        getPinEncrypted: getPinEncrypted,
        setPinEncrypted: setPinEncrypted,
        hasSeed: hasSeed,
        getSeed: getSeed,
        setSeed: setSeed,
        canResetSeed: canResetSeed,
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

