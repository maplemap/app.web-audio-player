'use strict';

App.AudioParsing = (function (jsmediatags, async, w) {

var filesCollection = false,
    tracksCollection = false,
    currentIndex = 0,

    init = function () {
        filesCollection = App.LoadFiles;
        tracksCollection = App.Tracks;

        queueParse();
        App.Events.trigger('start-file-parse-process');
    },

    queueParse = function () {
        var filesArray = filesCollection.toJSON();

        if(filesArray && filesArray.length !== currentIndex) {
            parseFile( filesArray[currentIndex] );
        } else {
            filesCollection.destroyAllCollection();
            App.Events.trigger('stop-file-parse-process');
        }
    },

    parseFile = function (file) {
        var trackModel = {};

        async.waterfall([
            function(callback) {
                getTags(file.link, function (tags) {
                    trackModel = {
                        link: file.link,
                        name: tags.title || file.name || '',
                        album: tags.album || '',
                        artist: tags.artist || '',
                        comment: tags.comment || '',
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

                currentIndex++;
                queueParse();
            }
        });
    },

    getBase64 = function (imgTag, callback) {
        var data = '';

        if( !$.isEmptyObject(imgTag) && imgTag.data.length) {
            var array = new Uint8Array(imgTag.data);
            data = bufferToBase64(array);

            data = 'data:' + imgTag.format + ';base64,' + data;
        }

        if(typeof callback === 'function') callback( data );

        function bufferToBase64(buf) {
            var binstr = Array.prototype.map.call(buf, function (ch) {
                return String.fromCharCode(ch);
            }).join('');
            return btoa(binstr);
        }
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