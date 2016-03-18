'use strict';

App.TmpEngine = (function () {

    var getTemplate = function (tmpName, data) {
            data = data || {};
            if( Templates[tmpName] ) return Templates[tmpName](data);
        },

        Templates = {

            audiobox: function () {
                return '<div class="'+ App.Settings.classPrefix +'-audiobox">\
                            <audio></audio>\
                        </div>';
            },

            playlistInfo: function (data) {
                return '<li class="amount-duration"><span>'+ data.duration +'</span></li>\
                        <li class="tracks-amount"><span>'+ data.tracks +'</span></li>\
                        <li class="tracks-delete">delete all</li>'
            },

            track: function (data) {
                return '<span class="track-name">' + data.name + '</span>\
                        <span class="track-delete" title="delete track"></span>\
                        <span class="track-duration">' + data.duration + '</span>'
            },

            tools: function () {
                return '<li class="upload-files" title="upload files to server"></li>'
            },
            
            information: function (options) {
                return '<div class="'+ App.Settings.classPrefix +'-album-cover">\
                            <img class="cover-image active" src="https://upload.wikimedia.org/wikipedia/en/d/df/Calvin_Harris_-_18_Months.png" alt="Calvin_Harris_-_18_Months" />\
                        </div>\
                        <div class="track-name">We’ll be coming back</div>\
                        <div class="'+ App.Settings.classPrefix +'-author">Calvin Harris</div>\
                        <div class="'+ App.Settings.classPrefix +'-album-name">18 months</div>'
            },

            fileList: function () {
                return '<ul class="file-list"></ul>'
            },
            
            modalWindow: function () {
                return '<div class="'+ App.Settings.classPrefix +'-modal-window">\
                            <span class="cancel" title="cancel"></span>\
                            <div class="modal-content">\
                        </div>'
            },

            dropZone: function () {
                return '<li class="'+ App.Settings.classPrefix +'-dropzone">\
                            <span>Drop files(mp3, wav) here <br>or click to load on server.</span>\
                            <input type="file" name="files[]" multiple>\
                        </li>'
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




//<li class="get-files" title="get files from server"></li>