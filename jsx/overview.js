/** @jsx React.DOM */

var React = require('react');
var AnimateMixin = require("react-animate");

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
    mixins: [AnimateMixin],
    getInitialState: function () {
        return {
            clicked: false
        };
    },
    showClick: function () {
        this.animate("my-custom-animation", {
            opacity: 0.3,
        }, {
            opacity: 1,
        }, "cubic-in-out", 500, this.stopShowClick);
        this.setState({clicked: true});
    },
    stopShowClick: function () {
        this.setState({clicked: false});
    },
    copyAddress : function () {
        if (window.cordova && cordova.plugins.clipboard) {
            cordova.plugins.clipboard.copy(this.props.asset.getAddress());
        }
        this.showClick();

    },
    render: function () {
        var animation,
            address = this.props.asset.getAddress();
        if (this.state.clicked) {
            animation =this.getAnimatedStyle("my-custom-animation");
        }
        return (
            <div style={animation} className="overview__address-line">
                <span className="overview__address-hash">{address}</span>
                <img 
                    src="img/copy.png"
                    className="copy-icon" onClick={this.copyAddress}/>
                </div>
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