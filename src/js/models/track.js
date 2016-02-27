'use strict';

var app = app || {};

app.Track = Backbone.Model.extend({
    defaults: {
        author: '',
        album: '',
        name: ''
    }
});