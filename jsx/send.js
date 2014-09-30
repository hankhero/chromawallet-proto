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
      asset: '#',   asset_error: '',
      sending: false
    };
  },
  scanURI: function () {
      var self = this;
      if (window.cordova && cordova.plugins.barcodeScanner) {
          cordova.plugins.barcodeScanner.scan(
              function (result) {
                  self.initFromURI(result.text);
              }, 
              function (error) {
                  this.setState(this.getInitialState());
              });
      } else {
          var uri = prompt('Enter Bitcoin URI');
          this.initFromURI(uri);          
      }
  },
  initFromURI: function (uri) {
      try {
          var assetModel = this.props.wallet.getAssetForURI(uri);
          if (assetModel) {
              var params = assetModel.decodePaymentURI(uri);
              if (params) {
                  this.setState({asset: assetModel.getMoniker(),
                                 address: params.address,
                                 amount: params.amount
                                 });
              }
          }
      } catch (x) {
          console.log(x);
          this.setState(this.getInitialState());
      }
  },
  onChangeAddress: function(e) {
    this.setState({address: e.target.value});
  },

  onChangeAmount: function(e) {
    this.setState({amount:  e.target.value});
  },

  onChangeAsset: function(e) {
    this.setState({asset: e.target.value});
  },

  handleSubmit: function(e) {
      var self = this;

      e.preventDefault();

      var assets = self.props.wallet.getAssetModels();
      var asset = null;
      for (var i = 0; i < assets.length; i++) {
          if (assets[i].getMoniker() === self.state.asset){
              asset = assets[i];
          }
      }
      if (asset == null) {
          self.setState({asset_error: "No asset selected"});
          return;
      }

      var payment = asset.makePayment();
      if (!payment.checkAddress(self.state.address)) {
          self.setState({address_error: "Invalid address"});
          return;         
      }
      if (!payment.checkAmount(self.state.amount)) {
          self.setState({amount_error: "Wrong amount"});
          return;          
      }

      payment.addRecipient(self.state.address, self.state.amount);
      self.setState({sending: true});
      payment.send(function (err, txid) {
          if (err) {
              alert('Error when sending coins :(');
              self.setState(self.getInitialState()); // for next use
          } else {
              setTimeout(
                  function () { 
                    self.setState(self.getInitialState()); // for next use
                    self.props.app.changeTab('History'); // change tab
                  }, 
                  8000 // wait until transaction propagates
              );
          }
      });

  },

  render: function () {
    var assets = this.props.wallet.getAssetModels();
    if (this.state.sending) {
return (
  <div className="send">
    <div className="row module-heading">
      <h2>Sending ...</h2>
    </div>
  </div>
);
    } else {
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
              <button className="medium primary btn" style={send_style}>
                Send
              </button>
            </div>
          </div>
          <div className="row">
            <div className="ten columns">
                <div className="right-button medium primary btn"><a href="#" onClick={this.scanURI}>Scan</a></div>
            </div>
          </div>
        </ul>
      </form>
    </div>
  </div>
);
    }
  }
});

module.exports = Send;
