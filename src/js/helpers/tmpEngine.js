'use strict';


var PLAYER_ID = 'webAudioPlayer',
    CLASS_PREFIX = 'wap';

var TmpEngine = (function () {

    var settings = {
            playerID: PLAYER_ID,
            classPrefix: CLASS_PREFIX
        },
        render = function (tmpName, data) {
            data = data || {};
            if( Templates[tmpName] ) return Templates[tmpName](data);
        },

        Templates = {
            player: function (options) {
                return '<div id="'+ settings.playerID +'">\
                            <div class="'+ settings.classPrefix +'-audiobox">\
                                <audio></audio>\
                            </div>\
                            <div class="'+ settings.classPrefix +'-playlist">\
                                 <ul class="'+ settings.classPrefix +'-tracker">\
                                    <li id="dropzone">\
                                        <span>Drop files here <br>or click to add in playlist.</span>\
                                        <input type="file" name="files[]">\
                                    </li>\
                                 </ul>\
                            </div>\
                        </div>'
            },

            track: function (options) {
                return '<li>\
                          <span class="track-name">We’ll be coming back</span>\
                          <span class="track-duration">3:55</span>\
                        </li>'
            },
            
            information: function (options) {
                return '<div class="'+ settings.classPrefix +'-album-cover">\
                            <img class="cover-image active" src="https://upload.wikimedia.org/wikipedia/en/d/df/Calvin_Harris_-_18_Months.png" alt="Calvin_Harris_-_18_Months" />\
                        </div>\
                        <div class="track-name">We’ll be coming back</div>\
                        <div class="'+ settings.classPrefix +'-author">Calvin Harris</div>\
                        <div class="'+ settings.classPrefix +'-album-name">18 months</div>'
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