/** @jsx React.DOM */

var React = require('react');

var QRCode = require('qrcode.react');
var AssetAddressView = require("./asset-address");
var Validator = require('./validator');

var makeUriForQR = function(assetModel, optAmount) {
    var aparts = assetModel.getAddress().split('@');
    var asset_id = null,
        address = '',
        separator = '?';
    if (aparts.length == 2) {
        asset_id = aparts[0];
        address = aparts[1];
    } else {
        address = aparts[0];
    }
    var uri = "bitcoin:" + address;
    if (asset_id) {
        uri = uri + separator + "asset_id=" + encodeURIComponent(asset_id);
        separator = "&";
    }
    if (optAmount) {
        uri = uri + separator + "amount=" + encodeURIComponent(optAmount);
        separator = "&";
    }
    return uri;
},
paymentURI = {
    // Two different kind of URI:s
    makePlainBitcoin: function(assetModel, amount, cb) {
        var uri = makeUriForQR(assetModel, amount);
        cb(null, uri);
    },
    makeCWPP: function (assetModel, amount, cb) { 
        var pay_req = assetModel.makePaymentRequest({amount: amount});
        pay_req.getPaymentURI(cb);
    }    
};

var QR = React.createClass({
    render: function () {
        var uri = this.props.uri;
        return (
            <div className="row">
                <div className="receive__qr-code">
                    <QRCode value={uri} size={256} />
                </div>
            </div>
        );
    }
});

var AssetAddressWithQR = React.createClass({
    render: function () {
        var assetModel = this.props.asset;
        var uri = this.props.uri; 
        return (
            <div>
                <div className="row">
                    <div className="six columns">
                            <AssetAddressView asset={assetModel} />
                    </div>
                </div>
                <div className="row">
                    <div className="receive__qr-code">
                        <QRCode value={uri} size={256} />
                    </div>
                </div>
            </div>
        );
    }
});

var UpdateableQR = React.createClass({
    getInitialState: function () {
        return {
            amount: '',
            paymentURI: ''
        };
    },
    amountChanged: function (event) {
        var amount = event.target.value;

        if (Validator.validateAmountInProgress(amount)) {
            this.setState({
                amount: amount,
                paymentURI: ''
            });
        }
    },
    onSubmit: function () {
        event.preventDefault();
        var self = this,
            cb = function (err, uri) {
                if (err == null) {
                    self.setState({paymentURI: uri});
                } else {
                    console.log(err); // TODO
                }
            },
            makeUriFn = paymentURI.makePlainBitcoin,
            amount = this.state.amount;
        if (Validator.validateAmount(amount) || amount === '') {
            makeUriFn(this.props.asset, amount, cb);            
        }
    },
    render: function () {
        var assetModel = this.props.asset;
        var amount = this.state.amount;
        var uri = this.state.paymentURI;
        return (
              <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="push-row-one five columns">
                      <div className="field">
                        <label className="inline" for="receive__amount">Write amount, then show the QR-code.</label>
                        <input className="xxwide input" id="receive__amount"
                            type="text" placeholder="Amount Euro"
                            value={amount} onChange={this.amountChanged}/>
                      </div>
                    </div>
                </div>
    
                <div className="row">
                    <div className="push-row-one push-row-bottom-one five columns ">
                      <div className="btn primary medium">
                        <button onClick={this.onSubmit}>Show</button>
                      </div>
                    </div>
                </div>
                {
                    uri && 
                      <div>
                        <div className="row">
                            <div className="receive__qr-code">
                                <QRCode value={uri} size={256} />
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="six columns">
                                    <AssetAddressView asset={assetModel} />
                            </div>
                        </div>
                      </div>
                }
                </form>
        );
    }
});

var Receive = React.createClass({
  render: function () {
      var assetModels = this.props.wallet.getAssetModels();
      return (
<div className="receive">

  <div className="row module-heading">
    <h2>Receive</h2>
  </div>
  {
      assetModels.map(function (assetModel) {
          var moniker = assetModel.getMoniker();
          return (
              <div>
                  <div className="row">
                    <div className="six columns">
                        <h3>{assetModel.getMoniker()}</h3>
                      </div>
                  </div>
                  <AssetAddressWithQR
                          key={moniker}
                          uri={makeUriForQR(assetModel)}
                          asset={assetModel} />
              </div>
          );
      })
  }
</div> 
      );
  }
});

module.exports = {
    makeUriForQR: makeUriForQR,
    paymentURI: paymentURI,
    QR: QR,
    AssetAddressWithQR: AssetAddressWithQR,
    UpdateableQR: UpdateableQR,
    Receive: Receive
};
