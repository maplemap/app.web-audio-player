'use strict';

App.Views.Playbox = Backbone.View.extend({
    className: App.Settings.classPrefix + '-playbox',

    initialize: function () {
        this.$audioBox = $( App.TmpEngine.getTemplate('audiobox') );
        this.playbox = App.TmpEngine.getTemplate('playbox');

        this.render();
    },

    render: function () {
        this.$el.append( this.$audioBox );
        this.$el.append( this.playbox );

        this.$albumCover = this.$el.find('.album-cover');
        this.$progressBar = this.$el.find('.progress-bar');
        this.$volumeBar = this.$el.find('.volume-bar');

        this.initAudioJS();
        this.initProgressBar();
        this.initVolumeBar();

        return this;
    },

    initProgressBar: function () {
        this.$progressBar.slider({
            range: "min",
            min: 0,
            max: 100,
            slide: function( event, ui ) {

            }
        });
    },

    initVolumeBar: function () {
        this.$volumeBar.slider({
            range: "min",
            min: 0,
            max: 100,
            value: 20,
            slide: function( event, ui ) {

            }
        });
    initAudioJS: function () {
        var that = this,
            audioSelector = that.$audioBox.find('audio');

        audiojs.events.ready( function() {
            that.audio = audiojs.create( audioSelector )[0];

            that.initVolumeBar();
        });
    },
    }
});