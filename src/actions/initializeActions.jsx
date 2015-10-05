"use strict";

var Dispatcher = require('../dispatchers/appDispatcher.jsx');
var ActionTypes = require('../constants/actionTypes.jsx');
var RowApi = require('../api/rowApi.jsx');

var InitializeActions = {
	initApp: function() {
		var tmpRows = [];
		RowApi.getAllRows().then(function (data) {
			data.rows.forEach(function (row) {
				tmpRows.push(row);
			});
			
			Dispatcher.dispatch({
				actionType: ActionTypes.INITIALIZE,
				initialData: {
					rows: tmpRows
				}
			});
		});
	}
}

module.exports = InitializeActions;