var React = require('react');

var Cell = React.createClass({
    getInitialState:function() {
        return  {
            type: this.props.type,
            error: ''
        };
    },
     handleValueChange: function(event) {
         if(event.target.value === '') {
             this.setState({
                 error: 'Field must not be empty'
             });
             this.props.setDisabled(false);
             
         } else if((this.state.type == 'int' || this.state.type == 'double') && isNaN(event.target.value)) {
             this.setState({
                 error: 'Not a number'
             });
             this.props.setDisabled(false);             
         } else {
              this.setState({
                 error: ''
             });
             this.props.setDisabled(true);
         }
         this.props.updateCell(this.props.index, event.target.value);
    },
    
    render: function() {
        var component = this;
        var errorStyle = { color: "red"};
        if (this.props.editable){
            return <td><input type="text" value={component.props.value} onChange={component.handleValueChange} /> <span style={errorStyle}>{component.state.error} </span>
                    </td>
        } else {
            return <td>{component.props.value} ({component.state.type})</td>                     
        }  
    }
});

module.exports = Cell;