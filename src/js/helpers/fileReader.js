'use strict';

var FileReader = (function ($) {
    var settings = {

    },
    $container = false,

    init = function (element) {
        $container = $(element);

        initEvents($container);
    },

    initEvents = function ($container) {
        var $inputFile = $container.find('input[type="file"]');

        $container.on('click', function (){
            $inputFile.on('click', function (e) { e.stopPropagation() })
                      .trigger('click');
        });

        $inputFile.on('change', fileHandler);
    },

    fileHandler = function (event) {
        console.log(event);
        var files = event.target.files;
        console.log(files);
    };


    return {
        init: init
    }
})(jQuery);