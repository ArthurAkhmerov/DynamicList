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
      var cells = this.state.value.cells;
      var cell = _.find(cells, {index: index});
      cell.value = value;
      this.setState({ value: {number: this.props.value.number, cells: cells}, rowChanged: true});
  },
  setSave: function(canSave) {
      this.setState({canSave: canSave});
  },
  render: function() {
     var component = this;
     var columns = this.state.value.cells.map(function(cell) {
     var isEditable = component.state.editable;
           return <Cell editable={isEditable} value={cell.value} type={cell.type} index={cell.index} updateCell={component.handleCellUpdated} setDisabled={component.setSave} />
               
        });
      return <tr> 
                <td><button onClick={component.handleEditClick} className="btn btn-warning">{component.editText()}</button></td>
                <td><button className="btn btn-danger" onClick={this.handleDeleteClick}>Delete</button></td>
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
