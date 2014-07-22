/** @jsx React.DOM */

var HelloWorld = React.createClass({displayName: 'HelloWorld',
  render: function() {
    return (
      React.DOM.p(null, 
        "Hello, ", React.DOM.input({type: "text", placeholder: "Your name here"}), "!" + ' ' +
        "It is ", this.props.date.toTimeString()
      )
    );
  }
});

setInterval(function() {
  React.renderComponent(
    HelloWorld({date: new Date()}),
    document.getElementById('example')
  );
}, 500);