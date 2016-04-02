'use strict';

App.Views.UploadFileList = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-fileList',

    initialize: function () {
        this.listenTo(App.UploadFiles, 'add', this.addOne);
        App.Events.on('disable-modal-window', this.disableFileList, this);
    },

    render: function () {
        this.initFileListScroll();

        return this;
    },

    addOne: function (model) {
        var view = new App.Views.File({
            model: model
        });

        this.$el.append( view.render().el );
    },

    addOneToCollection: function (model) {
        App.UploadFiles.add(model);
    },

    renderList: function (event) {
        var that = this;
        App.Tracks.each(function (model, indx) {
            that.addOne(model);
        });
    },

    disableFileList: function () {
        App.Events.trigger('hide-filelist');

        App.Events.trigger('file-upload-abort', 'cancel');
        App.UploadFiles.destroyAllCollection();
    },

    initFileListScroll: function () {
        this.$el.perfectScrollbar({
            minScrollbarLength: 50
        });
    }
});