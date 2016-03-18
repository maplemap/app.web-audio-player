'use strict';

App.Views.Player = Backbone.View.extend({
    id: App.Settings.playerID,

    initialize: function () {
        this.toolsView = new App.Views.Tools();
        this.playlistView = new App.Views.Playlist;
        this.audioboxTmp = App.TmpEngine.getTemplate('audiobox');

        this.render();
    },
    render: function () {
        this.$el.append( this.audioboxTmp );
        this.$el.append( this.playlistView.$el );
        this.$el.append( this.toolsView.$el );

        return this;
    }
    //initFileUpload: function () {
    //    var that = this;
    //
    //    app.UploadFiles.init('#' + app.PLAYER_ID + ' .upload-files', function (allFiles) {
    //        $.each(tracks, function (i, track) {
    //            that.addOneToCollection(track);
    //        })
    //    });
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
    //}
});
