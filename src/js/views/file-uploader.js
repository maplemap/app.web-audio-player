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
        App.Events.on('file-upload-abort', this.fileUploadAbort, this);
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

        _.each(files, function(file, i) {
            var fileModel = {file: file, name: file.name, progressTotal: 0, progressDone: 0};

            that.validateFile(file.type, function (validate) {
                if(validate) that.fileList.addOneToCollection(fileModel);
            });
        });

        if(App.UploadFiles.length) App.Events.trigger('show-filelist');
    },

    validateFile: function (filetype, callback) {
        var validate = false;

        _.each( App.Settings.uploadFileTypes, function (type, i) {
            if(filetype === type) validate = true;
        });

        if (typeof callback === 'function') callback(validate);
    },

    queueUpload: function () {
        var collArray = App.UploadFiles.toJSON();

        for (var i = 0, max = collArray.length; i < max; i++) {
            if(collArray[i]['progressDone'] === 0) {
                var model = App.UploadFiles.where({ index: collArray[i]['index'] });

                return this.fileUpload(model[0]);
            }
        }
    },

    fileUpload: function (model) {
        var that = this,
            data = new FormData();

        data.append('file', model.get('file'));
        this.currentUploadFile = model.get('index');

        $.ajax({
            url: App.Settings.phpServer.url,
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'text',
            contentType: false,
            processData: false,
            xhr: function() {
                return that.fileUploadProgress(model);
            },
            error: function(e, jqXHR, ajaxSettings, thrownError) {
                console.log(jqXHR.status);
                //ToDo: In the case of file upload interruption creates a message with the contents 'error'
            },
            success: function(response){
                console.log(model.get('file')['name'] + ' upload');
            }
        });
    },

    fileUploadProgress: function (model) {
        var that = this;
            this.xhr = new window.XMLHttpRequest();

        this.xhr.upload.addEventListener("progress", function(e) {
            if (e.lengthComputable) {
                var percentComplete = e.loaded / e.total;
                percentComplete = parseInt(percentComplete * 100);

                model.set('progressDone', percentComplete);

                if (percentComplete === 100) that.queueUpload();
            }
        }, false);

        return this.xhr;
    },
    
    fileUploadAbort: function (index) {
        if(this.xhr && index === this.currentUploadFile) {
            this.xhr.abort();
            console.log(this.xhr);

            this.queueUpload();
        }
    }
});
