/** @jsx React.DOM */

var React = require('react');

var AssetOption = React.createClass({
  render: function () {
    var asset = this.props.asset;
    var available = asset.getAvailableBalance();
    var text = asset.getMoniker() + " (" + available + " available)";
    return (
      <option value={asset.getMoniker()}>
            {text}
     </option>
    );
  }
});

// TODO put in common file
var FormFieldError = React.createClass({
  render: function () {
    if(this.props.message){
      return (
        <div className="danger alert">{this.props.message}</div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
});

var send_style = {
  color: 'white',
  padding: '0 18px !important'
};

var Send = React.createClass({

  getInitialState: function() {
    return {
      address: '',  address_error: '',
      amount: '', amount_error: '',
      asset: '#',   asset_error: ''
    };
  },

  onChangeAddress: function(e) {
    this.state.address = e.target.value;
    this.setState(this.state);
  },

  onChangeAmount: function(e) {
    this.state.amount = e.target.value;
    this.setState(this.state);
  },

  onChangeAsset: function(e) {
    this.state.asset = e.target.value;
    this.setState(this.state);
  },

  handleSubmit: function(e) {
      e.preventDefault();

      var assets = this.props.wallet.getAssetModels();
      var asset = null;
      for (var i = 0; i < assets.length; i++) {
          if (assets[i].getMoniker() === this.state.asset){
              asset = assets[i];
          }
      }
      if (asset == null) {
          this.state.asset_error = "No asset selected!";
          this.setState(this.state);
          return;
      }

      var payment = asset.makePayment();
      if (!payment.checkAddress(this.state.address)) {
          this.state.address_error = "Invalid address";
          this.setState(this.state);
          return;         
      }
      if (!payment.checkAmount(this.state.amount)) {
          this.state.amount_error = "Wrong amount";
          this.setState(this.state);
          return;          
      }

      // TODO: temp
      if (this.props.wallet.temp_mnemonic != undefined) {
          payment.setMnemonic(this.props.wallet.temp_mnemonic,
                              this.props.wallet.temp_password);
      }
      
      var self = this;
      var app = this.props.app;
      payment.addRecipient(this.state.address,
                           this.state.amount);
      payment.send(function () {
              app.changeTab('History'); // change tab
      });
  },

  render: function () {
    var assets = this.props.wallet.getAssetModels();
    return (
      <div className="send">
        <div className="row module-heading">
          <h2>Send</h2>
        </div>
        <div className="recipient-form row">
          <form onSubmit={this.handleSubmit}>
            <ul>

              <div className="row">
                <div className="ten columns">
                  <li className="field">
                    <label className="inline" for="address">Address</label>
                    <input className="xxwide input" type="text" id="address"
                           placeholder="Address of the recipient."
                           onChange={this.onChangeAddress} 
                           value={this.state.address}
                    />
                    <FormFieldError message={this.state.address_error} />
                  </li>
                </div>
              </div>

              <div className="row">
                <div className="five columns">

                  <li className="field">
                    <label className="inline" for="amount">Amount</label>
                    <input className="xxwide input" type="text" id="amount"
                           placeholder="Amount to send." 
                           onChange={this.onChangeAmount} 
                           value={this.state.amount}
                    />
                    <FormFieldError message={this.state.amount_error} />
                  </li>

                </div>
                <div className="five columns">

                  <li className="field">
                    <label className="inline" for="asset">Asset</label>
                    <select className="xxwide input" id="asset" 
                            onChange={this.onChangeAsset}>
                      <option value="#">Select asset</option>
                      {
                        assets.map(function (asset) {
                          return (
                              <AssetOption asset={asset} />
                          )
                        })
                      }
                    </select>
                    <FormFieldError message={this.state.asset_error} />
                  </li>

                </div>
              </div>

              <div className="row">
                <div className="ten columns">
                  <li className="field">
                    <button className="medium primary btn" style={send_style}>
                      Send
                    </button>
                  </li>
                </div>
              </div>
                
            </ul>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Send;
