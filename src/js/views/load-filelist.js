'use strict';

App.Views.LoadFileList = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-fileList',

    initialize: function () {
        this.listenTo(App.LoadFiles, 'add', this.addOne);
        App.Events.on('disable-modal-window', this.disableFileList, this);
        App.Events.on('select-all-loading-files', this.selectAllFiles, this);
        App.Events.on('deselect-all-loading-files', this.deselectAllFiles, this);
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
        App.LoadFiles.add(model);
    },

    disableFileList: function () {
        App.Events.trigger('hide-filelist');
    },

    initFileListScroll: function () {
        this.$el.perfectScrollbar({
            minScrollbarLength: 50
        });
    },

    selectAllFiles: function () {
        this.$el.find('li').addClass('selected');
    },

    deselectAllFiles: function () {
        this.$el.find('li').removeClass('selected');
    }
});