/** @jsx React.DOM */

var React = require('react');

var models = require('models') //Aliased by browserify
    , wallet = models.wallet 
    , testnet = models.walletOptions.testnet
    , NavBar = require('./navbar')
    , Login = require('./login')
    , Send = require('./send').Send
    , Receive = require('./receive2').Receive
    , Overview = require('./overview')
    , History = require('./history')
    , Device = require('./device-detect')
    , FastClick = require('fastclick')

$(document).ready(function() {
  Device.detect();

  FastClick(document.body);

  React.initializeTouchEvents(true);
  React.renderComponent(
    <App />,
    document.getElementById('main')
  );
                      
});

/** Main application component. */
var App = React.createClass({
  getInitialState: function() {
      return {
          tabName: this.deepLinkedOrDefaultTab(),
          lastUpdate: 1234,
          wallet: wallet //Global wallet
      };
  },
  deepLinkedOrDefaultTab: function () {
      var defaultTabName = 'Overview',
      hash = window.location.hash,
          selectedTabName;
      if (hash.length > 2) {
          selectedTabName = hash.substr(1,1).toUpperCase() + hash.substr(2);
          if (this.tabs.indexOf(selectedTabName) > -1) {
              return selectedTabName;
          }
      }
      return defaultTabName;
  },
  tabs: ['Overview', 'Send', 'Receive', 'History'],
  walletWasUpdated: function () {
     this.setState({
         lastUpdate: Date.now()
     });
  },
  changeTab: function (tabName) {
      this.setState({
        tabName: tabName
      });
  },
  render: function () {
      var self = this,
      wallet = this.state.wallet,
      show = function (tabName) {
          return self.state.tabName === tabName? 'show': 'hide';
      };
      
      wallet.setCallback(function () { //TODO Find the right react place for this
          self.walletWasUpdated();
      });

      return (
          <div>
              <NavBar navigateHandler = {this.changeTab}
                      selected = {this.state.tabName}
                      tabs = {this.tabs} 
                      testnet = {testnet}
                      />
              <Login wallet={wallet} />
              <div className={show('Overview') }><Overview wallet={wallet}/></div>
              <div className={show('Receive')} ><Receive wallet={wallet} app={this}/></div>
              <div className={show('Send')} ><Send wallet={wallet} app={this}/></div>
              <div className={show('History') }><History wallet={wallet}/></div>
           </div>
      );
      //        <div className={show('Assets')} ><Assets /></div>
      //        <div className={show('Trade')} ><Trade /></div>
  }
});
