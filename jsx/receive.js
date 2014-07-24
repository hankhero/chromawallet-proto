/** @jsx React.DOM */

var Receive = React.createClass({
  render: function () {
      return (
<div className="receive">

  <div className="row">
    <h2>Receive</h2>
  </div>
  <div className="row">
    <div className="six columns">
      <p>These are your addresses for receiving payments</p>
    </div>
    <div className="four columns">
      <div className="field">
        <div className="picker">
          <select id="receive-filter">
            <option value="#">Show only</option>
            <option>Bitcoin</option>
            <option>Gold-coin</option>
            <option>Foo-coin</option>
          </select>
        </div>
      </div>
    </div>
    <div className="two columns">
      <div className=" medium primary btn"><a href="#">New address</a></div>
    </div>
    
  </div>
  <div className="row">
  </div>
  <div className="row">
    <table>
	  <thead>
		<tr>
		  <th>Moniker</th>
		  <th>Address</th>
		  <th>Receive</th>
		</tr>
	  </thead>
	  <tbody>
		<tr>
		  <td>Bitcoin</td>
		  <td>123jasa994ncoee9q4n&nbsp;<div className="small primary btn"><a href="#">Copy</a></div></td>
		  <td>10.23</td>
		</tr>
		<tr>
		  <td>Foo-coin</td>
		  <td>CoPw4ahijciS1C@mp78983PxHDLX4BdQTSHu4nhHC7W6CEssn&nbsp;<div className="small primary btn"><a href="#">Copy</a></div></td>

		  <td>1.02</td>
		</tr>
	  </tbody>
    </table>
  </div>
</div> 
      );
  }
});
