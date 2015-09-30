var React = require('react');
var Cell = require('./cell');
$ = jQuery = require('jquery');
var RowsApi = require('../../api/rowApi');

var Row = React.createClass({
  getInitialState: function() {
    return {
        errors: [],
        cells: [], 
        editable: this.props.editable,
        rowChanged: false
           };
  },
    
    cellsAreValid: function(){
        var component = this;
        var isValid = true;
        var errors = [];
        var cells = component.state.cells;
        
        cells.forEach(function(cell){
           if (cell.value.length < 2) {
               var error = {index: cell.index, msg: "Some error"};
                errors.push(error);
           } 
        });
        component.setState({errors: errors});
        console.log('cellsAreValid');
        console.log(errors);
        
        return errors.length == 0;
    },
    
  componentDidMount: function() {
    var component = this;
    $.get("http://localhost:22964/api/rows/" +
            this.props.number, function(data) {
                component.setState(data);
            }
        );
  },
    handleEditClick: function() {
        this.setState({editable: !this.state.editable});
        
    },
    handleDeleteClick: function() {
        var component = this;
        RowsApi.deleteRow(component.props.number)
            .then(function() {
                        component.props.deleteRow(component.props.number);
            console.log('Row deleted...-');

        })
    },
    handleSaveClick: function() {
        var component = this;
        
         RowsApi.saveRow(component.props.number, component.state.cells)
                    .then(function() {
                        component.setState({rowChanged: false});
                        console.log('Row saved.');
                });
        
        
    }
    ,
    HandleCellUpdated: function(index, value){
        var cells = this.state.cells;
        var cell = $.grep(cells, function(e) {
            return e.index == index;
        })[0];
        cell.value = value;
        this.setState({ cells: cells, rowChanged: true});
    },
        changeButton: function() {
            var component = this;
            if(component.state.rowChanged) {
          return  <button className="btn btn-success" onClick={component.handleSaveClick}>Save</button>
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
  render: function() {
         var component = this;
       var columns = this.state.cells.map(function(cell) {
        var isEditable = component.state.editable;
               
           return <Cell editable={isEditable} value={cell.value} type={cell.type} index={cell.index} updateCell={component.HandleCellUpdated} />
               
        });
      return <tr> 
                <td><button onClick={component.handleEditClick} className="btn btn-warning">{component.editText()}</button></td>
              <td><button className="btn btn-danger" onClick={this.handleDeleteClick}>Delete</button></td>
              <td>{component.changeButton()}</td>
                {columns}
                </tr>;
  },
});
      
module.exports = Row;
