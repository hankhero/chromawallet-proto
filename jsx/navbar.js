/** @jsx React.DOM */

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
  handleClick: function(tabName, event) {
    this.props.navigateHandler.call(this, tabName);
  },
  componentDidMount: function () {
      var node = this.getDOMNode(),
          $node = $(node),
          $toggler = $node.find('.icon-toggle');
      $toggler.attr('gumby-trigger', '#nav1 > ul');
      Gumby.initialize(['toggles', 'switches', 'navbar']);
  },
  render: function() {
    var self = this;
    return (
        <div className="row navbar metro" id="nav1">
          <a className="toggle icon-toggle" data-gumby-trigger="#nav1 > ul" href="#">
            <i className="icon-menu"></i>
          </a>
            <h1 className="two columns logo">
               <a href="#">
                <img src="img/chromawallet-logo.png" gumby-retina />
              </a>
            </h1>
            <ul className="ten columns">
            {
                this.props.tabs.map(function (tab) {
                    var activeClass = 
                        tab === self.props.selected ? 'active': null;
                    return <li className={activeClass}>
                      <a href={ '#' + tab.toLowerCase() }
                         onClick={self.handleClick.bind(self,tab)}>
                      {tab}</a></li>;
                })
            }
            </ul>
        </div>);
  }
});

module.exports = NavBar;