"use strict";

var Dispatcher = require('../dispatchers/appDispatcher.jsx');
var RowApi = require('../api/rowApi.jsx');
var ActionTypes = require('../constants/actionTypes.jsx');

var RowActions = {
	createRow: function(row) {
		
		RowApi.createRow(row).then(function(data) {
				return data.json();
				
			}).then(function(json) {
				var newRow = json;
		
				Dispatcher.dispatch({
					actionType: ActionTypes.CREATE_ROW,
					row: newRow
				});
			});
	},
	
	updateRow: function(row) {
		RowApi.saveRow(row).then(function(data) {
			return data.json();
		}).then(function(json){
			var updatedRow = json;
		
			Dispatcher.dispatch({
				actionType: ActionTypes.UPDATE_ROW,
				row: updatedRow
			});
		});
		
	},
	
	deleteRow: function(number) {
		RowApi.deleteRow(number);
		
		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_ROW,
			number: number
		});
	}
};

module.exports = RowActions;