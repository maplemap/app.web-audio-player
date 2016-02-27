'use strict';

var app = app || {};

app.TrackList = Backbone.Collection.extend({
    model: app.Track,
    localStorage: new Backbone.LocalStorage('web-player')

});

app.Tracks = new app.TrackList();