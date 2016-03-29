'use strict';

App.Views.FileLoaderListInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-file-loader-List-info',

    events: {

    },

    initialize: function () {
        App.Events.on('stop-loading-process', this.stopLoadingProcess, this);
    },

    render: function () {
        //var data = {
        //    amount: App.UploadFiles.length
        //};
        this.$el.html( App.TmpEngine.getTemplate('fileLoaderListInfo') );

        this.$addToPlaylistBtn = this.$el.find('.add-to-pl');

        this.delegateEvents(this.events);

        return this;
    },

    stopLoadingProcess: function () {
        this.$addToPlaylistBtn
            .removeAttr('disabled')
            .removeClass('processing');
    }
});