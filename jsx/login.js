/** @jsx React.DOM */

var React = require('react/addons'); //With addons

var Panel = {
    getDefaultProps: function () {
        return {
            active: false
        };
    },
    nextClick: function () {
        this.props.parent.nextTab();
    },
    render: function () {
        var active = this.props.active ? ' active': '',
        classes = "tab-content" + active;
        return (
         <div className={classes}>{
             this.renderContent()
         }

         </div>
	     );
    },
    renderNextButton: function (options) {
        options = options || {};
        var onClick = options.onClick || this.nextClick;
        return (
	        <div className="row">
	          <div className="push_eight two columns">
	            <div className="medium secondary btn">
	              <a href="#" className="switch" onClick={onClick}>Next</a>
	            </div>
	          </div>
	        </div>
        );
    }
};

var WelcomePanel = React.createClass({
    mixins: [Panel],
    renderContent: function () {
        return (
          <div>
	        <div className="row">
	          <div className="ten columns centered text-center">
	            <h2>Welcome</h2>
	            <p>To a combined wallet for bitcoins and colored-coins such as gold, art and well basically anything.</p>
	            <h3>Setup and security</h3>
	            <p>We will now take you through some steps to secure your wallet. This is necessary for your own security. It does not take long.</p>
	            <p><em>It is very important!</em></p>
	            <p>(If you instead need to <a href="#" className="switch active" gumby-trigger="#restore-dialogue | #passphrase-dialogue">restore a wallet, click here</a>)</p>
	          </div>
	        </div>
            {
                this.renderNextButton()
            }
          </div>
	     );
    }
});

var MnemonicPanel = React.createClass({
    mixins: [Panel],
    renderContent: function () {
        var passphrase = this.props.passphrase;
        return (
          <div>
            <div className="row">
              <div className="ten columns centered text-center">
                <h2>Secret phrase</h2>
                <p>We have created some random words that represent the secret key to you wallet. It is very important you<em>write it down</em> and store it in a safe and secret place.</p>
<p>Please store this phrase somewhere safe and secret.</p>
                <p className="warning alert">{passphrase}</p>
              </div>
            </div>
            {
                this.renderNextButton()
            }
          </div>
	     );
    }
});

var PasswordPanel = React.createClass({
    mixins: [Panel],
    getInitialState: function () {
        return {
            password: '',
            repeat: '',
            lengthValid: false,
            mismatch: false,
            showError: false,
            everythingOk: false,
            errorMessage: ''
        };
    },
    validate: function () {
        var lengthValid = (this.state.password.length >= 8),
            mismatch = this.state.password !== this.state.repeat,
            everythingOk = (lengthValid && !mismatch),
            errorMessage = '';
        if (mismatch) {
            errorMessage = 'Passwords do not match';
        }

        if (!lengthValid) {
            errorMessage = 'Password is too short';
        }
    
        this.setState({
            lengthValid: lengthValid,
            errorMessage: errorMessage,
            everythingOk: everythingOk
        });
    },
    handlePasswordChange: function(event) {
        this.setState({password: event.target.value, showError: false});
        this.validate();
    },
    handleRepeatChange: function(event) {
        this.setState({repeat: event.target.value, showError: false});
        this.validate();
    },
    showError: function (event) {
        this.setState({showError: true});
    },
    renderContent: function () {
        var password = this.state.password,
            repeat = this.state.repeat,
            nextOptions = {
            };
        if (! this.state.everythingOk) {
            nextOptions.onClick = this.showError;            
        }
        return (
          <div>
            <div className="row">
              <div className="ten columns centered text-center">
                 <h2>Password</h2>
                 <p>The password is used every time you open your wallet.
                         It should be difficult but possible to remember.</p>
                 <form>
                   <div className="field">
                     <input className="input" value={password}
                      onChange={this.handlePasswordChange}
                       placeholder="At least eight letters."
                      type="password" />
                   </div>
          {
                    this.state.lengthValid &&
                    <div>
                       <label htmlFor="repeat-password">Please repeat the password</label>
                       <div className="field">
                         <input className="input" value={repeat}
                          onChange={this.handleRepeatChange}
                           placeholder="Please repeat the password."
                          type="password" />
                       </div>
                    </div>
    
          }
                 </form>
          {
                  this.state.showError && this.state.errorMessage &&
                    <p className="warning alert">{this.state.errorMessage}</p>
          }
    
              </div>
            </div>
          {
                this.renderNextButton(nextOptions)
          }
          </div>
        );
    }
});

var PinPanel = React.createClass({
    mixins: [Panel],
    renderContent: function () {
        return (
          <div>

            <div className="row">
              <div className="ten columns centered text-center">
                 <h2>PIN</h2>
                 <p>The PIN is a number sequence you use every time you send an asset.</p>
                 <p>Please provide a PIN-code for daily use.</p>
                 <form>
                   <div className="field">
                     <input className="input" placeholder="At least four digits." type="password" />
                   </div>
                 </form>
                 <p className="warning alert">I am an error message</p>
              </div>
            </div>

            {
                this.renderNextButton()
            }
          </div>
        );
    }
});


var Login = React.createClass({
    setErrorMessage: function (text) {
        this.setState({errorMessage: text});
    },
    getPassPhrase: function () {
        return this.state.passphrase; 
    },
    getInitialState: function () {
        var generatedPassphrase = this.props.wallet && this.props.wallet.generateMnemonic();
        return {
            activeTab: 'welcome',
            passphrase: generatedPassphrase,
            initializing: false,
            errorMessage: null
        };
    },
    handleChange: function(event) {
        this.setState({
            initializing: false,
            errorMessage: null
        });
    },
    handleLoginClick: function (event) {
        self = this;
        self.setState({
            initializing: true,
            passphrase: self.getPassPhrase(),
            errorMessage: null
        });
        setTimeout(
            function () { 
                self.props.wallet.initialize(self.getPassPhrase(), 'nothing');
                self.setState({
                    initializing: false,
                    passphrase: self.getPassPhrase(),
                    errorMessage: null
                });
            },
            100 // allow component to update
        );
    },
    handleCreateWalletClick: function (event) {
        this.setState({
            initializing: false,
            passphrase: this.props.wallet.generateMnemonic(),
            errorMessage: null
        });
    },
    tabNames: ['welcome','mnemonic', 'password','pin'],
    nextTab: function () {
        var i = this.tabNames.indexOf(this.state.activeTab);
        i = i + 1;
        if (i >= this.tabNames.length) {
            i = 0;
        }
        this.setState({activeTab: this.tabNames[i]});
    },
    render: function () {
        if (this.state.initializing) {
            return (
                    <div className="modal active" id="login-dialogue">
                    <div className="content">
                    <div className="row">
                    <div className="ten columns centered text-center">
                    <h2>Initializing Wallet ...</h2>
                    </div>
                    </div>
                    </div>
                    </div>
            );
// TEMP REMOVED
//        } else if (this.props.wallet.isInitialized()) {
//            return <div/>;
        } else {
            var passphrase = this.getPassPhrase(),
                errorMessage = this.state.errorMessage,
                warningClasses = errorMessage ? 'warning alert': '',
                tabNames = this.tabNames,
                activeTab = this.state.activeTab,
                self = this;
            return (
                <div className="modal active" id="passphrase-dialogue">
                  <div className="content">
                    <section className="pill tabs">
                      <ul className="tab-nav">
                      {
                          tabNames.map(function (tab, i) {
                              var cx = React.addons.classSet,
                              c = {
                                  active: tab === activeTab
                              },
                              changeTab = function () {
                                  self.setState({activeTab:tab});
                              }
                              c['tab-' + tab] = true;
                              return (
                                  <li className={cx(c)}><a href="#"
                                      onClick={changeTab}
                                  >{i}</a></li>
                              );
                          })
                      }
                      </ul>
                      <WelcomePanel parent={self} active={activeTab === tabNames[0]} />
                      <MnemonicPanel parent={self}
                          passphrase={passphrase}
                          active={activeTab === tabNames[1]} />
                      <PasswordPanel parent={self} active={activeTab === tabNames[2]} />
                      <PinPanel parent={self} active={activeTab === tabNames[3]} />
                    </section>

                  </div>
                </div>
            );     
        }
    }
});




var OLDOLDOLDOLDLogin = React.createClass({
          setErrorMessage: function (text) {
              this.setState({errorMessage: text});
          },
          getPassPhrase: function () {
              return this.state.passphrase; 
          },
          getInitialState: function () {
              return {
                  initializing: false,
                  passphrase: '',
                  errorMessage: null
              };
          },
          handleChange: function(event) {
              this.setState({
                  initializing: false,
                  passphrase: event.target.value,
                  errorMessage: null
              });
          },
          handleLoginClick: function (event) {
              self = this
              self.setState({
                  initializing: true,
                  passphrase: self.getPassPhrase(),
                  errorMessage: null
              });
              setTimeout(
                  function () { 
                      self.props.wallet.initialize(self.getPassPhrase(), 'nothing');
                      self.setState({
                          initializing: false,
                          passphrase: self.getPassPhrase(),
                          errorMessage: null
                      });
                  }, 
                  100 // allow component to update
              );
          },
          handleCreateWalletClick: function (event) {
              this.setState({
                  initializing: false,
                  passphrase: this.props.wallet.generateMnemonic(),
                  errorMessage: null
              });
          },
          render: function () {
              if (this.state.initializing) {
            return (
      <div className="modal active" id="login-dialogue">
        <div className="content">
          <div className="row">
            <div className="ten columns centered text-center">
              <h2>Initializing Wallet ...</h2>
            </div>
          </div>
        </div>
      </div>
            );
              } else if (this.props.wallet.isInitialized()) {
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

module.exports = OLDOLDOLDOLDLogin;
