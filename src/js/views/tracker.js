'use strict';

App.Views.Playlist = Backbone.View.extend({
    className: App.CLASS_PREFIX + '-playlist',

    initialize: function () {
        //this.$el.append( App.TmpEngine.render('track') );

        this.render();
    },

    render: function () {
        //var tracker = App.TmpEngine.render('tracker');
        //this.$el.append( tracker );

        return this;
    },

    initPlaylistScroll: function () {
        this.$playlist.mCustomScrollbar({
            theme: "minimal-dark",
            scrollInertia: 0
        });
    }
});