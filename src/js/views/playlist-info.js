'use strict';

App.Views.PlaylistInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-playlist-info',

    events: {
        'click .tracks-delete': 'destroyAllCollection'
    },

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
    },

    destroyAllCollection: function () {
        App.Tracks.destroyAllCollection(); //ToDo: Add load process of destroying
    }
});