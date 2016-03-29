'use strict';

var App = {
    Models: {},
    Collections: {},
    Views: {},
    Events: _.extend({}, Backbone.Events),
    Helper: {}
};

//settings
App.Settings = {
    playerID: 'webAudioPlayer',
    classPrefix: 'wap',
    uploadFileTypes: ['audio/mp3', 'audio/mpeg', 'audio/vnd.wave'],
    phpServer: {
        uploadUrl: '/server/php/upload.php',
        loadUrl: '/server/php/load.php'
    }
};