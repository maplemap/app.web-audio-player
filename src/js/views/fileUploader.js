'use strict';

App.Views.FileUploader = Backbone.View.extend({
    tagName: 'ul',
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
    },

    render: function () {
        this.$el.html( this.$dropZone );

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
        var allFiles = [];

        $.each(files, function(i, file) {
            var tempFile = {file: file, progressTotal: 0, progressDone: 0, valid: false};

            $.each( App.Settings.uploadFileTypes, function (i, type) {
                if(file.type === type) {
                    tempFile.valid = true;
                    allFiles.unshift( tempFile );
                }
            });
        });

        this.fileUpload( allFiles[0]['file'] );
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
