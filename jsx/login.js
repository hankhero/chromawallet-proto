/** @jsx React.DOM */

var React = require('react');
var store = require('store')

var Login = React.createClass({
    setErrorMessage: function (text) {
        this.setState({errorMessage: text});
    },
    getMnemonic: function () {
        return this.state.mnemonic; 
    },
    getInitialState: function () {
        return {
            loading: false,
            mnemonic: store.get('cwp_mnemonic'),
            errorMessage: null
        };
    },
    handleChange: function(event) {
        this.setState({
            loading: false,
            mnemonic: event.target.value,
            errorMessage: null
        });
    },
    handleLoginClick: function (event) {
        self = this
        var password = 'nothing';  // FIXME get password
        var mnemonic = self.getMnemonic();
        self.setState({
            loading: true,
            mnemonic: mnemonic,
            errorMessage: null
        });

        // just set seed 
        if (self.props.wallet.isInitialized()){
            setTimeout(
                function () { 
                    // FIXME handle wrong seed
                    self.props.wallet.setSeed(mnemonic, password);
                    self.setState({
                        loading: false,
                        mnemonic: mnemonic,
                        errorMessage: null
                    });
                }, 
                100 // allow component to update
            );
        } 
        
        // initialize
        else {
            setTimeout(
                function () { 
                    self.props.wallet.initialize(mnemonic, password);
                    store.set('cwp_mnemonic', mnemonic)
                    self.setState({
                        loading: false,
                        mnemonic: mnemonic,
                        errorMessage: null
                    });
                }, 
                100 // allow component to update
            );
        }

    },
    handleCreateWalletClick: function (event) {
        // FIXME what if initialized with old mnemonic?
        this.setState({
            loading: false,
            mnemonic: this.props.wallet.generateMnemonic(),
            errorMessage: null
        });
    },
    render: function () {
        var wallet = this.props.wallet;
        if (this.state.loading) {
      return (
<div className="modal active" id="login-dialogue">
  <div className="content">
    <div className="row">
      <div className="ten columns centered text-center">
        <h2>Loading ...</h2>
      </div>
    </div>
  </div>
</div>
      );
        } else if (wallet.isInitialized() && wallet.hasSeed()) {
            return <div/>;
        } else {
            var mnemonic = this.getMnemonic(),
            errorMessage = this.state.errorMessage,
            warningClasses = errorMessage ? 'warning alert': '';
            return (
<div className="modal active" id="login-dialogue">
  <div className="content">
    <div className="row">
      <div className="ten columns centered text-center">
        <h2>Login</h2>
        <p>Enter your mnemonic to login or a new one to create a wallet.</p>
        <form>
          <div className="field">
            <input className="input" placeholder="Mnemonic"
               type="text" value={mnemonic} onChange={this.handleChange}/>
          </div>
        </form>
        <p className="btn primary medium">
          <button onClick={this.handleLoginClick} >Login</button>
        </p>
        <p className="btn primary medium">
          <button onClick={this.handleCreateWalletClick} >Create wallet</button>
        </p>
        <p/>
        <p className={warningClasses}>{errorMessage}</p>
      </div>
    </div>
  </div>
</div>
            );
        }
  }
});

module.exports = Login;
