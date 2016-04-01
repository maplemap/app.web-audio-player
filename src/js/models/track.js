'use strict';

App.Models.Track = Backbone.Model.extend({
    defaults: {
        artist: '',
        name: '',
        link: '',
        duration: ''
    }
});