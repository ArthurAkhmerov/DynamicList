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
    createRow: function(tmp, cells) {
        return fetch(this.baseUrl + "api/rows", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({number: tmp, cells: cells})
        });
    },
    saveRow: function(rowNumber, cells) {
        return fetch(this.baseUrl + "api/rows/" + rowNumber, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({cells: cells})
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