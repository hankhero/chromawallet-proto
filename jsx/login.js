/** @jsx React.DOM */

var React = require('react/addons'); //With addons
var store = require('store');

var NextButton = React.createClass({
    //Props = onClick
    render: function () {
        var onClick = this.props.onClick;
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
});

var Panel = {
    getDefaultProps: function () {
        return {
            active: false
        };
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
	            <p>(If you instead need to <a href="#" className="switch active" onClick={this.props.recoverClick}>recover a wallet, click here</a>)</p>
	          </div>
	        </div>
            <NextButton onClick={this.props.nextClick} />
          </div>
	     );
    }
});



var MnemonicPanel = React.createClass({
    mixins: [Panel],
    renderContent: function () {
        var mnemonic = this.props.mnemonic;
        return (
          <div>
            <div className="row">
              <div className="ten columns centered text-center">
                <h2>Secret phrase</h2>
                <p>We have created some random words that represent the secret key to you wallet. It is very important you<em>write it down</em> and store it in a safe and secret place.</p>
<p>Please store this phrase somewhere safe and secret.</p>
                <p className="warning alert">{mnemonic}</p>
              </div>
            </div>
            <NextButton onClick={this.props.nextClick} />
          </div>
	     );
    }
});



var makeSecretValidatorForm = function (options) {
    var form = {},
        prefix = options.prefix;

    form.stateChangeCallback = options.stateChangeCallback;
    form.minLength = options.minLength;
    form.maxLength = options.maxLength;


    form.lengthValid = false;
    form.errorMessage = '';
    form.everythingOk = false;

    form.validate = function () {
        var secret = form.secret,
            repeat = form.repeat,
            lengthValid = (secret.length >= form.minLength),
            lengthTooLong = (secret.length > form.maxLength),
            mismatch = secret !== repeat,
            valueError = form.secretErrorCheck(secret),
            everythingOk = (lengthValid && !mismatch && 
                            !valueError && !lengthTooLong),
            errorMessage = '';
    
        if (mismatch) {
            errorMessage = prefix + 's do not match';
        }
    
        if (!lengthValid) {
            errorMessage = prefix + ' is too short';
        }

        if (lengthTooLong) {
            errorMessage = prefix + ' is too long (max ' + form.maxLength + ')';
        }

        if (valueError) {
            errorMessage = valueError;
        }

        form.lengthValid = lengthValid;
        form.errorMessage = errorMessage;
        form.everythingOk = everythingOk;
    };
    
    form.secretErrorCheck = options.secretErrorCheck || function (secret) {
        //Override and return an error message 
        return false;
    };
    
    form.handleSecretChange= function (event) {
        form.secret = event.target.value;
        form.showError = false;
        form.validate();
        form.stateChangeCallback(form);
    };
    
    
    form.handleRepeatChange = function (event) {
        form.repeat = event.target.value;
        form.showError = false;
        form.validate();
        form.stateChangeCallback(form);
    };
    
    // When you click on the Next button, error messages are show
    form.clickValidateHandler = function (event) {
        form.showError = true;
        form.stateChangeCallback(form);
    };
    return form;
};



var PinPanel = React.createClass({
    mixins: [Panel],
    renderContent: function () {
        var form = this.props.form,
            handleSecretChange = form.handleSecretChange,
            handleRepeatChange = form.handleRepeatChange,
            clickValidateHandler = form.clickValidateHandler,
            secret = form.secret,
            repeat = form.repeat,
            everythingOk = form.everythingOk,
            lengthValid = form.lengthValid,
            errorMessage = form.errorMessage,
            showError = form.showError,
            nextClick = this.props.nextClick;
        if (! everythingOk) {
            nextClick = clickValidateHandler;            
        }
        return (
          <div>
            <div className="row">
              <div className="ten columns centered text-center">
                 <h2>PIN</h2>
                 <p>The PIN is a number sequence you use every time you send an asset.</p>
                 <p>Please provide a PIN-code for daily use.</p>
                 <form>
                   <div className="field">
                     <input className="input" value={secret}
                      onChange={handleSecretChange}
                       placeholder="At least four digits."
                      type="password" />
                   </div>
          {
                    lengthValid &&
                    <div>
                       <label htmlFor="repeat-password">Please repeat the PIN-code</label>
                       <div className="field">
                         <input className="input" value={repeat}
                          onChange={handleRepeatChange}
                           placeholder="Please repeat the PIN-code."
                          type="password" />
                       </div>
                    </div>
    
          }
                 </form>
          {
                  showError && errorMessage &&
                    <p className="warning alert">{errorMessage}</p>
          }
    
              </div>
            </div>
             <NextButton onClick={nextClick} />
          </div>
        );
    }
});

var PasswordPanel = React.createClass({
    mixins: [Panel],
    renderContent: function () {
        var form = this.props.form,
            handleSecretChange = form.handleSecretChange,
            handleRepeatChange = form.handleRepeatChange,
            clickValidateHandler = form.clickValidateHandler,
            secret = form.secret,
            repeat = form.repeat,
            everythingOk = form.everythingOk,
            lengthValid = form.lengthValid,
            errorMessage = form.errorMessage,
            showError = form.showError,
            
            nextClick = this.props.nextClick;

        if (! everythingOk) {
            nextClick = clickValidateHandler;
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
                     <input className="input" value={secret}
                      onChange={handleSecretChange}
                       placeholder="At least eight letters."
                      type="password" />
                   </div>
          {
                    lengthValid &&
                    <div>
                       <label htmlFor="repeat-password">Please repeat the password</label>
                       <div className="field">
                         <input className="input" value={repeat}
                          onChange={handleRepeatChange}
                           placeholder="Please repeat the password."
                          type="password" />
                       </div>
                    </div>
    
          }
                 </form>
          {
                  showError && errorMessage &&
                    <p className="warning alert">{errorMessage}</p>
          }
    
              </div>
            </div>
            <NextButton onClick={nextClick} />
          </div>
        );
    }
});

var RecoverWelcomePanel = React.createClass({
    mixins: [Panel],
    renderContent: function () {
        return (
          <div>
	        <div className="row">
	          <div className="ten columns centered text-center">
            <h2>Restore wallet</h2>
            <p>If you have your mnemonic and password this is not difficult.</p>
            <p>(If you instead need to <a href="#" className="switch active" gumby-trigger="#mnemonic-dialogue | #recover-dialogue">create a wallet, click here</a>)</p>
	          </div>
	        </div>
            <NextButton onClick={this.props.nextClick} />
          </div>
	     );
    }
});


var RecoverMnemonicPanel = React.createClass({
    mixins: [Panel],
    renderContent: function () {
        var mnemonic = this.props.mnemonic,
            change = this.props.onChange;
        return (
          <div>
            <div className="row">
              <div className="ten columns centered text-center">
                <h2>Secret phrase</h2>
                <p>Please enter the words of your secret phrase that you wrote down when you created your wallet.</p>
                <form>
                  <div className="field">
                    <textarea className="mnemonic-textarea"
                            placeholder="Enter the phrase here"
                            value={mnemonic}
                            onChange={change} />
                  </div>
                </form>
              </div>
            </div>
            <NextButton onClick={this.props.nextClick} />
          </div>
	     );
    }
});


var Login = React.createClass({
    getInitialState: function () {
        var self = this,
            wallet = this.props.wallet,
            mnemonic = store.get('cwp_mnemonic'),
            reseeding = !!mnemonic && wallet.canResetSeed(),

            passwordForm = makeSecretValidatorForm({
                prefix: 'Password',
                stateChangeCallback: function (form) {
                    self.setState({passwordForm: form});
                },
                minLength: 8,
                maxLength: 100
            }),

            pinForm = makeSecretValidatorForm({
                prefix: 'PIN-code',
                stateChangeCallback: function (form) {
                    self.setState({pinForm: form});
                },
                minLength: 4,
                maxLength: 10,
                secretErrorCheck: function (secret) {
                    var onlyDigits = /^[0-9]+$/.test(secret);
                    if (! onlyDigits) {
                        return 'Only digits allowed for PIN-code';
                    }
                }
            });

        return {
            activeTab: reseeding ? 'password' : 'welcome',
            mnemonic: reseeding ? mnemonic : wallet.generateMnemonic(),
            passwordForm: passwordForm,
            pinForm: pinForm,
            verifyMnemonicMode: false,
            showVerifyError: false,
            reseeding: reseeding,
            loading: false
        };
    },
    getMnemonic: function () {
        return this.state.mnemonic; 
    },
    validateWizard: function () {
        if (this.state.passwordForm.everythingOk && 
            this.state.pinForm.everythingOk) {
            this.setState({verifyMnemonicMode: true});
        }
    },
    handleVerifyChange: function (event) {
        this.setState({
            verifyValue: event.target.value,
            showVerifyError: false
        });
    },
    hardRestart: function () {
        this.setState(this.getInitialState());
    },
    startInitializeWallet: function () {
        var self = this,
            mnemonic = this.getMnemonic(),
            password = this.state.passwordForm.secret,
            pin = this.state.pinForm.secret;
        this.setState({
            loading: true,
            verifyMnemonicMode: false,
            errorMessage: null
        }, function () {
            try {
                if (this.state.reseeding){
                  self.props.wallet.setSeed(mnemonic, password);
                  self.props.wallet.setPin(pin);
                } else {
                  self.props.wallet.initialize(mnemonic, password);
                  self.props.wallet.setPin(pin);
                  store.set('cwp_mnemonic', mnemonic);
                }
                self.setState({ loading: false }); // FIXME someone fucked up async loading
            } catch (e) {
                alert('Could not initialize wallet. This is not supposed to happen. Restarting, sorry');
                self.hardRestart();
            }
        });
    },
    clickValidateVerify: function (event) {
        var thirdWord = this.getMnemonic().split(' ')[2];
        if (this.state.verifyValue === thirdWord) {
            this.startInitializeWallet();
        } else {
            this.setState({showVerifyError: true});
        }
    },
    tabNames: ['welcome','mnemonic', 'password','pin'],
    nextTab: function () {
        var i = this.tabNames.indexOf(this.state.activeTab);
        i = i + 1;
        if (i >= this.tabNames.length) {
            i = 0;
        }
        this.setState({activeTab: this.tabNames[i]});
        this.validateWizard();
    },
    recoverClick: function () {
        alert("TODO, not implemented yet");
    },
    render: function () {
        if (this.props.wallet.isInitialized()) {
            return <div/>;
        } else {
            var renderfunc = this.renderWizard;
            if (this.state.loading) {
                renderfunc = this.renderLoading;
            }
            if (this.state.verifyMnemonicMode) {
                renderfunc = this.renderVerify;
            }
            return (
                <div className="modal active" id="mnemonic-dialogue">
                  <div className="content">
                    { renderfunc() }
                  </div>
                </div>
            );     
        }
    },
    renderLoading: function () {
        return (
          <div className="row">
             <div className="ten columns centered text-center">
                <h2>Loading Wallet ...</h2>
             </div>
          </div>
        );
    },
    renderVerify: function () {
        var value = this.state.verifyValue,
            handleVerifyChange = this.handleVerifyChange,
            showError = this.state.showVerifyError,
            errorMessage = 'Wrong word';
        return (
          <div>
            <div className="row">
              <div className="ten columns centered text-center">
                 <h2>Verify mnemonic</h2>
                 <p>Please verify that you wrote down the mnemonic earlier.</p>
                 <p>As explained, it is cruical that this information is saved.</p>
                 <p>Please write the third word in the mnemonic:</p>
                 <form>
                   <div className="field">
                     <input className="input" value={value}
                      onChange={handleVerifyChange}
                       placeholder="The third word of the mnemonic"
                      type="text" />
                   </div>
                 </form>
          {
                  showError && errorMessage &&
                    <p className="warning alert">{errorMessage}</p>
          }
              </div>
            </div>
            <NextButton onClick={this.clickValidateVerify} />

            <div className="row push-row-three">
                <p>(If you never wrote it down,  <a href="#" className="active" onClick={this.hardRestart}>click here to restart</a>)</p>
            </div>
          </div>
        );
    },
    renderWizard: function () {
        var mnemonic = this.getMnemonic(),
        errorMessage = this.state.errorMessage,
        warningClasses = errorMessage ? 'warning alert': '',
        tabNames = this.tabNames,
        activeTab = this.state.activeTab,
        self = this;
        return (
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
                      };
                      c['tab-' + tab] = true;
                      return (
                          <li className={cx(c)}><a href="#"
                              onClick={changeTab}
                          >{i}</a></li>
                      );
                  })
              }
              </ul>
              <WelcomePanel nextClick={this.nextTab} recoverClick={this.recoverClick} active = {activeTab === tabNames[0]} />
              <MnemonicPanel nextClick={this.nextTab}
                  mnemonic = {mnemonic}
                  active = {activeTab === tabNames[1]} />
              <PasswordPanel nextClick={this.nextTab}
                  form = {this.state.passwordForm}
                  active = {activeTab === tabNames[2]} />
              <PinPanel nextClick={this.nextTab}
                  form = {this.state.pinForm}
                  active = {activeTab === tabNames[3]} />
            </section>
        );
    }
});

module.exports = Login;
