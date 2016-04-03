'use strict';

App.Views.FileLoader = Backbone.View.extend({
    className: App.Settings.classPrefix + '-file-loader',

    initialize: function () {
        App.Events.on('start-loading-process', this.filesLoading, this);

        this.fileLoaderListInfo = new App.Views.FileLoaderListInfo();
        this.fileList = new App.Views.LoadFileList();
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
                App.Events.trigger('stop-loading-process');
                console.log(xhr);
            },
            success: function(data) {
                App.Events.trigger('stop-loading-process');
                that.dataHandler(data);
            }
        });
    },

    dataHandler: function (data) {
        var that = this;
        this.$fileList.html('');

        if(data && data.length) {
            App.Events.trigger('show-filelist');

            _.each(data, function(fileModel, i) {
                if(fileModel.name) that.fileList.addOneToCollection( fileModel );
            });

            App.Events.trigger('activate-add-to-pl-btn');

        } else {
            this.$fileList.html( App.TmpEngine.getTemplate('listMessage', this.messages["files_not_found"]) );
        }
    },

    messages: {
        "files_not_found": "Files not found. Please, upload files" //ToDo: Delete if we close loading files
    }
});
