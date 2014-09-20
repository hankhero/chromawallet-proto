/** @jsx React.DOM */

var React = require('react');

var AssetBalanceView = React.createClass({
    render: function () {
        var asset = this.props.asset,
            total = asset.getTotalBalance(),
            unconfirmed = asset.getUnconfirmedBalance(),
            available,
            text = total;
        if (unconfirmed && unconfirmed !==0) {
            available = asset.getAvailableBalance();
            text = text + " (" + unconfirmed + " unconfirmed, " +
                available + " available)";
        }

        return (
            <span>{text}</span>
        );
    }
});
var AssetAddressView = React.createClass({
    render: function () {
        return (
            <span>{this.props.asset.getAddress()}</span>
        );
    }
});


var Overview = React.createClass({
  render: function () {
    var assets = this.props.wallet.getAssetModels();
    return (
       <div className="overview">
         <div className="row module-heading">
           <h2>Overview</h2>
           <div className="right-button medium primary btn"><a href="#">Update</a></div>
         </div>
         {
             assets.map(function (assetModel) {
                var moniker = assetModel.getMoniker();
                return (
                   <div className="row">
                     <div className="six columns">
                       <h3>{moniker}</h3>
                     </div>
                     <div className="six columns">
                       <div>Balance: <AssetBalanceView asset={assetModel} /></div>
                       <div>Address: <AssetAddressView asset={assetModel}/></div>
                     </div>
                   </div>
                );
             })
         }

       </div>
    );
  }
});

module.exports = Overview;