'use strict';

var app = app || {};

App.UploadFiles = (function ($) {
    var settings = {
        drugAndDrop: false,
        fileMimeTypes: ['audio/mp3', 'audio/mpeg', 'audio/vnd.wave'],
        fileInput: '<input type="file" name="files[]" multiple>'
    },
    $container = false,
    $fileInput = false,
    callBack = false,

    init = function (element, callback) {
        $container = $(element);
        $container.append( settings.fileInput );
        $fileInput = $container.find('input[type="file"]');
        $fileInput.hide();
        callBack = callback;


        $container.on('click', Event.clickOnContainer);
        $fileInput.on('change', Event.changeOfFileInput);

        if(settings.drugAndDrop) {
            $container.on('dragover', Event.dragOver);
            $container.on('drop', Event.drop);
            $container.on('dragenter', Event.drugEnter);
            $container.on('dragleave', Event.drugLeave);
        }
    },

    Event = {

        clickOnContainer: function () {
            $fileInput.on('click', function (e) { e.stopPropagation() })
                .trigger('click');
        },

        changeOfFileInput: function (e) {
            var files = e.target.files;

            collectFiles(files);
        },

        drop: function (e) {
            e.stopPropagation();
            e.preventDefault();

            var files = e.originalEvent.dataTransfer.files;

            $container.removeClass('drag-active');

            collectFiles(files);
        },

        dragOver: function (e) {
            e.stopPropagation();
            e.preventDefault();

            e.originalEvent.dataTransfer.dropEffect = "copy";
        },

        drugEnter: function () {
            $container.addClass('drag-active');
        },

        drugLeave: function () {
            $container.removeClass('drag-active');
        }
    },

    collectFiles = function(files) {
        var allFiles = [];
        $.each(files, function(i, file) {
            var temp = {file: file, progressTotal: 0, progressDone: 0, valid: false};

            $.each(settings.fileMimeTypes, function (i, type) {
                if(file.type == type) allFiles.unshift(temp);
            });
        });

        callBack(allFiles);
    },

    upload = function () {
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        console.log(percentComplete);

                        if (percentComplete === 100) {

                        }

                    }
                }, false);

                return xhr;
            },
            url: posturlfile,
            type: "POST",
            data: JSON.stringify(fileuploaddata),
            contentType: "application/json",
            dataType: "json",
            success: function(result) {
                console.log(result);
            }
        });

    };

    return {
        init: init
    }

})(jQuery);