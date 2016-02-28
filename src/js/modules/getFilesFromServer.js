'use strict';

var FilesDownload = (function () {
    var settings = {
        urlServer: 'http://php-file-server.local/index.php'
    },
    $playlist = false,
    $fileList = false,

    init = function ($player) {
        $playlist = $player.find('.playlist');
        $playlist.append( );

        $fileList = $playlist.find('.' + settings.fileListClass);

        initEvents();
    },

    initEvents = function () {
        $('.get-files').on('click', function () {
            var $modalWindow = $playlist.find('.modal-window');

            $modalWindow.toggleClass('active');

            if($modalWindow.hasClass('active')) getFilesList();
        });

        $fileList.find('.cancel').on('click', function () {
            $fileList.removeClass('active');
        });
    },

    getFilesList = function () {
        $.ajax({
            type: "GET",
            url: settings.urlServer,
            cache: false,
            beforeSend: function () {

            },
            success: function(result){
                console.log(result)
            }
        });
    };

    return {
        init: init
    }
})();