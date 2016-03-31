'use strict';

App.AudioParsing = (function (id3) {

    var start = function () {
        _.each(App.LoadFiles.toJSON(), function (file, i) {

            getTags(file.link, function (tags) {
                getBase64(tags.v2.image.data, function (imageBase64) {
                    getDuration(file.link, function (duration) {
                        var trackModel = {
                            album: tags.album || tags.v1.album || tags.v2.album,
                            artist: tags.artist || tags.v1.artist || tags.v2.artist,
                            name: tags.title || tags.v1.title || tags.v2.title,
                            genre: tags.v1.genre || tags.v2.genre,
                            year: tags.year || tags.v1.year || tags.v2.year,
                            image: imageBase64,
                            duration: duration
                        };

                        console.log(trackModel);
                    })
                })
            });
        })
    },

    getTags = function (filelink, callback) {
        id3(filelink, function(err, tags) {
            if(err) return console.log(err);

            if(typeof callback === 'function') callback(tags);
        });
    },

    getBase64 = function (arrayBuffer, callback) {
        var result = false;
        if(arrayBuffer) {
            result = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
        }

        if(typeof callback === 'function') callback( window.btoa( result ) );
    },

    getDuration = function (filelink, callback) {
        var audio = new Audio();
        audio.onloadedmetadata = function() {
            if(typeof callback === 'function') callback( this.duration );
        };
        audio.src = filelink;
    };

    return {
        start: start
    }
})(id3);

App.Events.on('start-parse-loaded-files', App.AudioParsing.start);