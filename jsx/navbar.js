/** @jsx React.DOM */

var NavBar = React.createClass({
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
                        tab === self.state.selected ? 'active': null;
                    return <li className={activeClass}>
                      <a href="#"
                         onClick={self.handleClick.bind(self,tab)}>
                      {tab}</a></li>;
                })
            }
            </ul>
        </div>);
  }
});

$(document).ready(function() {
  React.renderComponent(
    <NavBar />,
    document.getElementById('main')
  );
                      
});

