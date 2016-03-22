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

        App.Events.on('show-filelist', this.showFilelist, this);
        App.Events.on('hide-filelist', this.hideFilelist, this);
        App.Events.on('start-upload', this.queueUpload, this);
    },

    render: function () {
        this.$el.append( this.$dropZone );
        this.$el.append( this.fileListInfo.render().el );
        this.$el.append( this.fileList.render().el );

        return this;
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
        App.Events.trigger('show-filelist');

        var that = this;

        $.each(files, function(i, file) {
            var fileModel = {file: file, name: file.name, progressTotal: 0, progressDone: 0};

            that.validateFile(file.type, function (validate) {
                if(validate) that.fileList.addOneToCollection(fileModel);
            });
        });
    },

    validateFile: function (filetype, callback) {
        var validate = false;

        $.each( App.Settings.uploadFileTypes, function (i, type) {
            if(filetype === type) validate = true;
        });

        if (typeof callback === 'function') callback(validate);
    },

    queueUpload: function () {
        if(App.UploadFiles.length) {
            App.UploadFiles.toJSON();
        }
    },

    showFilelist: function () {
        this.$el.addClass('show-filelist');
    },

    hideFilelist: function () {
        this.$el.removeClass('show-filelist');
    },

    fileUpload: function (file) {
        console.log(file);
        var data = new FormData();
        data.append('file', file);

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
                        console.log(percentComplete);

                        if (percentComplete === 100) {

                        }
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
