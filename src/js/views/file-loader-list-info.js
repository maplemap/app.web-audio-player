'use strict';

App.Views.FileLoaderListInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-file-loader-List-info',

    events: {
        'click .select-all': 'toggleAllSelect'
    },

    initialize: function () {
        this.listenTo(App.LoadFiles, 'all', this.refreshLoadData);
        this.listenTo(App.SelectedFiles, 'all', this.refreshSelectedData);
        App.Events.on('start-loading-process', this.startLoadingProcess, this);
        App.Events.on('stop-loading-process', this.stopLoadingProcess, this);
        App.Events.on('activate-add-to-pl-btn', this.activateAddToPlaylistBtn, this);
    },

    render: function () {
        this.$el.html( App.TmpEngine.getTemplate('fileLoaderListInfo') );

        this.$amount = this.$el.find('.amount');
        this.$selectedFiles = this.$el.find('.selected-files');
        this.$actionBtn = this.$el.find('.action-btn');
        this.$selectAll = this.$el.find('.select-all');

        this.delegateEvents(this.events);

        return this;
    },

    refreshLoadData: function () {
        this.$amount.html( App.LoadFiles.length );
    },

    refreshSelectedData: function () {
        this.$selectedFiles.html( App.SelectedFiles.length );
    },

    activateAddToPlaylistBtn: function () {
        this.$actionBtn
            .html('Add to playlist')
            .on('click', function () {
                if(!App.SelectedFiles.length) return;

                App.Events.trigger('enable-parse-loaded-files');
                App.Events.trigger('disable-modal-window');
            })
    },

    startLoadingProcess: function () {
        this.$actionBtn
            .html('Loading')
            .attr('disabled', 'disabled')
            .addClass('processing');
    },

    stopLoadingProcess: function () {
        this.$actionBtn
            .removeAttr('disabled')
            .removeClass('processing')
            .html('');

        this.$selectAll.removeClass('hidden');
    },

    toggleAllSelect: function () {
        App.SelectedFiles.destroyAllCollection();

        if( this.$selectAll.hasClass('selected-all')) {
            this.$selectAll.removeClass('selected-all');
            App.Events.trigger('deselect-all-loading-files');
        } else {
            this.$selectAll.addClass('selected-all');
            App.Events.trigger('select-all-loading-files');

            App.LoadFiles.each( function(model) {
                App.SelectedFiles.add( new Backbone.Model (model.toJSON() ) );
            });
        }
    }
});