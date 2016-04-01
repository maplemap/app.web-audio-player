'use strict';

App.AudioParsing = (function (jsmediatags, async, w) {

var filesCollection = false,
    tracksCollection = false,
    currentIndex = 0,

    init = function () {
        filesCollection = App.LoadFiles.toJSON();
        tracksCollection = App.Tracks;

        queueParse();
        App.Events.trigger('start-file-parse-process');
    },

    queueParse = function () {
        if(filesCollection && filesCollection.length !== currentIndex) {
            parseFile( filesCollection[currentIndex] );
        } else {
            App.Events.trigger('stop-file-parse-process');
        }
    },

    parseFile = function (file) {
        var trackModel = {};

        async.waterfall([
            function(callback) {
                getTags(file.link, function (tags) {
                    console.log(tags);
                    trackModel = {
                        link: file.link,
                        name: tags.title || file.name || '',
                        album: tags.album || '',
                        artist: tags.artist || '',
                        comment: {
                            language: tags.comment.language || '',
                            short_description: tags.comment.short_description || '',
                            text: tags.comment.text || ''
                        },
                        genre: tags.genre || '',
                        year: tags.year || ''
                    };

                    callback(null, tags);
                });
            },
            function(tags, callback) {
                getBase64(tags.picture, function (dataBase64) {
                    trackModel.image = dataBase64;

                    callback(null);
                });
            },
            function(callback) {
                getDuration(file.link, function (seconds) {
                    seconds = parseInt(seconds, 10);
                    trackModel.duration = App.Tracks.getTimeFromSeconds( seconds );

                    callback(null, seconds);
                });
            }
        ], function (err) {
            if(err) return console.log(err);

            tracksCollection.add( trackModel );

            currentIndex++;
            queueParse();
        });
    },

    getTags = function (filelink, callback) {
        jsmediatags.read(filelink, {
            onSuccess: function(data) {
                if(typeof callback === 'function') callback(data.tags);
            },
            onError: function(error) {
                console.log(error);
            }
        });
    },

    getBase64 = function (imgTag, callback) {
        var data = '';

        if( !$.isEmptyObject(imgTag) && imgTag.data.length) {
            data = w.btoa(String.fromCharCode.apply(null, new Uint8Array( imgTag.data )));
            data = 'data:' + imgTag.format + ';base64,' + data;
        }

        if(typeof callback === 'function') callback( data );
    },

    getDuration = function (filelink, callback) {
        var audio = new Audio();
        audio.onloadedmetadata = function() {
            if(typeof callback === 'function') callback( this.duration );
        };
        audio.src = filelink;
    };

    return {
        init: init
    }
})(jsmediatags, async, window);

App.Events.on('start-parse-loaded-files', App.AudioParsing.init);