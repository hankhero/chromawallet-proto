/** @jsx React.DOM */

var React = require('react');

var Trade = React.createClass({
  render: function () {
      return (
<div className="trade">
  <div className="row">
    <h2>P2P Trade</h2>
  </div>

  <div className="row">
    <div className="twelve columns">
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

    <div className="four columns">
      <fieldset>
        <legend>Buy</legend>
        <ul>
          <li className="field">
            <input className="narrow text input" id="text1" type="text" placeholder="Quantity" />
            <span>&nbsp;X&nbsp;</span>
            <input className="narrow text input" id="text2" type="text" placeholder="Price" />
          </li>
          <li className="row">
            <div className="eight columns">
              <div>Total: 123.40</div>
              <div>Available: <span>14 BTC</span></div>
            </div>
            <div className="four columns">
              <div className="medium primary btn"><a href="#">Buy</a></div>
            </div>
          </li>
        </ul>
      </fieldset>

      <table>
	    <thead>
		  <tr>
		    <th>Price</th>
		    <th>Quantity</th>
		    <th>Total</th>
		  </tr>
	    </thead>
	    <tbody>
		  <tr>
            <td>3.4</td>
            <td>10</td>
		    <td>34</td>
		  </tr>
	    </tbody>
      </table>
    </div>


    <div className="four columns">
      <fieldset>
        <legend>Sell</legend>
        <ul>
          <li className="field">
            <input className="narrow text input" id="text1" type="text" placeholder="Quantity" />
            <span>&nbsp;X&nbsp;</span>
            <input className="narrow text input" id="text2" type="text" placeholder="Price" />
          </li>
          <li className="row">
            <div className="eight columns">
              <div>Total: 123.40</div>
              <div>Available: <span>14 BTC</span></div>
            </div>
            <div className="four columns">
              <div className="medium primary btn"><a href="#">Sell</a></div>
            </div>
          </li>
        </ul>
      </fieldset>
      <table>
	    <thead>
		  <tr>
		    <th>Price</th>
		    <th>Quantity</th>
		    <th>Total</th>
		  </tr>
	    </thead>
	    <tbody>
		  <tr>
            <td>-</td>
            <td>-</td>
		    <td>-</td>
		  </tr>
	    </tbody>
      </table>

    </div>

    <div className="four columns">
      <h3>Event log</h3>
      <ul>
        <li>Create ask 10 gold-coin @4.3 BTC</li>
        <li>Create ask 8 gold-coin @2.3 BTC</li>
      </ul>
    </div>

  </div>

</div>
      );
  }
});
