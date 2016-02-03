'use strict';

var app = app || {};

app.PlayerView = Backbone.View.extend({
    
    initialize: function () {
        this.$el.html( TmpEngine.render('player', {phrase: 'Hello!!!'}) );
    }
});


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
            player: function () {
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
                            <div class="wap">\
                            <div class="'+ settings.classPrefix +'-footer">\
                            </div>\
                        </div>'
            }
        };

    return {
        render: render
    }

}());