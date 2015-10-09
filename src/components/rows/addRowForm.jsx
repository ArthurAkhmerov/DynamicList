var React = require('react');
var Cell = require('./cell.jsx');
var DDL = require('../common/dropdown.jsx');

var _ = require('lodash');

var AddRowForm = React.createClass({
    getInitialState: function() {
        return {
            columns: [
              {number:1, type:"no type", defaultValue: "0", error: ''}, 
              {number:2, type: "no type", defaultValue: "empty", error: ''},
              {number:3, type: "no type", defaultValue: "empty", error: ''}
            ],
          canAddRow: false,
          allColumnTypesAreSelected: false
        }
    },
    handleSubmit: function(e) {
      e.preventDefault();
        var cells = [];
  
        this.state.columns.forEach(function(item){
          cells.push({index: item.number, type: item.type,
                      value: item.defaultValue}); 
        });
        
      this.props.addRow({number: 102, cells: cells});
  
    },
    handleAddColumnClick: function() {
        var component = this;
        var count = component.state.columns.length+1;
        this.setState({columns: this.state.columns.concat({number:count, type: "no type", defaultValue: "empty"})});
        this.setState({allColumnTypesAreSelected: false});
        this.setState({canAddRow: false});
    },
    handleRemoveColumnClick: function() {
        var component = this;
        var index = component.state.columns.length-1;
        this.setState({
            columns: React.addons.update(this.state.columns, {$splice: [[index, 1]]})
        });
    },
    handleCellUpdated: function(number, value){
        var component = this;
        var columns = this.state.columns;
        var column = _.find(columns, {number: number});
        column.defaultValue = value;
        component.enableAddRow(true);
        column.error = '';
        if(!this.checkIsValidColumn(column)){
          column.error='Invalid value';
        }
        if(!this.checkIsValidColumns()) {
          component.enableAddRow(false);
        }
        if(!this.checkAreAllColumnsSelected()){
          component.enableAddRow(false);
        }
        
        this.setState({ columns: columns, rowChanged: true});
    },

    handleChangedColumnType: function(number, type){
        var component = this;
        var columns = this.state.columns;
        var column = _.find(columns, { number: number});
        column.type = type;
        this.setState({ columns: columns, rowChanged: true});
        this.enableAddRow(true);
        column.error = '';
        if(!this.checkIsValidColumn(column)){
          column.error='Invalid value';
        }
        if(!this.checkIsValidColumns()) {
          component.enableAddRow(false);
        }
        if(!this.checkAreAllColumnsSelected()){
          component.enableAddRow(false);
        }
    },
    checkIsValidColumns: function() {
      var component = this;
      var valid = true;
      this.state.columns.forEach(function(column, i) {
        if(!component.checkIsValidColumn(column)) {
          valid = false;
        }
      });
      return valid;
    },
    checkIsValidColumn: function(column) {
       var component = this;
        var valid = true;
        if (column.type === 'int' && (isNaN(column.defaultValue) || column.defaultValue % 1 !== 0)) {
          valid = false;
        }
        if (column.type === 'double' && isNaN(column.defaultValue)) {
          valid = false;
        }
        return valid;
    },
    checkAreAllColumnsSelected: function() {
        var valid = true
        var columns = this.state.columns;
        columns.forEach(function(item, i) {
          if(item.type === 'no type') valid = false;
        });
        return valid;
    },
    enableAddRow: function(canAddRow) {
      this.setState({canAddRow: canAddRow});  
    },
    render: function() {
      var component = this;
      var tmpColumns = this.state.columns.map(function(column){
          return (
            <div>
              <Cell editable={true} value={column.defaultValue} type={column.type} index={column.number} updateCell={component.handleCellUpdated} setDisabled={component.setSave}/>
              <DDL title='Choose type' items={["int", "double", "string"]} changeColumnType={component.handleChangedColumnType} number={column.number}/>
              <span>{column.error}</span>
            </div>
              );
      });
      return (
        <div>
          <button className="btn btn-default" onClick={this.handleAddColumnClick}>Add Column</button>
          <button className="btn btn-primary" onClick={this.handleRemoveColumnClick}>Remove Column</button>
          <form onSubmit={this.handleSubmit}>
          
            {tmpColumns}
            
            {component.addRowButton()}
          </form>
        </div>
    );
  },
  addRowButton: function() {
    return <button className="btn btn-primary" disabled={!this.state.canAddRow}>Add Row</button>
  }
});

module.exports = AddRowForm;