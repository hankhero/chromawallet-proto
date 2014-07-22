/** @jsx React.DOM */

var NavBar = React.createClass({displayName: 'NavBar',
  getInitialState: function() {
    return {selected: 'Send'};
  },
  getDefaultProps: function() {
    return {
      tabs: ['Oveview', 'Send', 'Assets',
      'Receive', 'History','Trade']
    };
  },
  handleClick: function(tabName, event) {
      console.log("Click", tabName, event);
      this.setState({selected: tabName});
    //this.setState({liked: !this.state.liked});
  },  
  componentDidMount: function () {
      var node = this.getDOMNode(),
          $node = $(node),
          $toggler = $node.find('.icon-toggle');
      $toggler.attr('gumby-trigger', '#nav1 > ul');
      Gumby.initialize(['toggles', 'switches']);
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

$(document).ready(function() {
  React.renderComponent(
    NavBar(null),
    document.getElementById('main')
  );
                      
});

