'use strict';

App.Views.FileListInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-fileList-info',

    events: {
        'click .cancel': 'cancelUpload',
        'click .upload': 'startUpload'
    },

    initialize: function () {

    },

    render: function () {
        this.$el.html( App.TmpEngine.getTemplate('fileListInfo') );

        return this;
    },

    cancelUpload: function () {
        App.Events.trigger('disable-modal-window');
    },

    startUpload: function () {

    }
});