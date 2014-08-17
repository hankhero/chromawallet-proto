/** @jsx React.DOM */

var HistoryEntryRow = React.createClass({
    render: function () {
        return (
	  <tbody>
        <tr>
          <td>{this.props.datetime}</td>
          <td>{this.props.txType}</td>
          <td>{this.props.amount}</td>
		  <td>{this.props.moniker}</td>
		</tr>
		<tr>
          <th className="history__address" scope="row" colSpan="4">
            Address: <span>CoPw4ahijciS1C@mp78983PxHDLX4BdQTSHu4nhHC7W6CEssn</span>
          </th>
        </tr>
	  </tbody>);
    }
});

var formatDateString = function(date) {
   // datetime_str = datetime.toString(QtCore.Qt.DefaultLocaleShortDate)
};

var HistoryEntry = React.createClass({
    render: function () {
        var entry = this.props.entry,
            datetime = formatDateString(entry.getDate());
        if (entry.isSend() || entry.isReceive()) {
            var targets = entry.getTargets() || [];
            return <div>{
                targets.map(function(tgt) {
                    var asset = tgt.getAsset(),
                        moniker = asset.getMoniker(), //asset.get_monikers()[0],
                        value = tgt.getValue(),//get_formatted_value
                        valuePrefix = entry.isSend() ? '-' : '+',
                        txType = '',
                        address = tgt.getAddress(),
                        amount = valuePrefix + value;
                    if (entry.isSend()) { txType = 'Send'; }
                    if (entry.isReceive()) { txType = 'Receive'; }
                    return (
                        <HistoryEntryRow
                                datetime={datetime}
                                txType={txType}
                                amount={amount}
                                moniker={moniker}
                                address={address}
                    />);
                })
            }</div>;
        } else if (entry.isTrade()) {
                // print ent.get_in_values()
                // print ent.get_out_values()
                // for val in ent.get_in_values():
                //     asset = val.get_asset()
                //     moniker = asset.get_monikers()[0]
                //     print [datetime_str, ent.txtype, 
                //                        "+" + val.get_formatted_value(),
                //                        moniker, '']
                //     self.model.addRow([datetime_str, ent.txtype, 
                //                        "+" + val.get_formatted_value(),
                //                        moniker, ''])
                // for val in ent.get_out_values():
                //     asset = val.get_asset()
                //     moniker = asset.get_monikers()[0]
                //     print [datetime_str, ent.txtype, 
                //                        "-" + val.get_formatted_value(),
                //                        moniker, '']
                //     self.model.addRow([datetime_str, ent.txtype, 
                //                        "-" + val.get_formatted_value(),
                //                        moniker, ''])
        } else {
            return (
                <HistoryEntryRow
                        datetime={datetime}
                        txType={entry.getTransactionTypeString()}
                />);
        };
    }
});

var History = React.createClass({
  render: function () {
      var entries = this.props.wallet.getHistory();
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
              {
                  entries.map(function (historyEntryModel) {

                      return <HistoryEntry entry={historyEntryModel} />;
                  })
              }
    </table>
  </div>
</div>
      );
  }
});

module.exports = History;