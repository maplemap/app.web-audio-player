'use strict';

App.Views.FileList = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-file-list',

    initialize: function () {
        this.listenTo(App.UploadFiles, 'add', this.addOne);
    },

    render: function () {
        var that = this;

        //$.each(tracks, function (i, track) {
        //    that.addOneToCollection(track);
        //});

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

    initFileListScroll: function () {
        this.$el.perfectScrollbar({
            minScrollbarLength: 50
        });
    }
});