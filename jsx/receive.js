/** @jsx React.DOM */

var React = require('react');

var QRCode = require('qrcode.react');

var Receive = React.createClass({
  render: function () {
      return (
<div className="receive">

  <div className="row module-heading">
    <h2>Receive</h2>
    <div className="right-button medium primary btn"><a href="#">New address</a></div>
  </div>
  <div className="row">
     <QRCode value="http://www.example.com/" />
  </div>
</div> 
      );
  }
});

module.exports = Receive;