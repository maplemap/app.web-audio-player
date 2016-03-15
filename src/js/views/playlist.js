'use strict';

App.Views.Playlist = Backbone.View.extend({
    className: App.CLASS_PREFIX + '-playlist',

    initialize: function () {
        this.trackerView = new App.Views.Tracker();
        this.playlistInfoView = new App.Views.PlaylistInfo();

        this.render();
    },

    render: function () {
        this.$el.append( this.playlistInfoView.render().el );
        this.$el.append( this.trackerView.render().el );

        return this;
    }
});