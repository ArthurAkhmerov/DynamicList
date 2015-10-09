var React = require('react');

var Cell = React.createClass({
    getInitialState:function() {
        return  {
            type: this.props.type,
        };
    },
     handleValueChange: function(event) {
         this.props.updateCell(this.props.index, event.target.value);
    },
    
    render: function() {
        var component = this;
        var errorStyle = { color: "red"};
        if (this.props.editable){
            return <input type="text" value={component.props.value} onChange={component.handleValueChange} />  
                    
        } else {
            return <span>{component.props.value} ({component.state.type})</span>                     
        }  
    }
});

module.exports = Cell;