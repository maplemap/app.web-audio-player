'use strict';

App.Views.Playbox = Backbone.View.extend({
    className: App.Settings.classPrefix + '-playbox',

    initialize: function () {
        this.audioBoxView = App.TmpEngine.getTemplate('audiobox');

        this.render();
    },

    render: function () {
        this.$el.append( this.audioBoxView );

        return this;
    }
});

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