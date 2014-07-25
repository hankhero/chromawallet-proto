/** @jsx React.DOM */

var Assets = React.createClass({
  render: function () {
      return (
<div className="assets">
  <div className="row module-heading">
    <h2>Assets</h2>
    <div className="right-button">
      <div className=" medium primary btn">
        <a href="#">Issue<span className="desktop"> new</span></a></div>
      <div className=" medium primary btn">
        <a href="#">Add<span className="desktop"> existing</span></a></div>
      <div className=" medium primary btn"><a href="#">Import<span className="desktop"> JSON</span></a></div>
    </div>
  </div>
  <div className="row">
    <table>
	  <thead>
		<tr>
		  <th>Moniker</th>
		  <th>Color set</th>
		  <th>Unit</th>
		</tr>
	  </thead>
	  <tbody>
		<tr>
		  <td>Bitcoin</td>
		  <td></td>
		  <td>100000</td>
		</tr>
		<tr>
		  <td>Gold-coin</td>
		  <td></td>
		  <td>100</td>
		</tr>
	  </tbody>
    </table>    
  </div>  
</div>

      );
  }
});
