/** @jsx React.DOM */

var React = require('react');

var formatDateString = function(date) {
   // datetime_str = datetime.toString(QtCore.Qt.DefaultLocaleShortDate)
    return '' + date;
};

var HistoryEntry = React.createClass({
    renderSendOrReceive: function() {
        var entry = this.props.entry,
            datetime = formatDateString(entry.getDate()),
            targets = entry.getTargets() || [];
            return (
            <tbody>
            {
                targets.map(function(tgt) {
                    var moniker = tgt.getAssetMoniker(),
                        value = tgt.getFormattedValue(),
                        valuePrefix = entry.isSend() ? '-' : '+',
                        txType = '',
                        address = tgt.getAddress(),
                        amount = valuePrefix + value;
                    if (entry.isSend()) { txType = 'Send'; }
                    if (entry.isReceive()) { txType = 'Receive'; }
                    return [<tr>
                        <td>{datetime}</td>
                        <td>{txType}</td>
                        <td>{amount}</td>
		        <td>{moniker}</td>
		</tr>,
		<tr>
                        <th className="history__address" scope="row" colSpan="4">
                        Address: <span>{address}</span>
                        </th>
                </tr>];
                    //<HistoryEntryRow datetime={datetime} txType={txType}  amount={amount}   moniker={moniker} address={address}    />);
                })
            }
            </tbody>);
    },
    renderPaymentToYourself: function () {
        // backend doesn't give us much information about 
        // this kind of payments
        // TODO
        var entry = this.props.entry,
            datetime = formatDateString(entry.getDate());
        return (<tbody><tr>
            <td>{datetime}</td>
            <td>internal</td>
            <td></td>
	    <td></td></tr></tbody>);
    },
    render: function () {
        var entry = this.props.entry,
            datetime = formatDateString(entry.getDate());
        if (entry.isSend() || entry.isReceive()) {
            return this.renderSendOrReceive();
        } else if (entry.isPaymentToYourself()) {
            return this.renderPaymentToYourself();
        } else {
            console.log('unknown history entry');
            return <tbody />;
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
              return <HistoryEntry
                          key={historyEntryModel.getTxId()} 
                          entry={historyEntryModel} />;
          })
      }

    </table>
  </div>
</div>
      );
  }
});

module.exports = History;