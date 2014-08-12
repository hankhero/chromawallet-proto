/** @jsx React.DOM */



var Login = React.createClass({
    setErrorMessage: function (text) {
        this.setState({errorMessage: text});
    },
    getPassPhrase: function () {
        return this.state.passphrase; 
    },
    getDefaultProps: function () {
        return {
            isLoggedIn: false,
            onLoginClick: null,
            onCreateWalletClick: null
        };
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
        if (this.props.onLoginClick) {
            this.props.onLoginClick(this);
        }
        //this.setErrorMessage('Bad passphrase');
    },
    handleCreateWalletClick: function (event) {
        this.setErrorMessage('Not implemented yet.');
    },
    render: function () {
        if (this.props.isLoggedIn) {
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
            <input className="input" placeholder="Passphrase"
               type="password" value={passphrase} onChange={this.handleChange}/>
          </div>
        </form>
        <p className="btn primary medium">
          <a href="#" onClick={this.handleLoginClick} >Login</a>
        </p>
        <p className="btn primary medium">
          <a href="#" onClick={this.handleCreateWalletClick} >Create wallet</a>
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
