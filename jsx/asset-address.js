/** @jsx React.DOM */

var React = require('react');
var CopyableLongString = require('./copyable-long-string');

var AssetAddressView = React.createClass({
    render: function () {
      return <CopyableLongString string={this.props.asset.getAddress()} />;
    }
});

module.exports = AssetAddressView;
