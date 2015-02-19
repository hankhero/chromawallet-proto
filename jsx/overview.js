/** @jsx React.DOM */

var React = require('react');
var AssetAddressView = require("./asset-address");

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

var Overview = React.createClass({
  render: function () {
    var wallet = this.props.wallet;
    var assets = this.props.wallet.getAssetModels();
    return (
       <div className="overview">
         <div className="row module-heading">
           <h2>Overview</h2>
            { (wallet.isUpdating()) ? <p>updating</p> : <p></p> }        
         </div>
         {
             assets.map(function (assetModel) {
                var moniker = assetModel.getMoniker();
                return (
                   <div key={assetModel.getAddress()} className="row">
                     <div className="six columns">
                       <h3>{moniker}</h3>
                     </div>
                     <div className="six columns">
                       <div>Balance: <AssetBalanceView asset={assetModel} /></div>
                       <div className="overview__address">Address: <AssetAddressView asset={assetModel}/></div>
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