'use strict';

App.Views.FileLoader = Backbone.View.extend({
    className: App.Settings.classPrefix + '-file-loader',

    initialize: function () {
        App.Events.on('enable-loader-window', this.filesLoading, this);

        this.fileLoaderListInfo = new App.Views.FileLoaderListInfo();
        this.fileList = new App.Views.FileList();
    },

    render: function () {
        this.$fileList = $( this.fileList.render().el );

        this.$el.append( this.fileLoaderListInfo.render().el );
        this.$el.append( this.$fileList );

        this.delegateEvents(this.events);

        return this;
    },

    filesLoading: function () {
        var that = this;

        $.ajax({
            url: App.Settings.phpServer.loadUrl,
            type: 'GET',
            cache: false,
            dataType: 'json',
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr);
            },
            success: function(data){
                that.dataHandler(data);
            }
        });
    },

    dataHandler: function (data) {
        console.log(data);
        var notFoundMsg = 'Files on the server not found. Please, upload files';

        if(!data || !data.length) {
            App.Events.trigger('stop-loading-process');
            this.$fileList.html( App.TmpEngine.getTemplate('listMessage', notFoundMsg) );
        } else {

        }
    }
});
