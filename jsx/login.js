/** @jsx React.DOM */

var React = require('react');

var Login = React.createClass({
    setErrorMessage: function (text) {
        this.setState({errorMessage: text});
    },
    getPassPhrase: function () {
        return this.state.passphrase; 
    },
    getInitialState: function () {
        return {
            passphrase: '',
            errorMessage: null
        };
    },
    handleChange: function(event) {
        this.setState({
            passphrase: event.target.value,
            errorMessage: null
        });
    },
    handleLoginClick: function (event) {
        this.props.wallet.initialize(this.getPassPhrase(), 'nothing');
    },
    handleCreateWalletClick: function (event) {
        this.setState({
                passphrase: this.props.wallet.generateMnemonic(),
                errorMessage: null
        });
    },
    render: function () {
        if (this.props.wallet.isInitialized()) {
            return <div/>;
        } else {
            var passphrase = this.getPassPhrase(),
            errorMessage = this.state.errorMessage,
            warningClasses = errorMessage ? 'warning alert': '';
      return (

<div className="modal active" id="login-dialogue">
  <div className="content">
    <div className="row">
      <div className="ten columns centered text-center">
        <h2>Login</h2>
        <p>Enter your passphrase to login or a new one to create a wallet.</p>

        <form>
          <div className="field">
            <input className="input" placeholder="Mnemonic"
               type="text" value={passphrase} onChange={this.handleChange}/>
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