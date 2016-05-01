'use strict';

App.Views.Playbox = Backbone.View.extend({
    className: App.Settings.classPrefix + '-playbox',
    volumeDefault: 0.2,

    events: {
        'click .stop': 'stopTrack',
        'click .play': 'playTrack',
        'click .pause': 'pauseTrack',
        'click .prev': 'prevTrack',
        'click .next': 'nextTrack'
    },

    initialize: function () {
        this.$audioBox = $( App.TmpEngine.getTemplate('audiobox') );
        this.playbox = App.TmpEngine.getTemplate('playbox');

        App.Events.on('start-playing-track', this.startTrack, this);

        this.render();
    },

    render: function () {
        this.$el.append( this.$audioBox );
        this.$el.append( this.playbox );

        this.$albumCover = this.$el.find('.album-cover');
        this.$progressBar = this.$el.find('.progress-bar');
        this.$volumeBar = this.$el.find('.volume-bar');
        this.$trackInfo = this.$el.find('.track-info');
        this.$trackTime = this.$el.find('.track-time');
        this.$playBtn = this.$el.find('.play');

        this.initAudioJS();

        return this;
    },

    initProgressBar: function () {
        this.$progressBar.slider({
            range: "min",
            min: 0,
            max: 1,
            step: 0.01
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
            $audioElement = that.$audioBox.find('audio');

        audiojs.events.ready( function() {
            that.audio = audiojs.create( $audioElement, {
                trackEnded: function () {
                    that.nextTrack();
                },

                updatePlayhead: function (percent) {
                    that.$progressBar.slider('value', percent);
                }
            } )[0];

            that.initVolumeBar();
            that.initProgressBar();
        });
    },

    startTrack: function (model) {
        var source = model.get('link');
        this.currenTrackIndex = model.get('index');
        App.Events.trigger('set-active-class-for-track', this.currenTrackIndex);

        this.audio.load(source);
        this.audio.play();

        this.refreshTrackInfo(model);
        this.$playBtn.attr('class', 'pause');
    },

    playTrack: function () {
        if (this.currenTrackIndex) {
            this.audio.play();
            this.$playBtn.attr('class', 'pause');
        } else {
            var model = App.Tracks.where({ index: 1 })[0];
            this.startTrack( model );
        }
    },

    pauseTrack: function () {
        this.audio.pause();
        this.$playBtn.attr('class', 'play');
    },

    stopTrack: function () {
        this.pauseTrack();
        this.audio.skipTo(0);

        this.currenTrackIndex = null;
        this.refreshTrackInfo();
        App.Events.trigger('stop-playing-track');
    },

    prevTrack: function () {
        if (!this.currenTrackIndex) return;

        var prevIndex = this.currenTrackIndex - 1;

        if (prevIndex < 1) {
            this.stopTrack();
        } else {
            var model = App.Tracks.where({ index: prevIndex })[0];
            this.startTrack( model );
        }
    },

    nextTrack: function () {
        if (!this.currenTrackIndex) return;

        var nextIndex = this.currenTrackIndex + 1;

        if (nextIndex > App.Tracks.length) {
            this.stopTrack();
        } else {
            var model = App.Tracks.where({ index: nextIndex })[0];
            this.startTrack( model );
        }
    },

    refreshTrackInfo: function (model) {
        var name = model.get('name'),
            artist = model.get('artist'),
            album = model.get('album');



        this.$trackInfo.find('.name').text( name ).attr('title', name);
        this.$trackInfo.find('.extra').text(artist + ' - ' + album).attr('title', artist + ' - ' + album);
    }
});