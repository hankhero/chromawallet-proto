/** @jsx React.DOM */

var AssetLabel = React.createClass({
  render: function () {
    var asset = this.props.asset;
    var available = asset.getAvailableBalance();
    var text = asset.getMoniker() + " (" + available + " available)";
    return (
      <span>{text}</span>
    );
  }
});

var Send = React.createClass({

  getInitialState: function() {
    return {
      address: '',
      ammount: 0.0,
      asset: '#'
    };
  },

  onChangeAddress: function(e) {
    this.state.address = e.target.value;
    this.setState(this.state);
  },

  onChangeAmmount: function(e) {
    this.state.ammount = e.target.value;
    this.setState(this.state);
  },

  onChangeAsset: function(e) {
    this.state.asset = e.target.value;
    this.setState(this.state);
  },

  handleSubmit: function(e) {
    e.preventDefault();

    // get input
    var ammount = parseFloat(this.state.ammount);
    var address = this.state.address;
    var asset = "";
    var assets = this.props.wallet.getAssetModels();
    for (var i = 0; i < assets.length; i++) {
      if (assets[i].getMoniker() === this.state.asset){
        asset = assets[i];
      }
    }

    // TODO input validation
    if (!asset){
      alert("TODO handel no asset selected");
    }

    // send
    var app = this.props.app;
    var payment = asset.makePayment();
    payment.addRecipeint(address, ammount, asset);
    payment.send(function () {
      app.changeTab('History');
    }) 

  },

  render: function () {
    var assets = this.props.wallet.getAssetModels();
    return (
<div className="send">
  <div className="row module-heading">
    <h2>Send</h2>
  </div>
  <div className="recipient-form row">
    <form onSubmit={this.handleSubmit}>
      <ul>

        <div className="row">
          <div className="two columns">
            <label className="inline" for="text1">Address:</label>
          </div>
          <div className="ten columns">          
            <li className="field">
              <input className="text input" type="text" placeholder="Address" 
                     onChange={this.onChangeAddress} value={this.state.address}
              />
            </li>
          </div>

          <div className="row">
            <div className="two columns">
              <label className="inline" for="text2">Amount:</label>
            </div>
            <div className="four columns">
              <li className="field">
                <input className="narrow text input" type="text" placeholder="Ammount" 
                       onChange={this.onChangeAmmount} value={this.state.amount}
                />
              </li>
            </div>
            <div className="four columns">
              <li className="field">
                <div className="picker">
                  <select onChange={this.onChangeAsset}>
                    <option value="#">Select asset</option>
                    {
                      assets.map(function (asset) {
                        return (
                          <option value={asset.getMoniker()}>
                            <AssetLabel asset={asset} />
                          </option>
                        )
                      })
                    }
                  </select>
                </div>
              </li>
            </div>
            <div className="two columns">
              <button className=" medium primary btn">Send</button>
            </div>
          </div>
        </div>
      </ul>
    </form>
  </div>
</div>
    );
  }
});

