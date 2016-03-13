'use strict';

App.Views.PlaylistInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.CLASS_PREFIX + '-playlist-info',

    initialize: function () {
        this.listenTo(App.Tracks, 'all', this.render);
    },

    render: function () {
        var data = {
            tracks: App.Tracks.length,
            duration: App.Tracks.getTotalTime()
        };

        this.$el.html( App.TmpEngine.getTemplate('playlistInfo', data) );

        return this;
    }
});