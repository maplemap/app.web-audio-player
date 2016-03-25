'use strict';

App.Views.FileUploader = Backbone.View.extend({
    className: App.Settings.classPrefix + '-file-uploader',

    events: {
        'click [class*="-dropzone"]': 'clickDropzone',
        'change input[type="file"]': 'changeFileInput',
        'dragover [class*="-dropzone"]': 'dragOverDropzone',
        'drop [class*="-dropzone"]': 'dropDropzone',
        'dragenter [class*="-dropzone"]': 'drugEnterDropzone',
        'dragleave [class*="-dropzone"]': 'drugLeaveDropzone'
    },

    initialize: function () {
        this.$dropZone = $( App.TmpEngine.getTemplate('dropZone') );
        this.fileListInfo = new App.Views.FileListInfo();
        this.fileList = new App.Views.FileList();
        this.currentFileIndex = 0;

        App.Events.on('show-filelist', this.showFilelist, this);
        App.Events.on('hide-filelist', this.hideFilelist, this);
        App.Events.on('start-upload', this.queueUpload, this);
    },

    render: function () {
        this.$el.append( this.$dropZone );
        this.$el.append( this.fileListInfo.render().el );
        this.$el.append( this.fileList.render().el );

        this.delegateEvents(this.events);

        return this;
    },

    showFilelist: function () {
        this.$el.addClass('show-filelist');
    },

    hideFilelist: function () {
        this.$el.removeClass('show-filelist');
    },

    clickDropzone: function (e) {
        $(e.target).find('input[type="file"]').on('click', function (e) { e.stopPropagation() })
                   .trigger('click');
    },

    changeFileInput: function (e) {
        var files = e.target.files;

        this.collectUploadFiles(files);
    },

    dragOverDropzone: function (e) {
        e.stopPropagation();
        e.preventDefault();

        e.originalEvent.dataTransfer.dropEffect = "copy";
    },

    dropDropzone: function (e) {
        e.stopPropagation();
        e.preventDefault();

        var files = e.originalEvent.dataTransfer.files;
        this.collectUploadFiles(files);

        $(e.target).removeClass('drag-active');
    },

    drugEnterDropzone: function (e) {
        $(e.target).addClass('drag-active');
    },

    drugLeaveDropzone: function (e) {
        $(e.target).removeClass('drag-active');
    },

    collectUploadFiles: function(files) {
        var that = this;

        $.each(files, function(i, file) {
            var fileModel = {file: file, name: file.name, progressTotal: 0, progressDone: 0};

            that.validateFile(file.type, function (validate) {
                if(validate) that.fileList.addOneToCollection(fileModel);
            });
        });

        if(App.UploadFiles.length) App.Events.trigger('show-filelist');
    },

    validateFile: function (filetype, callback) {
        var validate = false;

        $.each( App.Settings.uploadFileTypes, function (i, type) {
            if(filetype === type) validate = true;
        });

        if (typeof callback === 'function') callback(validate);
    },

    queueUpload: function () {
        if(App.UploadFiles.length && App.UploadFiles.length !== this.currentFileIndex) {
            this.fileUpload( App.UploadFiles.models[this.currentFileIndex] );
            this.currentFileIndex ++;
        } else {
            this.currentFileIndex = 0
        }
    },

    fileUpload: function (model) {
        var that = this,
            data = new FormData();
        data.append('file', model.get('file'));

        $.ajax({
            url: '/server/php/upload.php?files',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'text',
            contentType: false,
            processData: false,
            xhr: function() {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", function(e) {
                    if (e.lengthComputable) {
                        var percentComplete = e.loaded / e.total;
                        percentComplete = parseInt(percentComplete * 100);
                        model.set('progressDone', percentComplete);

                        if (percentComplete === 100) that.queueUpload();
                    }
                }, false);

                return xhr;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            },
            success: function(response){
                console.log(response); // display response from the PHP script, if any
            }
        });
    }
});
