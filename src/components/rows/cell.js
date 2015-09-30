var React = require('react');


var Cell = React.createClass({
    getInitialState:function() {
        return  {
            value: this.props.value,
            type: this.props.type,
            error: ''
        }
    },
     handleValueChange: function(event) {
        this.setState({
            value: event.target.value
        });
         if(event.target.value == '') {
             this.setState({
                 error: 'Fill this field'
             });
         } else if((this.state.type == 'int' || this.state.type == 'double') && isNaN(event.target.value)) {
             this.setState({
                 error: 'Not a number'
             });
         } else {
              this.setState({
                 error: ''
             });
         }
         this.props.updateCell(this.props.index, event.target.value);
    },
    
    render: function() {
        var component = this;
        var errorStyle = { color: "red"};
        if (this.props.editable){
            return <td><input type="text" value={component.state.value} onChange={component.handleValueChange} /> <span style={errorStyle}>{component.state.error} </span>
                    </td>
        } else {
            return <td>{component.state.value} ({component.state.type})</td>                     
        }  
    }
});

module.exports = Cell;