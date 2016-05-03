'use strict';

App.Views.Playbox = Backbone.View.extend({
    className: App.Settings.classPrefix + '-playbox',
    volumeDefault: 0.2,

    events: {
        'click .stop': 'stopTrack',
        'click .play': 'playTrack',
        'click .pause': 'pauseTrack',
        'click .prev': 'prevTrack',
        'click .next': 'nextTrack',
        'click .sound-btn': 'toggleMute'
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
        this.$loadingBar = this.$progressBar.find('.loading-bar');
        this.$volumeBar = this.$el.find('.volume-bar');
        this.$soundBtn = this.$el.find('.sound-btn');
        this.$trackInfoName = this.$el.find('.track-info .name');
        this.$trackInfoExtra = this.$el.find('.track-info .extra');
        this.$trackTimePlayed = this.$el.find('.track-time .played');
        this.$trackTimeDuration = this.$el.find('.track-time .duration');
        this.$playBtn = this.$el.find('.play');

        this.initAudioJS();

        return this;
    },

    initProgressBar: function () {
        var that = this;

        this.$progressBar.slider({
            range: "min",
            min: 0,
            max: 1,
            step: 0.01,
            slide: function ( event, ui ) {
                that.audio.skipTo(ui.value);
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
                that.currentVolume = ui.value;
                that.audio.setVolume( that.currentVolume );

                that.$soundBtn.removeClass('mute');
            }
        });
    },

    initAudioJS: function () {
        var that = this,
            $audioElement = that.$audioBox.find('audio');

        audiojs.events.ready( function() {
            that.audio = audiojs.create( $audioElement, {
                loadProgress: function(percent) {
                    that.$loadingBar.css('width', percent*100 + '%');
                },
                loadError: function (e) {
                  console.log('Loading stop');
                },
                updatePlayhead: function (percent) {
                    that.$progressBar.slider('value', percent);
                    that.refreshTrackTime(this.duration, percent);
                },
                trackEnded: function () {
                    that.nextTrack();
                }

            } )[0];

            that.initVolumeBar();
            that.initProgressBar();
        });
    },

    startTrack: function (model) {
        if (!model) return;

        this.audio.skipTo(0);
        this.skipLoadingBar();
        this.currentTrackModel = model;

        var source = this.currentTrackModel.get('link');
        this.currenTrackIndex = this.currentTrackModel.get('index');
        App.Events.trigger('set-active-class-for-track', this.currenTrackIndex);

        this.audio.load(source);
        this.audio.play();

        this.refreshTrackInfo();
        this.refreshAlbumCover();
        this.$playBtn.attr('class', 'pause');
    },

    playTrack: function () {
        if (this.currenTrackIndex) {
            this.audio.play();
            this.$playBtn.attr('class', 'pause');
        } else {
            var firstTrackIndex = App.Tracks.toJSON()[0].index,
                model = App.Tracks.where({ index: firstTrackIndex })[0];
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
        this.skipLoadingBar();

        this.currenTrackIndex = null;
        this.currentTrackModel = null;

        this.refreshTrackInfo();
        this.refreshTrackTime();
        this.refreshAlbumCover();
        App.Events.trigger('stop-playing-track');
    },

    prevTrack: function () {
        if (!this.currenTrackIndex) return;

        var prevIndex = this.currenTrackIndex - 1;

        if (prevIndex < App.Tracks.toJSON()[0].index) {
            this.stopTrack();
        } else {
            var model = App.Tracks.where({ index: prevIndex })[0];
            this.startTrack( model );
        }
    },

    nextTrack: function () {
        if (!this.currenTrackIndex) return;

        var nextIndex = this.currenTrackIndex + 1;

        if (nextIndex > App.Tracks.toJSON()[0].index + App.Tracks.length - 1) {
            this.stopTrack();
        } else {
            var model = App.Tracks.where({ index: nextIndex })[0];
            this.startTrack( model );
        }
    },

    refreshTrackInfo: function () {
        var name = '', artist = '', album = '';

        if (this.currentTrackModel) {
            name = this.currentTrackModel.get('name');
            artist = this.currentTrackModel.get('artist');
            album = ' - ' + this.currentTrackModel.get('album');
        }

        this.$trackInfoName.text( name ).attr('title', name);
        this.$trackInfoExtra.text(artist + album).attr('title', artist + album);
    },

    refreshTrackTime: function (duration, percentPlayed) {
        var playedTime = '00:00',
            durationTime = '00:00';

        if (duration && percentPlayed) {
            duration = Math.floor( duration );
            var played = Math.floor( duration * percentPlayed);
            durationTime = App.Tracks.getTimeFromSeconds( duration);
            playedTime = App.Tracks.getTimeFromSeconds( played );

            this.trackDurationCorrection( durationTime );
        }

        this.$trackTimePlayed.text( playedTime );
        this.$trackTimeDuration.text( durationTime );
    },

    refreshAlbumCover: function () {
        var $albumCoverImg = this.$albumCover.find('img');

        if (this.currentTrackModel) {
            var dataImage = this.currentTrackModel.get('image');

            if(dataImage) {
                this.$albumCover.removeClass('no-cover');
                $albumCoverImg.attr('src', dataImage);

                return;
            }
        }

        this.$albumCover.addClass('no-cover');
        $albumCoverImg.attr('src', '');
    },

    toggleMute: function () {
        if ( this.$soundBtn.hasClass('mute') ) {
            this.$soundBtn.removeClass('mute');
            this.audio.setVolume( this.currentVolume );
        } else {
            this.$soundBtn.addClass('mute');
            this.audio.setVolume( 0 );
        }
    },

    skipLoadingBar: function () {
        this.$audioBox.find('audio').attr('src', '');
        this.$loadingBar.css('width', 0);
    },

    trackDurationCorrection: function (duration) {
        if (this.currentTrackModel) {
            var currentDuration = this.currentTrackModel.get('duration');

            if (currentDuration !== duration) {
                console.log('correcting of track duration');
                this.currentTrackModel.set('duration', duration);
                this.currentTrackModel.save();
            }
        }
    }
});