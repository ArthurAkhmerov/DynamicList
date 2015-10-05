"use strict";

var Fetch = require('whatwg-fetch');
$ = jQuery = require('jquery');

var RowApi = {
    baseUrl: "http://localhost:22964/",
    getAllRows: function() {
        return fetch(this.baseUrl + "api/rows")
            .then(function(response){
            return response.json()
        });
    },
    getRowByNumber: function() {
        
    },
    createRow: function(row) {
        return fetch(this.baseUrl + "api/rows", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({number: row.number, cells: row.cells})
        });
    },
    saveRow: function(row) {
        return fetch(this.baseUrl + "api/rows/" + row.number, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({cells: row.cells})
        });
    },
    deleteRow: function(number) {
        
        return fetch(this.baseUrl + "api/rows/" + number, {
            headers: {
                'Accept': 'application/json',
            },
            method: 'delete'
        });
    }
};

module.exports = RowApi;