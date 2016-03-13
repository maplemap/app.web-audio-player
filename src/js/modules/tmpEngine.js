'use strict';

App.TmpEngine = (function () {

    var getTemplate = function (tmpName, data) {
            data = data || {};
            if( Templates[tmpName] ) return Templates[tmpName](data);
        },

        Templates = {

            audiobox: function () {
                return '<div class="'+ App.CLASS_PREFIX +'-audiobox">\
                            <audio></audio>\
                        </div>';
            },

            playlistInfo: function (data) {
                return '<li class="amount-duration"><span>'+ data.duration +'</span></li>\
                        <li class="amount-tracks"><span>'+ data.tracks +'</span></li>\
                        <li class="delete-tracks">delete all</li>'
            },

            track: function (data) {
                return '<span class="track-name">' + data.name + '</span>\
                        <span class="track-delete" title="delete track"></span>\
                        <span class="track-duration">' + data.duration + '</span>'
            },

            instruments: function () {
                return '<li class="get-files" title="get files from server"></li>\
                        <li class="upload-files" title="upload files"></li>'
            },
            
            information: function (options) {
                return '<div class="'+ App.CLASS_PREFIX +'-album-cover">\
                            <img class="cover-image active" src="https://upload.wikimedia.org/wikipedia/en/d/df/Calvin_Harris_-_18_Months.png" alt="Calvin_Harris_-_18_Months" />\
                        </div>\
                        <div class="track-name">We’ll be coming back</div>\
                        <div class="'+ App.CLASS_PREFIX +'-author">Calvin Harris</div>\
                        <div class="'+ App.CLASS_PREFIX +'-album-name">18 months</div>'
            },

            fileList: function () {
                return '<ul class="file-list"></ul>'
            }
        };

    return {
        getTemplate: getTemplate
    }

}());

//<div class="'+ settings.classPrefix +'-header">\
//<span class="'+ settings.classPrefix +'-logo"></span>\
//</div>\
//<div class="'+ settings.classPrefix +'-information">\
//<div class="'+ settings.classPrefix +'-album-cover">\
//<img class="cover-image active" src="https://upload.wikimedia.org/wikipedia/en/d/df/Calvin_Harris_-_18_Months.png" alt="Calvin_Harris_-_18_Months" />\
//</div>\
//<div class="track-name">We’ll be coming back</div>\
//<div class="'+ settings.classPrefix +'-author">Calvin Harris</div>\
//<div class="'+ settings.classPrefix +'-album-name">18 months</div>\
//</div>\

//<ul class="'+ settings.classPrefix +'-controls">\
//<li class="prev"></li>\
//<li class="play-pause"></li>\
//<li class="next"></li>\
//<li class="timeline"></li>\
//<li class="volume" title="volume"></li>\
//<li class="shuffle"></li>\
//<li class="repeat"></li>\
//</ul>\
//<div class="'+ settings.classPrefix +'-footer"> </div>\

//<li id="dropzone">\
//<span>Drop files(mp3, wav) here <br>or click to load on server.</span>\
//</li>\