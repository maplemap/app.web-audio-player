'use strict';

App.Views.FileLoader = Backbone.View.extend({
    className: App.Settings.classPrefix + '-file-loader',

    events: {

    },

    initialize: function () {
        this.fileLoaderListInfo = new App.Views.FileLoaderListInfo();
        this.fileList = new App.Views.FileList();
    },

    render: function () {
        this.$el.append( this.fileLoaderListInfo.render().el );
        this.$el.append( this.fileList.render().el );

        this.delegateEvents(this.events);

        return this;
    }
});
