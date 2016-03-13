'use strict';


App.Collections.Tracks = Backbone.Collection.extend({
    model: App.Models.Track,
    localStorage: new Backbone.LocalStorage('web-player')

});

App.Tracks = new App.Collections.Tracks();