/** @jsx React.DOM */

var History = React.createClass({
  render: function () {
      return (
<div className="history">
  <div className="row">
    <h2>History</h2>
  </div>
  <div className="row history-small">
    <table>
	  <thead>
		<tr>
		  <th>Time</th>
		  <th>
              <span className="non-desktop">Op</span>
              <span className="desktop">Operation</span>
          </th>
		  <th>
              <span className="non-desktop">Amt.</span>
              <span className="desktop">Amount</span>
          </th>
		  <th>Asset</th>
		</tr>
	  </thead>
	  <tbody>
		<tr>
          <td>2014-07-19 13:52</td>
          <td>Sell</td>
          <td>10</td>
		  <td>Bitcoin</td>
		</tr>
		<tr>
          <th className="history__address" scope="row" colSpan="4">
            Address: <span>123jasa994ncoee9q4n</span>
          </th>
        </tr>
	  </tbody>
	  <tbody>
        <tr>
          <td>2014-07-19 13:52</td>
          <td>Buy</td>
          <td>3.50</td>
		  <td>Foo-coin</td>
		</tr>
		<tr>
          <th className="history__address" scope="row" colSpan="4">
            Address: <span>CoPw4ahijciS1C@mp78983PxHDLX4BdQTSHu4nhHC7W6CEssn</span>
          </th>
        </tr>

	  </tbody>
    </table>
  </div>
</div>
      );
  }
});
