var React = require('react');
$ = jQuery = require('jquery');
var Cell = require('./cell');
var DDL = require('../common/dropdown');

var AddRowForm = React.createClass({
    getInitialState: function() {
        return {
            columns: [
            {number:1, type:"int", defaultValue: "0"}, 
            {number:2, type: "string", defaultValue: "empty"},
            {number:3, type: "string", defaultValue: "empty"}
        ]}
    },
    
    
  handleSubmit: function(e) {
    e.preventDefault();
      var rowNumberInput = document.getElementById("rowNumber");
      var cells = [];
      var counter = 1;
      
      var columns = this.state.columns;

      columns.forEach(function(item){
         cells.push({index: item.number, type: item.type,
                    value: item.defaultValue}); 
      });
      
    this.props.addRow(102, cells);

  },
    handleAddColumnClick: function() {
        var component = this;
        var count = component.state.columns.length+1;
      console.log('handleAddColumnClick');
        this.setState({columns: this.state.columns.concat({number:count, type: "string", defaultValue: "empty"})});
        
    },
    handleRemoveColumnClick: function() {
        var component = this;
      console.log('handleRemoveColumnClick');
        var index = component.state.columns.length-1;
        this.setState({
  columns: React.addons.update(this.state.columns, {$splice: [[index, 1]]})
        
    });
    },
    HandleCellUpdated: function(number, value){
        var columns = this.state.columns;
        var column = $.grep(columns, function(e) {
            return e.number == number;
        })[0];
        column.defaultValue = value;
        this.setState({ columns: columns, rowChanged: true});
    },
    HandleCellUpdated2: function(number, type){
        console.log(number + ':' + type)
        var columns = this.state.columns;
        var column = $.grep(columns, function(e) {
            return e.number == number;
        })[0];
        column.type = type;
        this.setState({ columns: columns, rowChanged: true});
    },
  render: function() {
      var component = this;
      var tmpColumns = this.state.columns.map(function(column){
          return (
            <div>
              <Cell editable={true} value={column.defaultValue} type={column.type} index={column.number} updateCell={component.HandleCellUpdated} />
              <DDL title='Choose type' items={["int", "double", "string"]} changeColumnType={component.HandleCellUpdated2} number={column.number}/>
              </div>
              )
      })
    return (
        <div>
        <button className="btn btn-default" onClick={this.handleAddColumnClick}>Add Column</button>
        <button className="btn btn-primary" onClick={this.handleRemoveColumnClick}>Remove Column</button>
      <form onSubmit={this.handleSubmit}>
        
        {tmpColumns}
          
        <button className="btn btn-primary">Add Row</button>
      </form>
        </div>
    );
  }
});

module.exports = AddRowForm;