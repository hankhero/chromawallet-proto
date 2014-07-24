/** @jsx React.DOM */

var Send = React.createClass({
  render: function () {
      return (
<div className="send">
  <div className="row">
    <div className="twelve columns">
      <h2>Send</h2>
    </div>
  </div>
  <div className="row">
    <div className="four columns">
      <div className=" medium primary btn"><a href="#">Add recipient</a></div>
    </div>
  </div>

  <div className="recipient-form row">
    <fieldset>
      <div className="row">
        <div className="twelve columns">
          <legend>Send to recipient:</legend>
        </div>
      </div>
      <ul>
        <div className="row">
          <div className="two columns">
            <label className="inline" for="text1">Address:</label>
          </div>
          <div className="ten columns">          
            <li className="field">
              <input className="wide text input" id="text1" type="text" placeholder="Address" />
            </li>
          </div>
          <div className="row">
            <div className="two columns">
              <label className="inline" for="text2">Amount:</label>
            </div>
            <div className="four columns">
              <li className="field">
                <input className="narrow text input" id="text2" type="text" placeholder="Amount" />
              </li>
            </div>
            <div className="four columns">
              <li className="field">
                <div className="picker">
                  <select>
                    <option value="#" disabled>Select asset</option>
                    <option>Bitcoin</option>
                    <option>Gold-coin</option>
                    <option>Foo-coin</option>
                  </select>
                </div>
              </li>
            </div>
            <div className="two columns">
              <div className=" medium primary btn"><a href="#">Send</a></div>
            </div>
          </div>
          <div>Available balance: <span>14 bitcoins</span></div>
        </div>
      </ul>
    </fieldset>
  </div>

</div>
      );
  }
});
