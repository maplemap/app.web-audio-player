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
                return '<li class="duration"><span>'+ data.duration +'</span></li>\
                        <li class="amount"><span>'+ data.amount +'</span></li>\
                        <li class="tracks-delete"><button>delete all</button></li>'
            },

            track: function (data) {
                return '<span class="name" title="' + data.name + '">' + data.name + '</span>\
                        <span class="delete" title="delete track"></span>\
                        <span class="duration">' + data.duration + '</span>'
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
                return '<ul class="' + App.Settings.classPrefix + '-file-list"></ul>'
            },

            fileListInfo: function (data) {
                return '<li class="amount">'+ data.amount +'</li>\
                        <li><button class="upload">Upload</button></li>\
                        <!-- <li class="back">Back</li> -->'
            },

            file: function (data) {
                return '<span class="name" title="' + data.name + '">' + data.name + '</span>\
                        <span class="delete" title="delete file"></span>\
                        <span class="progressbar">0%</span>'
            },
            
            modalWindow: function () {
                return '<span class="close" title="close"></span>\
                        <div class="modal-content">'
            },

            dropZone: function () {
                return '<div class="'+ App.Settings.classPrefix +'-dropzone">\
                            Drop files(mp3, wav) here <br>or click to load on server.\
                            <input type="file" name="files[]" multiple>\
                        </div>'
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