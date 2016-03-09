'use strict';

App.TmpEngine = (function () {

    var render = function (tmpName, data) {
            data = data || {};
            if( Templates[tmpName] ) return Templates[tmpName](data);
        },

        Templates = {

            audiobox: function (data) {
                return '<div class="'+ App.CLASS_PREFIX +'-audiobox">\
                            <audio></audio>\
                        </div>';
            },

            playlist: function (data) {
                  return '<div class="playlist current">\
                            <ul class="tracker"></ul>\
                            <div class="modal-window"></div>\
                          </div>'
            },

            track: function (data) {
                return '<span class="track-name">' + data.name + '</span>\
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
        render: render
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