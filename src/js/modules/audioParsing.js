'use strict';

App.AudioParsing = (function (jsmediatags, async) {

var filesCollection = false,
    tracksCollection = false,
    breakPoint = false,
    currentIndex = 0,

    start = function () {
        filesCollection = App.SelectedFiles;
        tracksCollection = App.Tracks;

        queueParse();
        App.Events.trigger('start-audio-parsing');
    },

    stop = function () {
        if(!filesCollection) return;

        breakPoint = true;
        currentIndex = 0;
        filesCollection.destroyAllCollection();

        App.Events.trigger('stop-audio-parsing');
    },

    queueParse = function () {
        var filesArray = filesCollection.toJSON();

        if(filesArray && filesArray.length > currentIndex) {
            breakPoint = false;
            parseFile( filesArray[currentIndex] );
        } else {
            stop();
        }
    },

    startNextFile = function () {
        currentIndex++;
        queueParse();
    },

    parseFile = function (file) {
        var trackModel = {};

        async.waterfall([
            function(callback) {
                getTags(file.link, function (err, tags) {
                    if(err) return callback(err);

                    trackModel = {
                        link: file.link,
                        duration: file.duration,
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
            }
        ], function (err) {
            if(err) {
                startNextFile();
                return console.log(err);
            }
            if(breakPoint) return console.log('parsing break');

            tracksCollection.add( trackModel );
            startNextFile();
        });
    },

    getTags = function (filelink, callback) {
        var waitingPeriod = setTimeout(function () {
            callback(true);
        }, 4000);
        
        jsmediatags.read(filelink, {
            onSuccess: function(data) {
                clearTimeout(waitingPeriod);
                if(typeof callback === 'function') callback(null, data.tags);
            },
            onError: function(error) {
                console.log(error);
                clearTimeout(waitingPeriod);

                callback(true);
            }
        });
    },

    getBase64 = function (pictureTag, callback) {
        var data = '';
        if( !$.isEmptyObject(pictureTag) && pictureTag.data.length) {
            var array = new Uint8Array(pictureTag.data);
            data = bufferToBase64(array);

            getMimeType(pictureTag.format, function (mimeType) {
                data = 'data:' + mimeType + ';base64,' + data;
            });
        }

        if(typeof callback === 'function') callback( data );



        function bufferToBase64 (buf) {
            var binstr = Array.prototype.map.call(buf, function (ch) {
                return String.fromCharCode(ch);
            }).join('');

            return btoa(binstr);
        }

        function getMimeType (formatTag, callback) {
            var imgFormats = {
                gif: 'image/gif',
                jpg: 'image/jpg',
                jpeg: 'image/jpeg',
                png: 'image/png'
            };

            formatTag = formatTag.toLowerCase();

            for (var key in imgFormats) {
                if( formatTag.indexOf(key) + 1) {
                    return callback( imgFormats[key] )
                }
            }
        }
    };

    return {
        start: start,
        stop: stop
    }
})(jsmediatags, async, window);

App.Events.on('enable-parse-loaded-files', App.AudioParsing.start);
App.Events.on('disable-parse-loaded-files', App.AudioParsing.stop);