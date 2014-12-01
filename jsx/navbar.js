/** @jsx React.DOM */

var React = require('react');

var NavBar = React.createClass({
  getDefaultProps: function() {
    return {
      tabs: ['Overview', 'Send', 'Assets',
      'Receive', 'History','Trade'],
      selected: 'Overview',
      navigateHandler: function (tabName) {
          console.log('Default navigate handler, please override');
      }
    };
  },
  getInitialState: function () {
    return { active: false };
  },
  handleClick: function(tabName, event) {
    this.setState({active: false});
    this.props.navigateHandler.call(this, tabName);
  },
  toggle: function (evt) {
    evt.preventDefault();
    this.setState({active: ! this.state.active});
  },
  render: function() {
    var self = this
      , active = this.state.active ? ' active' : ''
      , toggleIconClasses = 'toggle icon-toggle ' + active
      , ulClasses = 'ten columns ' + active
    return (
        <div className="row navbar metro">
          <a className={toggleIconClasses} onClick={this.toggle} href="#">
            <i className="icon-menu"></i>
          </a>
            <h1 className="two columns logo">
               <a href="#">
                <img src="img/chromawallet-logo.png" gumby-retina />
              </a>
              {
                  this.props.testnet && <p className="testnet-message">TESTNET</p>
              }
            </h1>
            <ul className={ulClasses}>
            {
                this.props.tabs.map(function (tab) {
                    var activeClass = 
                        tab === self.props.selected ? 'active': null,
                        clickHandler = self.handleClick.bind(self,tab);
                    return <li key={tab} className={activeClass}>
                      <a href={ '#' + tab.toLowerCase() }
                          onClick={clickHandler}>
                      {tab}</a></li>;
                })
            }
            </ul>
        </div>);
  }
});

module.exports = NavBar;