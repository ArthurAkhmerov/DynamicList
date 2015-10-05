var React = require('react');
var Cell = require('./cell.jsx');
var DDL = require('../common/dropdown.jsx');

var _ = require('lodash');

var AddRowForm = React.createClass({
    getInitialState: function() {
        return {
            columns: [
              {number:1, type:"int", defaultValue: "0"}, 
              {number:2, type: "string", defaultValue: "empty"},
              {number:3, type: "string", defaultValue: "empty"}
            ],
          canAddRow: true
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
        this.setState({columns: this.state.columns.concat({number:count, type: "string", defaultValue: "empty"})});
        
    },
    handleRemoveColumnClick: function() {
        var component = this;
        var index = component.state.columns.length-1;
        this.setState({
  columns: React.addons.update(this.state.columns, {$splice: [[index, 1]]})
        
    });
    },
    handleCellUpdated: function(number, value){
        var columns = this.state.columns;
        var column = _.find(columns, {number: number});
        column.defaultValue = value;
        this.setState({ columns: columns, rowChanged: true});
    },
    handleChangedColumnType: function(number, type){
        var columns = this.state.columns;
        var column = _.find(columns, { number: number});
        column.type = type;
        this.setState({ columns: columns, rowChanged: true});
    },
    setSave: function(canAddRow) {
      this.setState({canAddRow: canAddRow});  
    },
    render: function() {
      var component = this;
      var tmpColumns = this.state.columns.map(function(column){
          return (
            <div>
              <Cell editable={true} value={column.defaultValue} type={column.type} index={column.number} updateCell={component.handleCellUpdated} setDisabled={component.setSave}/>
              <DDL title='Choose type' items={["int", "double", "string"]} changeColumnType={component.handleChangedColumnType} number={column.number}/>
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