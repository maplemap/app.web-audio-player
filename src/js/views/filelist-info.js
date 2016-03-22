'use strict';

App.Views.FileListInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-fileList-info',

    events: {
        'click .upload': 'startUpload'
    },

    initialize: function () {
        this.listenTo(App.UploadFiles, 'all', this.render);
        App.Events.on('disable-modal-window', this.destroyAllCollection, this);
    },

    render: function () {
        var data = {
            amount: App.UploadFiles.length
        };
        this.$el.html( App.TmpEngine.getTemplate('fileListInfo', data) );

        return this;
    },

    //backToDropzone: function () {
    //    App.Events.trigger('hide-filelist');
    //},

    startUpload: function () {
        App.Events.trigger('start-upload');
    },

    destroyAllCollection: function () {
        App.UploadFiles.destroyAllCollection();
    }
});