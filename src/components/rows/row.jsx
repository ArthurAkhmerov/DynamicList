var React = require('react');
var Cell = require('./cell.jsx');
var _ = require('lodash');
var RowsApi = require('../../api/rowApi.jsx');

var Row = React.createClass({
  getInitialState: function() {
    return {
        errors: [],
        value: this.props.value,
        oldValue: {}, 
        editable: this.props.editable,
        rowChanged: false,
        canSave: true,
           };
  },
  componentWillMount: function() {
    // copy by value
    var value = JSON.parse(JSON.stringify(this.props.value));
    
    this.setState({
      oldValue: value});
  },
    
  handleEditClick: function() {
      this.setState({editable: !this.state.editable});
  },
  handleDeleteClick: function() {
      this.props.deleteRow();
  },
  handleSaveClick: function() {
        this.props.saveRow({number: this.props.value.number, cells: this.state.value.cells});
        var value = JSON.parse(JSON.stringify(this.props.value));
        this.setState({
          oldValue: value});
        this.setState({rowChanged: false});     
  },
  handleUndoClick: function() {
      this.setState({value: this.state.oldValue, rowChanged: false});
  },
  handleCellUpdated: function(index, value){
      var component = this;
      var cells = this.state.value.cells;
      var cell = _.find(cells, {index: index});
      cell.value = value;
      cell.error = '';
      component.enableSave(true);
      if(!this.checkIsValidCell(cell)) {
        cell.error='Invalid value';
      }
      
      if(!this.checkAreValidCells()) {
        this.enableSave(false);
      }
      
      this.setState({ value: {number: this.props.value.number, cells: cells}, rowChanged: true});
  },
  checkAreValidCells: function() {
    var component = this;
    var valid = true;
    var cells = this.state.value.cells;
    
    cells.forEach(function(cell, i) {
      if (!component.checkIsValidCell(cell))
        valid = false;
    });
    
    return valid;
  },
  checkIsValidCell: function(cell) {
      var valid = true;
      if (cell.type === 'int' && (isNaN(cell.value) || cell.value % 1 !== 0)) {
        valid = false;
      }
      if (cell.type === 'double' && isNaN(cell.value)) {
        valid = false;
      }
      
      return valid;
    
    },
  enableSave: function(canSave) {
      this.setState({canSave: canSave});
  },
  removeCell: function(cell){
    var component = this;
    
    var value = this.state.value
    var cell = _.find(value.cells, {index: cell.index});
    var index =  value.cells.indexOf(cell);
    value.cells.splice(index, 1);
    this.setState({
            value: value,
            rowChanged: true
        });
   
  },
  addCell: function() {
    var value = this.state.value;
    var index = value.cells[value.cells.length-1].index+1;
    value.cells.push({index: index, value: 'new cell', type: 'string' });
     this.setState({
      value: value,
      rowChanged: true
     });
  },
  render: function() {
     var component = this;
     var columns = this.state.value.cells.map(function(cell) {
      var isEditable = component.state.editable;
 
      return <td>
              <Cell editable={isEditable} value={cell.value} type={cell.type} index={cell.index} updateCell={component.handleCellUpdated}/>
              <button onClick={component.removeCell.bind(this, cell)}> X</button>
              <span>{cell.error}</span>
              </td>
              
        });
      return <tr> 
                <td><button onClick={component.handleEditClick} className="btn btn-warning">{component.editText()}</button></td>
                <td><button className="btn btn-danger" onClick={this.handleDeleteClick}>Delete</button></td>
                <td><button className="btn btn-success" onClick={this.addCell}>Add cell</button></td>
                <td>{component.changeButton()}</td>
                {columns}
              </tr>;
  },
  changeButton: function() {
      var component = this;
      if(component.state.rowChanged) {
          return  <span>
          <button className="btn btn-success" onClick={component.handleSaveClick} disabled={!component.state.canSave}>Save</button>
          <button className="btn btn-info" onClick={component.handleUndoClick}>Undo</button>
          </span>
      }
      
  },
  editText: function() {
      var component = this;
      if(component.state.editable) {
          return "Stop edit"
      } else {
          return "Edit"
      }
  },
});
      
module.exports = Row;
