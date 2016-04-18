'use strict';

App.Views.Player = Backbone.View.extend({
    id: App.Settings.playerID,

    initialize: function () {
        this.toolsView = new App.Views.Tools();
        this.playlistView = new App.Views.Playlist;
        this.playBoxView = new App.Views.Playbox;

        this.render();
    },
    render: function () {
        this.$el.append( this.playBoxView.$el );
        this.$el.append( this.playlistView.$el );
        this.$el.append( this.toolsView.$el );

        return this;
    }
});
