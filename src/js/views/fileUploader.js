'use strict';

App.Views.FileUploader = Backbone.View.extend({
    tagName: 'ul',
    className: App.CLASS_PREFIX + '-file-uploader',

    events: {
        'click [class*="-dropzone"]': 'clickDropzone',
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

    dragOverDropzone: function (e) {
        e.stopPropagation();
        e.preventDefault();

        e.originalEvent.dataTransfer.dropEffect = "copy";
    },

    dropDropzone: function (e) {
        e.stopPropagation();
        e.preventDefault();

        var files = e.originalEvent.dataTransfer.files;
        console.log(files);

        $(e.target).removeClass('drag-active');
    },

    drugEnterDropzone: function (e) {
        $(e.target).addClass('drag-active');
    },

    drugLeaveDropzone: function (e) {
        $(e.target).removeClass('drag-active');
    }
});