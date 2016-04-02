'use strict';

App.Views.FileUploadListInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-file-upload-list-info',

    events: {
        'click .upload': 'startUpload'
    },

    initialize: function () {
        this.listenTo(App.UploadFiles, 'all', this.refreshData);
        App.Events.on('finish-upload', this.finishUpload, this);
    },

    render: function () {
        var data = {
            amount: App.UploadFiles.length
        };
        this.$el.html( App.TmpEngine.getTemplate('fileUploadListInfo', data) );
        this.$uploadBtn = this.$el.find('.upload');

        this.delegateEvents(this.events);

        return this;
    },

    refreshData: function () {
        this.$el.find('.amount').html( App.UploadFiles.length );
    },

    startUpload: function () {
        this.$uploadBtn
            .attr('disabled', 'disabled')
            .addClass('processing');

        App.Events.trigger('start-upload');
    },

    finishUpload: function () {
        this.$uploadBtn
            .removeAttr('disabled')
            .removeClass('processing');
    }
});