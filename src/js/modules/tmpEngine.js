'use strict';

App.TmpEngine = (function () {

    var getTemplate = function (tmpName, data) {
            data = data || {};
            if( Templates[tmpName] ) return Templates[tmpName](data);
        },

        Templates = {

            playbox: function () {
                return '<div class="album-cover no-cover">\
                            <img src="" alt="album-cover" />\
                        </div>\
                        <div class="left-block">\
                            <div class="volume-bar"></div>\
                            <div class="sound-btn"></div>\
                            <div class="track-info">\
                                <div class="name"></div>\
                                <div class="extra"></div>\
                            </div>\
                            <ul class="control-btns">\
                                <li class="stop"></li>\
                                <li class="play"></li>\
                                <li class="prev"></li>\
                                <li class="next"></li>\
                            </ul>\
                            <div class="progress-bar">\
                                <div class="loading-bar">\
                                    <span></span>\
                                </div>\
                                <div class="track-time">\
                                    <span class="played">00:00</span>\
                                    <span class="duration">00:00</span>\
                                </div>\
                            </div>\
                        </div>'
            },

            audiobox: function () {
                return '<div class="'+ App.Settings.classPrefix +'-audiobox">\
                            <audio></audio>\
                        </div>';
            },

            playlistInfo: function (data) {
                return '<li class="duration"><span>'+ data.duration +'</span></li>\
                        <li class="amount"><span>'+ data.amount +'</span></li>\
                        <li class="info hidden"></li>\
                        <li class="stop-adding-tracks hidden"><button>stop process</button></li>\
                        <li class="tracks-delete"><button>delete all</button></li>'
            },

            track: function (data) {
                return '<span class="name" title="' + data.artist +' - '+ data.name + '">'+ data.artist +' - '+ data.name + '</span>\
                        <span class="delete" title="delete track"></span>\
                        <span class="duration">' + data.duration + '</span>'
            },

            tools: function () {
                return '<li class="upload-files" data-event="enable-upload-window" title="upload files to server"></li>\
                        <li class="get-files" data-event="enable-loader-window" title="get files from server"></li>'
            },
            
            information: function (options) {
                return '<div class="'+ App.Settings.classPrefix +'-album-cover">\
                            <img class="cover-image active" src="https://upload.wikimedia.org/wikipedia/en/d/df/Calvin_Harris_-_18_Months.png" alt="Calvin_Harris_-_18_Months" />\
                        </div>\
                        <div class="track-name">We’ll be coming back</div>\
                        <div class="'+ App.Settings.classPrefix +'-author">Calvin Harris</div>\
                        <div class="'+ App.Settings.classPrefix +'-album-name">18 months</div>'
            },

            listMessage: function (message) {
                return '<li class="list-message">' + message + '</li>'
            },

            fileList: function () {
                return '<ul class="' + App.Settings.classPrefix + '-file-list"></ul>'
            },

            fileUploadListInfo: function (data) {
                return '<li class="amount">'+ data.amount +'</li>\
                        <li><button class="upload">Upload</button></li>'
            },

            fileLoaderListInfo: function (data) {
                return  '<li class="amount">0</li>\
                        <li class="selected-files">0</li>\
                        <li><button class="action-btn"></button></li>\
                        <li class="select-all hidden"><button>choose all</button></li>'
            },

            file: function (data) {
                return '<span class="name" title="' + data.name + '">' + data.name + '</span>\
                        <span class="delete" title="delete file"></span>\
                        <span class="choose" title="check file"></span>\
                        <span class="progressbar">0%</span>'
            },
            
            modalWindow: function () {
                return '<span class="close" title="close"></span>\
                        <div class="modal-content">'
            },

            dropZone: function () {
                return '<div class="'+ App.Settings.classPrefix +'-dropzone">\
                            Drop files(only mp3) here <br>or click to load on server.\
                            <input type="file" name="files[]" multiple>\
                        </div>'
            }
        };

    return {
        getTemplate: getTemplate
    }

}());