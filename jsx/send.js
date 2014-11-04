/** @jsx React.DOM */

var React = require('react'),
    Validator = require('./validator');

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

var ConfirmTransaction = React.createClass({
  getInitialState: function() {
    return {
      pin: '',
      errorMessage: "",
      sending: false
    };
  },
  onChangePin: function (e) {
    this.setState({ pin: e.target.value, errorMessage: null });
  },
  onCancel: function (e) {
    this.props.sendcomp.setState({ sending: false, payment: null });
    this.setState(this.getInitialState());
  },
  onSubmit: function (e) {
    e.preventDefault();
    if (this.state.pin == this.props.sendcomp.props.wallet.getPin()){
      this.sendTransaction();
    } else {
      this.setState({ errorMessage: "Invalid PIN" });
    }
  },
  sendTransaction: function () {
    var self = this;
    var sendcomp = this.props.sendcomp;

    function onPaymentComplete(err, txid) {
        if (err) {
            alert('Error when sending coins :(');
            sendcomp.setState(sendcomp.getInitialState());
            self.setState(self.getInitialState());
        } else {
            setTimeout(
                function () { 
                    self.setState(self.getInitialState());
                    sendcomp.setState(sendcomp.getInitialState());
                    sendcomp.props.app.changeTab('History'); // change tab
                }, 
                1000 // wait until we update wallet state
            );
        }          
    }

    this.setState({sending: true});

    process.nextTick(function () {
        try {
            sendcomp.state.payment.send(onPaymentComplete);
        } catch (x) {
            console.log(x);
            alert('Error when sending coins :(');
        }
    });
  },
  render: function () {
    if (this.props.sendcomp.state.sending && this.state.sending) {
      return (
        <div className="modal active">
          <div className="content">
            <div className="row">
               <div className="ten columns centered text-center">
                  <h2>Sending ...</h2>
               </div>
            </div>
          </div>
        </div>
      );
    } else if(this.props.sendcomp.state.sending) {
      var warningClasses = this.state.errorMessage ? 'warning alert': '';
      return (
        <div className="modal active">
          <div className="content">
            <div className="row">
              <div className="ten columns centered text-center">
                <h2>Confirm Transaction</h2>
                <p>Enter your pin to send the transaction.</p>
                <form onSubmit={this.onSubmit}>
                  <div className="field">
                    <input className="input" placeholder="PIN"
                           type="password" value={this.state.pin}
                           onChange={this.onChangePin}/>
                  </div>
                </form>
                <p className={warningClasses}>{this.state.errorMessage}</p>
                <p className="btn primary medium">
                  <button onClick={this.onCancel}>Cancel</button>
                </p>
                <p className="btn primary medium">
                  <button onClick={this.onSubmit}>Submit</button>
                </p>

              </div>
            </div>
          </div>
        </div>
      );
    } 
  }
});

var SendCoreMixin = {
  getInitialState: function() {
    return {
      address: '',  address_error: '',
      amount: '', amount_error: '',
      asset: '#',   asset_error: '',
      scan_error: '',
      payment: null,
      sending: false
    };
  },
  scanURI: function (evt) {
      evt.preventDefault();
      var self = this;
      if (window.cordova && cordova.plugins.barcodeScanner) {
          cordova.plugins.barcodeScanner.scan(
              function (result) {
                  self.initFromURI(result.text);
                  if (self.afterScanHook) {
                      self.afterScanHook();
                  }
              },
              function (error) {
                  this.setState(this.getInitialState());
              });
      } else {
          var uri = prompt('Enter Bitcoin URI');
          this.initFromURI(uri);
      }
  },
  initFromPayment: function (payment) {
      var recipients = payment.getRecipients();
      var address = '';
      var amount = '';
      if (recipients.length == 1) {
          address = recipients[0].address;
          amount = recipients[0].amount;
      }
      this.setState({address: address, amount: amount,
                     asset: payment.getAssetModel().getMoniker(),
                     payment: payment});
  },
  initFromURI: function (uri) {
      this.setState(this.getInitialState());
      var self = this;
      try {
          this.props.wallet.makePaymentFromURI(uri, function (err, payment) {
              if (err) {
                  throw err;
              }
              self.initFromPayment(payment);
          });
      } catch (x) {
          this.setState({scan_error: "An error occurred. Bad QR-code?"});
          console.log(x);
      }
  },
  onChangeAddress: function(e) {
    this.setState({address: e.target.value});
  },

  onChangeAmount: function(e) {
      var amount = e.target.value;
      if (Validator.validateAmountInProgress(amount)) {
          this.setState({amount:  amount});
      }
  },

  onChangeAsset: function(e) {
    this.setState({asset: e.target.value});
  },
  getAsset: function () {
      var assets = this.props.wallet.getAssetModels();
      var asset = null;
      for (var i = 0; i < assets.length; i++) {
          if (assets[i].getMoniker() === this.state.asset){
              asset = assets[i];
          }
      }
      return asset;
  },
  clearErrors: function () {
      this.setState({
          asset_error: "",
          amount_error: "",
          address_error: "",
          scan_error: ''
      });
      
  },
  onSubmit: function(e) {
      e.preventDefault();

      this.clearErrors();

      var payment = this.state.payment;
      if (!payment) {
          // create and initialize payment if it doesn't exist
          var asset = this.getAsset();
          if (asset == null) {
              this.setState({asset_error: "No asset selected"});
              return;
          }

          payment = asset.makePayment();

          if (!payment.checkAddress(this.state.address)) {
              this.setState({address_error: "Invalid address"});
              return;         
          }
          if (!payment.checkAmount(this.state.amount)) {
              this.setState({amount_error: "Wrong amount"});
              return;          
          }
          payment.addRecipient(this.state.address, this.state.amount);
      }

      this.setState({sending: true, payment: payment});
  }
};


var Send = React.createClass({
  mixins: [SendCoreMixin],
  render: function () {
    var assets = this.props.wallet.getAssetModels();
    if (this.state.sending) {
      return (
        <ConfirmTransaction sendcomp={this} />
      );
    } else {
      return (
        <div className="send">
          <div className="row module-heading">
            <h2>Send</h2>
          </div>
          <div className="recipient-form row">
            <form onSubmit={this.onSubmit}>
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
                            );
                          })
                        }
                      </select>
                      <div className="row">
                         <FormFieldError message={this.state.asset_error} />
                      </div>
                    </li>
                  </div>
                </div>

                <div className="row">
                  <div className="ten columns">
                    <div className="right-button medium primary btn">
                      <a href="#" onClick={this.onSubmit}>Send</a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="ten columns">
                    <div className="right-button medium primary btn">
                      <a href="#" onClick={this.scanURI}>Scan</a>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="push-row-one five columns">
                    <FormFieldError message={this.state.scan_error} />
                  </div>
                </div>
              </ul>
            </form>
          </div>
        </div>
      );
    };
  }
});

module.exports = {
    AssetOption: AssetOption,
    FormFieldError: FormFieldError,
    ConfirmTransaction: ConfirmTransaction,
    SendCoreMixin: SendCoreMixin,
    Send: Send
};
