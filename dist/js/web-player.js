'use strict';
var app = app || {};


app.PlayerView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html( TmpEngine.render('player', {phrase: 'Hello!!!'}) );
        this.afterRendering();

        return this;
    },

    afterRendering: function () {
        this.initTimeline();
        this.initVolumeControl();
        this.initPlaylistScroll();
    },

    initTimeline: function () {
        this.$(".timeline").slider({
            range: "min",
            min: 0,
            max: 100
        });
    },

    initVolumeControl: function () {
        this.$(".volume").slider({
            range: "min",
            min: 0,
            max: 100,
            value: 20,
            slide: function( event, ui ) {
                //$( "#amount" ).val( ui.value );
            }
        });
    },

    initPlaylistScroll: function () {
        console.log(this.$(CLASS_PREFIX + '-playlist'));
        this.$('.' + CLASS_PREFIX + '-playlist').mCustomScrollbar({
            theme: "minimal-dark",
            scrollInertia: 0
        });
    }
});



'use strict';
var CLASS_PREFIX = 'wap';

var TmpEngine = (function () {

    var settings = {
            playerID: 'webAudioPlayer',
            classPrefix: CLASS_PREFIX
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
                            <div class="'+ settings.classPrefix +'-information">\
                                <div class="'+ settings.classPrefix +'-album-cover">\
                                    <img class="cover-image active" src="https://upload.wikimedia.org/wikipedia/en/d/df/Calvin_Harris_-_18_Months.png" alt="Calvin_Harris_-_18_Months" />\
                                </div>\
                                <div class="'+ settings.classPrefix +'-track-name">We’ll be coming back</div>\
                                <div class="'+ settings.classPrefix +'-author">Calvin Harris</div>\
                                <div class="'+ settings.classPrefix +'-album-name">18 months</div>\
                            </div>\
                            <div class="'+ settings.classPrefix +'-playlist">\
                                 <ul class="'+ settings.classPrefix +'-tracker">\
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
                                    <li>\
                                        <span class="'+ settings.classPrefix +'-track-name">We’ll be coming back</span>\
                                        <span class="'+ settings.classPrefix +'-track-duration">3:55</span>\
                                    </li>\
                                 </ul>\
                            </div>\
                            <ul class="'+ settings.classPrefix +'-controls">\
                               <li class="prev"></li>\
                               <li class="play-pause"></li>\
                               <li class="next"></li>\
                               <li class="timeline"></li>\
                               <li class="volume" title="volume"></li>\
                               <li class="shuffle"></li>\
                               <li class="repeat"></li>\
                            </ul>\
                            <div class="'+ settings.classPrefix +'-footer"> </div>\
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