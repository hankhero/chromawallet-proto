
//TODO this class could be improved with some refactoring of css class-names etc

var React = require('react');
var AnimateMixin = require("react-animate");

var CopyableLongString = React.createClass({
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
        if (window.cordova && cordova.plugins && cordova.plugins.clipboard) {
            cordova.plugins.clipboard.copy(this.props.string);
        }
        this.showClick();
    },
    render: function () {
        var animation,
            address = this.props.string;
        if (this.state.clicked) {
            animation =this.getAnimatedStyle("my-custom-animation");
        }
        if (window.cordova && cordova.plugins && cordova.plugins.clipboard) {
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
                        <span className="overview__address-hash selectable">{address}</span>
                    </div>
            );
        }
    }
});

module.exports = CopyableLongString;