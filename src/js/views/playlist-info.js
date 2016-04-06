'use strict';

App.Views.PlaylistInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-playlist-info',

    events: {
        'click .tracks-delete': 'destroyAllCollection',
        'click .stop-adding-tracks': 'disableParseLoadedFilesEvent'
    },

    initialize: function () {
        this.listenTo(App.Tracks, 'all', this.refreshData);
        App.Events.on('start-audio-parsing', this.startParseProcess, this);
        App.Events.on('stop-audio-parsing', this.stopParseProcess, this);
    },

    render: function () {
        var data = {
            amount: App.Tracks.length,
            duration: App.Tracks.getTotalTime()
        };

        this.$el.html( App.TmpEngine.getTemplate('playlistInfo', data) );
        this.$amount = this.$el.find('.amount');
        this.$duration = this.$el.find('.duration');
        this.$info = this.$el.find('.info');
        this.$stopAddTracks = this.$el.find('.stop-adding-tracks');
        this.$tracksDelete = this.$el.find('.tracks-delete');

        return this;
    },

    refreshData: function () {
        this.$amount.html( App.Tracks.length );
        this.$duration.html( App.Tracks.getTotalTime() );
    },

    startParseProcess: function () {
        this.$info.html('Adding tracks')
                  .removeClass('hidden')
                  .addClass('processing');

        this.$tracksDelete.addClass('hidden');
        this.$stopAddTracks.removeClass('hidden');
    },

    stopParseProcess: function () {
        this.$info.addClass('hidden')
                  .html('')
                  .removeClass('processing');

        this.$tracksDelete.removeClass('hidden');
        this.$stopAddTracks.addClass('hidden');
    },

    disableParseLoadedFilesEvent: function () {
        App.Events.trigger('disable-parse-loaded-files');
    },

    destroyAllCollection: function () {
        console.log('ToDo: Add load process of destroying'); //ToDo: Add load process of destroying
        App.Events.trigger('start-destroying-of-tracks-collection');
        App.Tracks.destroyAllCollection();
    }
});