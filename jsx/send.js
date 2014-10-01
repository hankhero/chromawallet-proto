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

var SendButton = React.createClass({
        render: function () {
            var sending = this.props.sending;
            var text = sending ? 'Sending...' : 'Send';
            var disabled = sending;
                return (<li className="field">
                    <button className="medium primary btn" style={send_style} disabled={disabled}>
                        {text}
                    </button>
                </li>);            
        }
});

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
      e.preventDefault();

      var assets = this.props.wallet.getAssetModels();
      var asset = null;
      for (var i = 0; i < assets.length; i++) {
          if (assets[i].getMoniker() === this.state.asset){
              asset = assets[i];
          }
      }
      if (asset == null) {
          this.setState({asset_error: "No asset selected"});
          return;
      }

      var payment = asset.makePayment();
      if (!payment.checkAddress(this.state.address)) {
          this.setState({address_error: "Invalid address"});
          return;         
      }
      if (!payment.checkAmount(this.state.amount)) {
          this.setState({amount_error: "Wrong amount"});
          return;          
      }

      var self = this;
      var app = this.props.app;
      payment.addRecipient(this.state.address,
                           this.state.amount);
      this.setState({sending: true});
      payment.send(function (err, txid) {
          if (err) {
              alert('Error when sending coins :(');
              self.setState(self.getInitialState());
              return;
          } else {
              self.setState(self.getInitialState());
              app.changeTab('History'); // change tab
          }
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
                    <label className="inline" htmlFor="address">Address</label>
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
                    <label className="inline" htmlFor="amount">Amount</label>
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
                    <label className="inline" htmlFor="asset">Asset</label>
                    <select className="xxwide input" id="asset"
                            value={this.state.asset}
                            onChange={this.onChangeAsset}>
                      <option value="#">Select asset</option>
                      {
                        assets.map(function (asset) {
                          return (
                              <AssetOption key={asset.getAddress()} asset={asset} />
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
                   <SendButton sending={this.state.sending} />
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
});

module.exports = Send;
