/*eslint disable strict */ //Disabling check because we can't run strict mode. Need global vars.

var React = require('react');
var ReactAddons = require('react/addons');
$ = jQuery = require('jquery');
var Row = require('./row');
var AddRowForm = require('./addRowForm');
var DDL = require('../common/dropdown');
var RowsApi = require('../../api/rowApi');

var DynamicList = React.createClass({
            getInitialState: function () {
                return {
                    rowNumbers: [],
                    cards: [],
                    currentMaxNumber: 0
                };
            },
            componentDidMount: function () {
                var component = this;
                var rowNumbers = [];
                console.log("Mount");

                var rows = RowsApi.getAllRows().then(function (data) {
                    console.log("data");
                    console.log(data.rows);

                    data.rows.forEach(function (item) {
                        rowNumbers.push(item.number);
                    });
                    component.addRowNumbers(rowNumbers);
                });
            },
            addRow: function (rowNumber, cells) {
                var component = this;
                var rowNumbers = [];

                var tmp;
                if (component.state.rowNumbers.length == 0) {
                    tmp = 1;
                } else {
                    var parseRowNumber = parseInt(component.state.rowNumbers[component.state.rowNumbers.length - 1])
                    tmp = parseRowNumber + 1;
                }

                RowsApi.createRow(tmp, cells).then(function () {
                    component.addCard(tmp, cells);
                    component.addRowNumber(tmp);
                })
            },
            addRowNumbers: function (rowNumbersToAdd) {
                this.setState({
                    rowNumbers: this.state.rowNumbers.concat(rowNumbersToAdd)
                });
            },
            addCard: function (rowNumber, cells) {
                var component = this;
                component.setState({
                    cards: this.state.cards.concat({
                        number: rowNumber,
                        cells: cells
                    })
                });
            },
            addRowNumber: function (rowNumberToAdd) {
                this.setState({
                    rowNumbers: this.state.rowNumbers.concat(rowNumberToAdd)
                });

            },
            deleteRowNumber: function (rowNumberToDelete) {
                var tmpRowNumbers = this.state.rowNumbers;
                var index = tmpRowNumbers.indexOf(rowNumberToDelete);
                tmpRowNumbers.splice(index, 1);
                this.setState({
                    rowNumbers: tmpRowNumbers
                })

            },

            render: function () {
                var component = this;
                var cards = this.state.rowNumbers.map(function (row) {
                        return ( <Row key = {row} number = {row}
                            editable = {false}
                            editRow = {component.handleRowEdited}
                            deleteRow = {component.deleteRowNumber}
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