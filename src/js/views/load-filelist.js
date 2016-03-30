'use strict';

App.Views.LoadFileList = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-fileList',

    initialize: function () {
        this.listenTo(App.LoadFiles, 'add', this.addOne);
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
        App.LoadFiles.add(model);
    },

    disableFileList: function () {
        App.Events.trigger('hide-filelist');
    },

    initFileListScroll: function () {
        this.$el.perfectScrollbar({
            minScrollbarLength: 50
        });
    }
});