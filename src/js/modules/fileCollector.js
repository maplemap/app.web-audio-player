'use strict';

var FileCollector = (function ($) {
    var settings = {
        drugAndDrop: true,
        fileInput: '<input type="file" name="files[]" multiple>'
    },
    allFiles = [],
    $container = false,
    $fileInput = false,

    init = function (element) {
        $container = $(element);
        $container.append( settings.fileInput );
        $fileInput = $container.find('input[type="file"]');


        $container.on('click', Event.clickOnContainer);
        $fileInput.on('change', Event.changeOfFileInput);

        if(settings.drugAndDrop) {
            $container.on('dragover', Event.dragOverHandler);
            $container.on('drop', Event.dropHandler);
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

        dropHandler: function (e) {
            e.stopPropagation();
            e.preventDefault();

            var files = e.originalEvent.dataTransfer.files;

            collectFiles(files);
        },

        dragOverHandler: function (e) {
            e.stopPropagation();
            e.preventDefault();

            e.originalEvent.dataTransfer.dropEffect = "copy";
            console.log('dfgdfg')
        }
    },

    collectFiles = function(files) {
        $.each(files, function(i, file) {
            var temp = {file: file, progressTotal: 0, progressDone: 0, element: null, valid: false};

            temp.valid = (file.type == 'image/png'
                || file.type == 'image/jpeg'
                || file.type == 'image/jpg') && file.size / 1024 / 1024 < 2;

            //temp.element = baseClass.attachFileToView(temp);
            allFiles.unshift(temp);

            console.log(allFiles);
        });
    };


    return {
        init: init
    }

})(jQuery);