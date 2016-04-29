'use strict';

App.Views.Playbox = Backbone.View.extend({
    className: App.Settings.classPrefix + '-playbox',
    volumeDefault: 0.2,

    initialize: function () {
        this.$audioBox = $( App.TmpEngine.getTemplate('audiobox') );
        this.playbox = App.TmpEngine.getTemplate('playbox');

        App.Events.on('start-playing-track', this.startPlayingTrack, this);

        this.render();
    },

    render: function () {
        this.$el.append( this.$audioBox );
        this.$el.append( this.playbox );

        this.$albumCover = this.$el.find('.album-cover');
        this.$progressBar = this.$el.find('.progress-bar');
        this.$volumeBar = this.$el.find('.volume-bar');
        this.$trackInfo = this.$el.find('.track-info');

        this.initAudioJS();

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
        var that = this;
        that.audio.setVolume( that.volumeDefault );

        this.$volumeBar.slider({
            range: "min",
            min: 0,
            max: 1,
            step: 0.01,
            value: that.volumeDefault,
            slide: function( event, ui ) {
                that.audio.setVolume( ui.value );
            }
        });
    },

    initAudioJS: function () {
        var that = this,
            audioSelector = that.$audioBox.find('audio');

        audiojs.events.ready( function() {
            that.audio = audiojs.create( audioSelector )[0];

            that.initVolumeBar();
            that.initProgressBar();
        });
    },

    startPlayingTrack: function (model) {
        var source = model.get('link');

        this.audio.load(source);
        this.audio.play();

        this.refreshTrackInfo(model);
    },

    refreshTrackInfo: function (model) {
        var name = model.get('name'),
            artist = model.get('artist'),
            album = model.get('album');



        this.$trackInfo.find('.name').text( name ).attr('title', name);
        this.$trackInfo.find('.extra').text(artist + ' - ' + album).attr('title', artist + ' - ' + album);
    }
});