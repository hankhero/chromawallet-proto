/** @jsx React.DOM */

var React = require('react');

var QRCode = require('qrcode.react');
var AssetAddressView = require("./asset-address");

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
        var uri = makeUriForQR(assetModel);
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
            amount: ''
        };
    },
    amountChanged: function (event) {
        var amount = event.target.value;
        this.setState({
            amount: amount
        });
    },
    noSubmit: function (event) {
        event.preventDefault();
    },
    render: function () {
        var assetModel = this.props.asset;
        var amount = this.state.amount;
        var uri = makeUriForQR(assetModel, amount);
        return (
            <div>
               <div className="row">
                 <form onSubmit={this.noSubmit}>
                    <div className="push-row-one five columns">
                      <div className="field">
                        <label className="inline" for="receive__amount">Write amount, then show the QR-code.</label>
                        <input className="xxwide input" id="receive__amount"
                            type="number" placeholder="Amount Euro"
                            value={amount} onChange={this.amountChanged}/>
                      </div>
                    </div>
                  </form>
                </div>

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
    QR: QR,
    AssetAddressWithQR: AssetAddressWithQR,
    UpdateableQR: UpdateableQR,
    Receive: Receive
};
