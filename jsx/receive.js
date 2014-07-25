/** @jsx React.DOM */

var Receive = React.createClass({
  render: function () {
      return (
<div className="receive">

  <div className="row module-heading">
    <h2>Receive</h2>
    <div className="right-button medium primary btn"><a href="#">New address</a></div>
  </div>

  <div className="row">
    <div className="six columns">
      <p>These are your addresses for receiving payments</p>
    </div>

    <div className="six columns">
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
		  <td className="receive__address-cell"><span className="receive__address">123jasa994ncoee9q4n&nbsp;</span><div className="small primary btn"><a href="#">Copy</a></div></td>
		  <td>10.23</td>
		</tr>
		<tr>
		  <td>Foo-coin</td>
		  <td className="receive__address-cell"><span className="receive__address">CoPw4ahijciS1C@mp78983PxHDLX4BdQTSHu4nhHC7W6CEssn&nbsp;</span><div className="small primary btn"><a href="#">Copy</a></div></td>
		  <td>1.02</td>
		</tr>
	  </tbody>
    </table>
  </div>
</div> 
      );
  }
});
