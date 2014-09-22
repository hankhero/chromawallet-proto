/** @jsx React.DOM */

var React = require('react');

var QRCode = require('qrcode.react');

var AssetAddressWithQR = React.createClass({
    copyAddress : function () {
        if (window.cordova && cordova.plugins.clipboard) {
            cordova.plugins.clipboard.copy(this.props.asset.getAddress());
        }        
    },
    render: function () {
        var assetModel = this.props.asset;
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

        return (<div className="row">
                <div className="six columns">
                        <h3>{assetModel.getMoniker()}</h3>
                </div>
                <div className="six columns">
                        <span>{assetModel.getAddress()} <img src="img/copy.png" onClick={this.copyAddress}/></span>
                </div>
                <div className="six columns">
                        <QRCode value={uri} size={256} />       
                </div>
                </div>);
 
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
          return (
              <AssetAddressWithQR key={assetModel.getMoniker()} asset={assetModel} />
          );
      })
  }
</div> 
      );
  }
});

module.exports = Receive;