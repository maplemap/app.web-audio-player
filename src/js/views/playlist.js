'use strict';

App.Views.Playlist = Backbone.View.extend({
    className: 'playlist',


    initialize: function () {
        this.render();
    },

    render: function () {
        return this;
    },

    initPlaylistScroll: function () {
        this.$playlist.mCustomScrollbar({
            theme: "minimal-dark",
            scrollInertia: 0
        });
    }
});