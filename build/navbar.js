/** @jsx React.DOM */

var NavBar = React.createClass({displayName: 'NavBar',
  getInitialState: function() {
    return {selected: 'Overview'};
  },
  getDefaultProps: function() {
    return {
      tabs: ['Overview', 'Send', 'Assets',
      'Receive', 'History','Trade'],
      navigateHandler: function (tabName) {
          console.log('Default navigate handler, please override');
      }
    };
  },
  handleClick: function(tabName, event) {
    console.log("Click", tabName, event);
    console.log(this.props);
    this.props.navigateHandler.call(this, tabName);
    this.setTab(tabName);
  },
  setTab: function (tabName) {
      this.setState({selected: tabName});      
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
        React.DOM.div({className: "row navbar metro", id: "nav1"}, 
          React.DOM.a({className: "toggle icon-toggle", 'data-gumby-trigger': "#nav1 > ul", href: "#"}, 
            React.DOM.i({className: "icon-menu"})
          ), 
            React.DOM.h1({className: "two columns logo"}, 
               React.DOM.a({href: "#"}, 
                React.DOM.img({src: "img/chromawallet-logo.png", 'gumby-retina': true})
              )
            ), 
            React.DOM.ul({className: "ten columns"}, 
            
                this.props.tabs.map(function (tab) {
                    var activeClass = 
                        tab === self.state.selected ? 'active': null;
                    return React.DOM.li({className: activeClass}, 
                      React.DOM.a({href: "#", 
                         onClick: self.handleClick.bind(self,tab)}, 
                      tab));
                })
            
            )
        ));
  }
});
