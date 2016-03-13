'use strict';

App.Views.Player = Backbone.View.extend({
    id: App.PLAYER_ID,

    initialize: function () {
        this.toolsView = new App.Views.Tools();
        this.playlistView = new App.Views.Playlist;
        this.audioboxTmp = App.TmpEngine.getTemplate('audiobox');

        this.render();

        //new app.ToolsView({
        //    el: '#' + this.id
        //});
        //this.$el.html( app.TmpEngine.render('player') );
        //
        //this.listenTo(app.Tracks, 'add', this.addOne);
        //
        //this.$player = this.$('#' + app.PLAYER_ID);
        //this.$playlist = this.$player.find('.playlist');
        //this.$tracker = this.$playlist.find('.tracker');
        //
        //this.afterRendering();
        //
        //app.Tracks.fetch();
    },
    //
    render: function () {
        this.$el.append( this.audioboxTmp );
        this.$el.append( this.playlistView.$el );
        this.$el.append( this.toolsView.$el );

        return this;
    }
    //
    //addOne: function (track) {
    //    var view = new app.TrackView({
    //        model: track
    //    });
    //    track.save();
    //    this.$tracker.append( view.render().el );
    //},
    //
    //addOneToCollection: function (track) {
    //    app.Tracks.add(track);
    //},
    //
    //renderList: function (event) {
    //    var that = this;
    //    app.Tracks.each(function (model, indx) {
    //        that.addOne(model);
    //    });
    //},
    //
    //initFileUpload: function () {
    //    var that = this;
    //
    //    app.UploadFiles.init('#' + app.PLAYER_ID + ' .upload-files', function (allFiles) {
    //        $.each(tracks, function (i, track) {
    //            that.addOneToCollection(track);
    //        })
    //    });
    //},
    //
    //renderTrack: function (item) {
    //    var trackView = new app.TrackView({
    //        model: item
    //    });
    //    this.$tracker.append( trackView.render().el );
    //},
    //
    //afterRendering: function () {
    //    //this.initTimeline();
    //    //this.initVolumeControl();
    //    this.initPlaylistScroll();
    //    app.UploadFiles.init(this.$player);
    //    //this.initFileCollector();
    //},

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

    //initPlaylistScroll: function () {
    //    this.$playlist.mCustomScrollbar({
    //        theme: "minimal-dark",
    //        scrollInertia: 0
    //    });
    //},
    //
    //getFilesFromServer: function () {
    //
    //}
});
