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
    return {tabName: 'Send'};
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
      return (
          <div>
              <NavBar navigateHandler = {this.changeTab} />
              <div className={show('Overview') }><Overview /></div>
              <div className={show('Receive')} ><Receive /></div>
              <div className={show('Send')} ><Send /></div>
              <div className={show('History') }><History /></div>
              <div className={show('Assets')} ><Assets /></div>
              <div className={show('Trade')} ><Trade /></div>
           </div>
      );
  }
});
