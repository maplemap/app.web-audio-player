'use strict';

App.AudioFileInfo = (function (id3) {
    var tempTrack = {
        album: '',
        artist: '',
        title: ''
    },

    parse = function () {


        _.each(App.LoadFiles.toJSON(), function (file, i) {
            getTags(file.link);
        })
    },

    getTags = function (filelink) {
        id3(filelink, function(err, tags) {
            console.log(tags);
        });
    };

    return {
        parse: parse
    }
})(id3);

App.Events.on('start-parse-loaded-files', App.AudioFileInfo.parse);