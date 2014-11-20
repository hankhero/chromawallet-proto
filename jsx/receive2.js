/** @jsx React.DOM */

var React = require('react');

var QRCode = require('qrcode.react');
var AssetAddressView = require('./asset-address');
var CopyableLongString = require('./copyable-long-string');

var AssetOption = React.createClass({
    render: function () {
        var asset = this.props.asset;
        var available = asset.getAvailableBalance();
        var text = asset.getMoniker() + " (" + available + " available)";
        return (
            <option value={asset.getMoniker()}>
            {text}
            </option>
            );
    }
});

var AssetAddressWithQR2 = React.createClass({
    render: function () {
        var assetModel = this.props.asset,
            amount = this.props.amount,
            uri = this.props.uri,
            moniker = assetModel.getMoniker();

        return (<div className="row">
                <div className="six columns">
                        <h3>{amount} {moniker}</h3>
                </div>
                <div className="six columns">
                        <QRCode value={uri} size={256} />       
                </div>
                <CopyableLongString string={uri} />

                </div>);
    }
});

function generate_bitcoin(assetModel, amount, cb) {
    // TODO: do something with amount
    var aparts = assetModel.getAddress().split('@');
    var asset_id = null, address = '';
    if (aparts.length == 2) {
        asset_id = aparts[0];
        address = aparts[1];
    } else {
        address = aparts[0];
    }
    var uri = "bitcoin:" + address;
    if (asset_id) uri = uri + "?asset_id=" + asset_id;
    cb(null, uri);
}

function generate_cwpp(assetModel, amount, cb) {
    var pay_req = assetModel.makePaymentRequest({amount: amount});
    pay_req.getPaymentURI(cb);
}

var Receive2 = React.createClass({
    getInitialState: function () {
        return {
            amount: '', amount_error: '',
            asset: '#', asset_error: '',
            paymentURI: null,
            assetModel: null,
            shownAmount: null
        };
    },
    onChangeAmount: function (e) {
        this.setState({
          amount: e.target.value,
          paymentURI: null
        });
    },
    onChangeAsset: function (e) {
        this.setState({
          asset: e.target.value,
          paymentURI: null
       });
    },
    onSubmit: function (e) {
        e.preventDefault();

        var self = this;
        var assets = self.props.wallet.getAssetModels();
        var asset = null;
        for (var i = 0; i < assets.length; i++) {
            if (assets[i].getMoniker() === self.state.asset) {
                asset = assets[i];
            }
        }
        if (asset == null) {
            return;
        }
        var amount = this.state.amount;
        generate_cwpp(asset, amount, function (err, uri) {
            if (err == null) {
                self.setState({paymentURI: uri,
                               shownAmount: amount,
                               assetModel: asset});
            } else {
                console.log(err); // TODO
            }
        });
    },
    render: function () {
        var assets = this.props.wallet.getAssetModels();
        // if (this.state.paymentURI) {
        //     return (<AssetAddressWithQR2 asset={this.state.assetModel}
        //                                  uri={this.state.paymentURI} />);
        // }
        return (
        <div className="send">
            <div className="row module-heading">
                <h2>Receive</h2>
            </div>
            <div className="recipient-form row">
                <form onSubmit={this.onSubmit}>
                    <ul>
                        <div className="row">
                            <div className="five columns">
                                <label className="inline" htmlFor="amount">Amount</label>
                                <li className="field">
                                    <input className="xxwide input numeric-input-no-spinner"
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="Amount to send."
                                    onChange={this.onChangeAmount}
                                    defaultValue={this.state.amount}
                                    />
                                </li>
                            </div>
                            <div className="five columns">
                                 <label className="inline" htmlFor="asset">Asset</label>
                                <li className="field">
                                  <div className="picker">
                                    <select className="xxwide input" id="asset"
                                        value={this.state.asset}
                                        onChange={this.onChangeAsset}>
                                        <option value="#" disabled>Select asset</option>
                                        {
                                            assets.map(function (asset) {
                                                return (
                                                    <AssetOption
                                                          key={asset.getAddress()}
                                                          asset={asset} />
                                                    );
                                            })
                                        }
                                    </select>
                                  </div>
                                </li>
                            </div>
                        </div>

                        <div className="row">
                            <div className="ten columns">
                                <div className="right-button medium primary btn">
                                    <input type="submit" value="Generate QR"></input>
                                </div>
                            </div>
                        </div>

                    </ul>
                </form>
            </div>
            { this.state.paymentURI &&
                 <AssetAddressWithQR2 asset={this.state.assetModel}
                     amount={this.state.shownAmount}
                     uri={this.state.paymentURI} />
            }

        </div>
        );
    }
});

module.exports = {
    Receive: Receive2
};
