/** @jsx React.DOM */

$(document).ready(function() {
  React.renderComponent(
    <App />,
    document.getElementById('main')
  );
                      
});

/** Main application component. */
var App = React.createClass({
  getInitialState: function() {
      return {
          tabName: 'Overview',
          lastUpdate: 1234
      };
  },
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
      show = function (tabName) {
          return self.state.tabName === tabName? 'show': 'hide';
      };
      
      wallet.setCallback(function () { //TODO Find the right react place for this
          self.walletWasUpdated();
      });

      return (
          <div>
              <NavBar navigateHandler = {this.changeTab} 
                  tabs = {['Overview', 'Send',
                          'Receive', 'History']} />
              <div className={show('Overview') }><Overview wallet={wallet}/></div>
              <div className={show('Receive')} ><Receive /></div>
              <div className={show('Send')} ><Send /></div>
              <div className={show('History') }><History /></div>
           </div>
      );
      //        <div className={show('Assets')} ><Assets /></div>
      //        <div className={show('Trade')} ><Trade /></div>

  }
});
