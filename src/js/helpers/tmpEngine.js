'use strict';

var TmpEngine = (function () {

    var settings = {
            playerID: 'webAudioPlayer',
            classPrefix: 'wap'
        },
        render = function (tmpName, data) {
            data = data || {};
            if( Templates[tmpName] ) return Templates[tmpName](data);
        },

        Templates = {
            player: function (options) {
                return '<div id="'+ settings.playerID +'">\
                            <div class="'+ settings.classPrefix +'-header">\
                                <span class="'+ settings.classPrefix +'-logo"></span>\
                            </div>\
                            <div class="'+ settings.classPrefix +'-playlist">\
                                 <ul class="'+ settings.classPrefix +'-tracker">\
                                    <li class="active">\
                                        <span class="'+ settings.classPrefix +'-track-name">We’ll be coming back</span>\
                                        <span class="'+ settings.classPrefix +'-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="'+ settings.classPrefix +'-track-name">We’ll be coming back</span>\
                                        <span class="'+ settings.classPrefix +'-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="'+ settings.classPrefix +'-track-name">We’ll be coming back</span>\
                                        <span class="'+ settings.classPrefix +'-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="'+ settings.classPrefix +'-track-name">We’ll be coming back</span>\
                                        <span class="'+ settings.classPrefix +'-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="'+ settings.classPrefix +'-track-name">We’ll be coming back</span>\
                                        <span class="'+ settings.classPrefix +'-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="'+ settings.classPrefix +'-track-name">We’ll be coming back</span>\
                                        <span class="'+ settings.classPrefix +'-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="'+ settings.classPrefix +'-track-name">We’ll be coming back</span>\
                                        <span class="'+ settings.classPrefix +'-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="'+ settings.classPrefix +'-track-name">We’ll be coming back</span>\
                                        <span class="'+ settings.classPrefix +'-track-duration">3:55</span>\
                                    </li>\
                                 </ul>\
                            </div>\
                            <div class="'+ settings.classPrefix +'-information">\
                                <div class="'+ settings.classPrefix +'-album-cover">\
                                    <img class="cover-image active" src="https://upload.wikimedia.org/wikipedia/en/d/df/Calvin_Harris_-_18_Months.png" alt="Calvin_Harris_-_18_Months" />\
                                </div>\
                                <div class="'+ settings.classPrefix +'-track-name">We’ll be coming back</div>\
                                <div class="'+ settings.classPrefix +'-author">Calvin Harris</div>\
                                <div class="'+ settings.classPrefix +'-album-name">18 months</div>\
                            </div>\
                            <div class="'+ settings.classPrefix +'-footer">\
                                <ul class="'+ settings.classPrefix +'-controls">\
                                   <li class="prev"></li>\
                                   <li class="play-pause"></li>\
                                   <li class="next"></li>\
                                   <li id="timeline"></li>\
                                </ul>\
                            </div>\
                        </div>'
            },

            track: function (options) {
                return '<li>\
                          <span class="'+ settings.classPrefix +'-track-name">We’ll be coming back</span>\
                          <span class="'+ settings.classPrefix +'-track-duration">3:55</span>\
                        </li>'
            },
            
            information: function (options) {
                return '<div class="'+ settings.classPrefix +'-album-cover">\
                            <img class="cover-image active" src="https://upload.wikimedia.org/wikipedia/en/d/df/Calvin_Harris_-_18_Months.png" alt="Calvin_Harris_-_18_Months" />\
                        </div>\
                        <div class="'+ settings.classPrefix +'-track-name">We’ll be coming back</div>\
                        <div class="'+ settings.classPrefix +'-author">Calvin Harris</div>\
                        <div class="'+ settings.classPrefix +'-album-name">18 months</div>'
            }
        };

    return {
        render: render
    }

}());