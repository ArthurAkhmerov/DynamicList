"use strict";

var Dispatcher = require('../dispatchers/appDispatcher.jsx');
var ActionTypes = require('../constants/actionTypes.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _rows = [];

var RowStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	getAllRows: function() {
		return _rows;
	},
	getRowByNumber: function(number) {
		return _.find(_rows, {number: number});
	},
	getMaxNumber: function() {
		if(_rows.length === 0)
			return 1;
		
		return parseInt(_rows[_rows.length-1].number)+1;
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_rows = action.initialData.rows;
			RowStore.emitChange();
			break;
		case ActionTypes.CREATE_ROW:
			_rows.push(action.row);
			RowStore.emitChange();
			break;
		case ActionTypes.UPDATE_ROW:
			var existingRow = _.find(_rows, {number: action.row.number});
			var existingRowIndex = _.find(_rows, existingRow);
			_rows.splice(existingRowIndex, 1, action.row);
			RowStore.emitChange();
			
			break;
		case ActionTypes.DELETE_ROW:
			_.remove(_rows, function(row) {
				return action.number == row.number
			});
			RowStore.emitChange();
		default:
			// no op
	}
});

module.exports = RowStore;