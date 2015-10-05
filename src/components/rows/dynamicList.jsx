/*eslint disable strict */ //Disabling check because we can't run strict mode. Need global vars.

var React = require('react');
var ReactAddons = require('react/addons');
$ = jQuery = require('jQuery');
var Row = require('./row.jsx');
var AddRowForm = require('./addRowForm.jsx');
var DDL = require('../common/dropdown.jsx');
var RowsApi = require('../../api/rowApi.jsx');
var InitializeActions = require('../../actions/initializeActions.jsx');
var RowStore = require('../../stores/rowStore.jsx');
var RowActions = require('../../actions/rowActions.jsx');

var DynamicList = React.createClass({
    getInitialState: function () {
        InitializeActions.initApp();
        return {
            rows: RowStore.getAllRows()
        };
    },
    componentWillMount: function() {
        RowStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        RowStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState({ rows: RowStore.getAllRows()});
    },
    handleRowEdited: function(row) {
        RowActions.updateRow(row);
    },
    handleRowDeleted: function(number) {
        RowActions.deleteRow(number);
    },
    addRow: function(row) {
        var maxNumber = RowStore.getMaxNumber();
        RowActions.createRow({number: maxNumber, cells: row.cells});
    },
    
    render: function () {
        var component = this;
        var cards = this.state.rows.map(function (row) {
                return ( <Row key = {row.number} value = {row} 
                    editable = {false}
                    saveRow = {component.handleRowEdited}
                    deleteRow = {component.handleRowDeleted.bind(this, row.number)}
                    />);  
                });
    
            return ( <div><AddRowForm addRow={this.addRow} />
                    <hr />
                    <table className = "table" >
                        <tbody>{cards}</tbody>
                    </table>
                    </div>
            )
        }
    });

module.exports = DynamicList;