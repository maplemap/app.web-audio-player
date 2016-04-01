'use strict';

App.Views.PlaylistInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-playlist-info',

    events: {
        'click .tracks-delete': 'destroyAllCollection'
    },

    initialize: function () {
        this.listenTo(App.Tracks, 'all', this.refreshData);
        App.Events.on('start-file-parse-process', this.startParseProcess, this);
        App.Events.on('stop-file-parse-process', this.stopParseProcess, this);
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
    },

    stopParseProcess: function () {
        this.$info.addClass('hidden')
                  .html('')
                  .removeClass('processing');
    },

    destroyAllCollection: function () {
        console.log('ToDo: Add load process of destroying'); //ToDo: Add load process of destroying
        App.Tracks.destroyAllCollection();
    }
});