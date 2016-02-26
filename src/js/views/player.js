'use strict';
var app = app || {};

app.PlayerView = Backbone.View.extend({

    events: {

    },

    initialize: function () {
        this.$el.html( TmpEngine.render('player') );

        //this.listenTo(app.Tracks, 'all', this.render);
        this.listenTo(app.Tracks, 'add', this.addOne);

        this.$player = this.$('#' + PLAYER_ID);
        this.$playlist = this.$player.find('.playlist');
        this.$tracker = this.$playlist.find('.tracker');

        this.afterRendering();

        app.Tracks.fetch();
    },

    render: function () {

    },

    addOne: function (track) {
        var view = new app.TrackView({
            model: track
        });
        track.save();
        this.$tracker.append( view.render().el );
    },

    addOneToCollection: function (track) {
        app.Tracks.add(track);
    },

    renderList: function (event) {
        var that = this;
        app.Tracks.each(function (model, indx) {
            that.addOne(model);
        });
    },

    initFileUpload: function () {
        var that = this;

        FilesUpload.init('#' + PLAYER_ID + ' .upload-files', function (allFiles) {
            $.each(tracks, function (i, track) {
                that.addOneToCollection(track);
            })
        });
    },

    renderTrack: function (item) {
        var trackView = new app.TrackView({
            model: item
        });
        this.$tracker.append( trackView.render().el );
    },

    afterRendering: function () {
        //this.initTimeline();
        //this.initVolumeControl();
        this.initPlaylistScroll();
        FilesDownload.init(this.$player);
        //this.initFileCollector();
    },

    //initTimeline: function () {
    //    this.$(".timeline").slider({
    //        range: "min",
    //        min: 0,
    //        max: 100
    //    });
    //},
    //
    //initVolumeControl: function () {
    //    this.$(".volume").slider({
    //        range: "min",
    //        min: 0,
    //        max: 100,
    //        value: 20,
    //        slide: function( event, ui ) {
    //            //$( "#amount" ).val( ui.value );
    //        }
    //    });
    //},

    initPlaylistScroll: function () {
        this.$playlist.mCustomScrollbar({
            theme: "minimal-dark",
            scrollInertia: 0
        });
    },

    getFilesFromServer: function () {

    }
});
