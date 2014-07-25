/** @jsx React.DOM */

var Overview = React.createClass({
  render: function () {
      return (

<div className="overview">
  <div className="row module-heading">
    <h2>Overview</h2>
    <div className="right-button medium primary btn"><a href="#">Update</a></div>
  </div>

  <div className="row">
    <div className="six columns">
      <h3>bitcoin</h3>
    </div>
    <div className="six columns">
      <div>Balance: <span>12.34</span></div>
      <div>Address: <span>12asdf9fnasdfasdf9rfadvcadv</span></div>
    </div>
  </div>
  <div className="row">
    <div className="six columns">
      <h3>gold-coin</h3>
    </div>
    <div className="six columns">
      <div>Balance: <span>3.20</span></div>
      <div>Address: <span>CoPw4ahijciS1C@mp78983PxHDLX4BdQTSHu4nhHC7W6CEssn</span></div>
    </div>
  </div>
</div>
      );
  }
});
