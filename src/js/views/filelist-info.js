'use strict';

App.Views.FileListInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-fileList-info',

    events: {
        'click .upload': 'startUpload'
    },

    initialize: function () {
        this.listenTo(App.UploadFiles, 'all', this.changeFileAmount);
        App.Events.on('disable-modal-window', this.destroyAllCollection, this);
        App.Events.on('finish-upload', this.finishUpload, this);
    },

    render: function () {
        var data = {
            amount: App.UploadFiles.length
        };
        this.$el.html( App.TmpEngine.getTemplate('fileListInfo', data) );
        this.$uploadBtn = this.$el.find('.upload');

        this.delegateEvents(this.events);

        return this;
    },

    changeFileAmount: function () {
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
    },

    destroyAllCollection: function () {
        App.UploadFiles.destroyAllCollection();
    }
});