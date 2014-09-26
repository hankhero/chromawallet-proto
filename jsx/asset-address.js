/** @jsx React.DOM */

var React = require('react');
var AnimateMixin = require("react-animate");

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
        if (window.cordova && cordova.plugins.clipboard) {
            return (
                    <div style={animation} className="overview__address-line">
                    <span className="overview__address-hash">{address}</span>
                    <img 
                src="img/copy.png"
                className="copy-icon" onClick={this.copyAddress}/>
                    </div>
            );
        } else {
            return (
                    <div className="overview__address-line">
                        <span className="overview__address-hash">{address}</span>
                    </div>
            );
        }
    }
});

module.exports = AssetAddressView;;