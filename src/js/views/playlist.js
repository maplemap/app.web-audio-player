'use strict';

App.Views.Playlist = Backbone.View.extend({
    className: App.Settings.classPrefix + '-playlist',

    initialize: function () {
        this.trackerView = new App.Views.TrackList();
        this.playlistInfoView = new App.Views.PlaylistInfo();
        this.modalWindow = ( new App.Views.ModalWindow() );

        App.Events.on('show-filelist', this.showFilelist, this);
        App.Events.on('hide-filelist', this.hideFilelist, this);

        this.render();
    },

    render: function () {
        this.$el.append( this.playlistInfoView.render().el );
        this.$el.append( this.trackerView.render().el );
        this.$el.append( this.modalWindow.render().el );

        return this;
    },

    showFilelist: function () {
        this.$el.addClass('show-filelist');
    },

    hideFilelist: function () {
        this.$el.removeClass('show-filelist');
    }
});