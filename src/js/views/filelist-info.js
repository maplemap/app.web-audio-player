'use strict';

App.Views.FileListInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-fileList-info',

    events: {
        'click .cancel': 'cancelUpload',
        'click .upload': 'startUpload'
    },

    initialize: function () {
        this.listenTo(App.UploadFiles, 'all', this.render);
        App.Events.on('disable-modal-window', this.destroyAllCollection(), this);
    },

    render: function () {
        var data = {
            amount: App.UploadFiles.length
        };
        this.$el.html( App.TmpEngine.getTemplate('fileListInfo', data) );

        return this;
    },

    cancelUpload: function () {
        App.Events.trigger('disable-modal-window');
    },

    startUpload: function () {

    },

    destroyAllCollection: function () {
        App.UploadFiles.destroyAllCollection();
    }
});