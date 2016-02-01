'use strict';

var app = app || {};

app.PlayerView = Backbone.View.extend({
    
    initialize: function () {
        this.$el.html( TmpEngine.render('player', {phrase: 'Hello!!!'}) );
    }
});


'use strict';

var TmpEngine = (function () {

    var render = function (tmpName, data) {
            data = data || {};
            if( Templates[tmpName] ) return Templates[tmpName](data);
        },

        Templates = {
            player: function () {
                return '<div id="webAudioPlayer">\
                            <div class="wap-header">\
                                <span class="wap-logo"></span>\
                            </div>\
                            <div class="wap-playlist">\
                                 <ul class="wap-tracker">\
                                    <li class="active">\
                                        <span class="wap-track-name">We’ll be coming back</span>\
                                        <span class="wap-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="wap-track-name">We’ll be coming back</span>\
                                        <span class="wap-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="wap-track-name">We’ll be coming back</span>\
                                        <span class="wap-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="wap-track-name">We’ll be coming back</span>\
                                        <span class="wap-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="wap-track-name">We’ll be coming back</span>\
                                        <span class="wap-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="wap-track-name">We’ll be coming back</span>\
                                        <span class="wap-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="wap-track-name">We’ll be coming back</span>\
                                        <span class="wap-track-duration">3:55</span>\
                                    </li>\
                                    <li>\
                                        <span class="wap-track-name">We’ll be coming back</span>\
                                        <span class="wap-track-duration">3:55</span>\
                                    </li>\
                        </ul>\
                            </div>\
                            <div class="wap-footer">\
                            </div>\
                        </div>'
            }
        };

    return {
        render: render
    }

}());