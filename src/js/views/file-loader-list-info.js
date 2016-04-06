'use strict';

App.Views.FileLoaderListInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-file-loader-List-info',

    initialize: function () {
        this.listenTo(App.LoadFiles, 'all', this.refreshData);
        App.Events.on('start-loading-process', this.addLoader, this);
        App.Events.on('stop-loading-process', this.removeLoader, this);
        App.Events.on('activate-add-to-pl-btn', this.activateAddToPlaylistBtn, this);
    },

    render: function () {
        this.$el.html( App.TmpEngine.getTemplate('fileLoaderListInfo') );

        this.$amount = this.$el.find('.amount');
        this.$actionBtn = this.$el.find('.action-btn');

        this.delegateEvents(this.events);

        return this;
    },

    refreshData: function () {
        this.$amount.html( App.LoadFiles.length );
    },

    activateAddToPlaylistBtn: function () {
        this.$actionBtn
            .html('Add to playlist')
            .on('click', function () {
                App.Events.trigger('enable-parse-loaded-files');
                App.Events.trigger('disable-modal-window');
            })
    },

    addLoader: function () {
        this.$actionBtn
            .html('Loading')
            .attr('disabled', 'disabled')
            .addClass('processing');
    },

    removeLoader: function () {
        this.$actionBtn
            .removeAttr('disabled')
            .removeClass('processing')
            .html('');
    }
});