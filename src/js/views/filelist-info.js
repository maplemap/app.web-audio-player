'use strict';

App.Views.FileListInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-fileList-info',

    events: {
        'click .upload': 'startUploadEvent'
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

        this.delegateEvents(this.events);

        return this;
    },

    startUploadEvent: function () {
        App.Events.trigger('start-upload');
    },

    destroyAllCollection: function () {
        App.UploadFiles.destroyAllCollection();
    }
});