'use strict';

App.Views.FileLoaderListInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-file-loader-List-info',

    events: {
        'click .upload': 'startUpload'
    },

    initialize: function () {
        //this.listenTo(App.UploadFiles, 'all', this.refreshData);
        //App.Events.on('disable-modal-window', this.destroyAllCollection, this);
        //App.Events.on('finish-upload', this.finishUpload, this);
    },

    render: function () {
        //var data = {
        //    amount: App.UploadFiles.length
        //};
        this.$el.html( App.TmpEngine.getTemplate('fileLoaderListInfo') );

        this.delegateEvents(this.events);

        return this;
    }
});