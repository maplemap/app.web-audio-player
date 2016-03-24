'use strict';

App.Models.File = Backbone.Model.extend({
    defaults: {
        index: '',
        filename: ''
    },

    initialize: function () {
        this.set('index', App.Helper.fileCounter);
        App.Helper.fileCounter += 1;
    }
});