'use strict';

App.Views.Playlist = Backbone.View.extend({
    className: App.CLASS_PREFIX + '-playlist',

    initialize: function () {
        this.trackerView = new App.Views.Tracker();

        this.render();
    },

    render: function () {
        this.$el.append( this.trackerView.$el );

        return this;
    },

    initPlaylistScroll: function () {
        this.$playlist.mCustomScrollbar({
            theme: "minimal-dark",
            scrollInertia: 0
        });
    }
});