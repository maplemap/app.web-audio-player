'use strict';

App.Models.Track = Backbone.Model.extend({
    defaults: {
        artist: '',
        name: '',
        link: '',
        duration: '',
        index: ''
    },

    initialize: function () {
        this.set('index', App.Helper.fileCounter);
        App.Helper.fileCounter += 1;
    }
});