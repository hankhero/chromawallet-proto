/** @jsx React.DOM */

var React = require('react');

var QRCode = require('qrcode.react');
var AssetAddressView = require("./asset-address");

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
        var assetModel = this.props.asset;

        return (<div className="row">
                <div className="six columns">
                        <h3>{assetModel.getMoniker()}</h3>
                </div>
                <div className="twelve columns">{this.props.uri}</div>
                <div className="six columns">
                        <QRCode value={this.props.uri} size={256} />       
                </div>
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
            address: '', address_error: '',
            amount: '', amount_error: '',
            asset: '#', asset_error: '',
            paymentURI: null,
            assetModel: null
        };
    },
    onChangeAddress: function (e) {
        this.setState({address: e.target.value});
    },
    onChangeAmount: function (e) {
        this.setState({amount: e.target.value});
    },
    onChangeAsset: function (e) {
        this.setState({asset: e.target.value});
    },
    onSubmit: function (e) {
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
        generate_cwpp(asset, this.state.amount, function (err, uri) {
            if (err == null) {
                self.setState({paymentURI: uri,
                               assetModel: asset});
            } else {
                console.log(err); // TODO
            }
        });
    },
    render: function () {
        var assets = this.props.wallet.getAssetModels();
        if (this.state.paymentURI) {
            return (<AssetAddressWithQR2 asset={this.state.assetModel}
                                         uri={this.state.paymentURI} />);
        }
        return (
            <div className="send">
                <div className="row module-heading">
                    <h2>Receive</h2>
                </div>
                <div className="recipient-form row">
                    <form onSubmit={this.onSubmit}>
                        <ul>
                            <div className="row">
                                <div className="ten columns">
                                    <li className="field">
                                        <label className="inline" htmlFor="address">Address</label>
                                        <input className="xxwide input" type="text" id="address"
                                        placeholder="Address of the recipient."
                                        onChange={this.onChangeAddress}
                                        value={this.state.address}
                                        />
                                    </li>
                                </div>
                            </div>

                            <div className="row">
                                <div className="five columns">

                                    <li className="field">
                                        <label className="inline" htmlFor="amount">Amount</label>
                                        <input className="xxwide input" type="text" id="amount"
                                        placeholder="Amount to send."
                                        onChange={this.onChangeAmount}
                                        value={this.state.amount}
                                        />
                                    </li>

                                </div>
                                <div className="five columns">

                                    <li className="field">
                                        <label className="inline" htmlFor="asset">Asset</label>
                                        <select className="xxwide input" id="asset"
                                        value={this.state.asset}
                                        onChange={this.onChangeAsset}>
                                            <option value="#">Select asset</option>
                        {
                            assets.map(function (asset) {
                                return (
                                    <AssetOption key={asset.getAddress()} asset={asset} />
                                    );
                            })
                            }
                                        </select>
                                    </li>
                                </div>
                            </div>

                            <div className="row">
                                <div className="ten columns">
                                    <div className="right-button medium primary btn">
                                        <a href="#" onClick={this.onSubmit}>Generate</a>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </form>
                </div>
            </div>
            );
    }
});

module.exports = {
    Receive: Receive2
};
