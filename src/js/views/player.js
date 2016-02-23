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
        this.initFileReader();
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
        this.$('.' + CLASS_PREFIX + '-playlist').mCustomScrollbar({
            theme: "minimal-dark",
            scrollInertia: 0
        });
    },

    initFileReader: function () {
        FileCollector.init('#' + PLAYER_ID + ' #dropzone', function (allFiles) {
            console.log(allFiles);
        });
    }
});
