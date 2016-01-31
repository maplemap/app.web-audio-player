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
            player: function (data) {
                return '<div id="webAudioPlayer">\
                            <div class="wap-header">\
                                <div class="wap-logo"></div>\
                            </div>\
                            <ul class="wap-playlist">\
                                <li>We’ll be coming back</li>\
                                <li>We’ll be coming back</li>\
                                <li>We’ll be coming back</li>\
                                <li>We’ll be coming back</li>\
                                <li>We’ll be coming back</li>\
                                <li>We’ll be coming back</li>\
                                <li>We’ll be coming back</li>\
                            </ul>\
                            <div class="wap-footer">\
                            </div>\
                        </div>'
            }
        };

    return {
        render: render
    }

}());