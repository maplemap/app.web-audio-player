'use strict';
var app = app || {};


app.PlayerView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html( TmpEngine.render('player', {phrase: 'Hello!!!'}) );
        this.afterRendering();

        return this;
    },

    afterRendering: function () {
        this.initTimeline();
        this.initVolumeControl();
        this.initPlaylistScroll();
        this.initFileReader();
    },

    initTimeline: function () {
        this.$(".timeline").slider({
            range: "min",
            min: 0,
            max: 100
        });
    },

    initVolumeControl: function () {
        this.$(".volume").slider({
            range: "min",
            min: 0,
            max: 100,
            value: 20,
            slide: function( event, ui ) {
                //$( "#amount" ).val( ui.value );
            }
        });
    },

    initPlaylistScroll: function () {
        this.$('.' + CLASS_PREFIX + '-playlist').mCustomScrollbar({
            theme: "minimal-dark",
            scrollInertia: 0
        });
    },

    initFileReader: function () {
        FileCollector.init('#' + PLAYER_ID + ' #dropzone');
    }
});



'use strict';


var PLAYER_ID = 'webAudioPlayer',
    CLASS_PREFIX = 'wap';

var TmpEngine = (function () {

    var settings = {
            playerID: PLAYER_ID,
            classPrefix: CLASS_PREFIX
        },
        render = function (tmpName, data) {
            data = data || {};
            if( Templates[tmpName] ) return Templates[tmpName](data);
        },

        Templates = {
            player: function (options) {
                return '<div id="'+ settings.playerID +'">\
                            <div class="'+ settings.classPrefix +'-audiobox">\
                                <audio></audio>\
                            </div>\
                            <div class="'+ settings.classPrefix +'-playlist">\
                                 <ul class="'+ settings.classPrefix +'-tracker">\
                                    <li id="dropzone">\
                                        <span>Drop files here <br>or click to add in playlist.</span>\
                                    </li>\
                                 </ul>\
                            </div>\
                        </div>'
            },

            track: function (options) {
                return '<li>\
                          <span class="track-name">We’ll be coming back</span>\
                          <span class="track-duration">3:55</span>\
                        </li>'
            },
            
            information: function (options) {
                return '<div class="'+ settings.classPrefix +'-album-cover">\
                            <img class="cover-image active" src="https://upload.wikimedia.org/wikipedia/en/d/df/Calvin_Harris_-_18_Months.png" alt="Calvin_Harris_-_18_Months" />\
                        </div>\
                        <div class="track-name">We’ll be coming back</div>\
                        <div class="'+ settings.classPrefix +'-author">Calvin Harris</div>\
                        <div class="'+ settings.classPrefix +'-album-name">18 months</div>'
            }
        };

    return {
        render: render
    }

}());

//<div class="'+ settings.classPrefix +'-header">\
//<span class="'+ settings.classPrefix +'-logo"></span>\
//</div>\
//<div class="'+ settings.classPrefix +'-information">\
//<div class="'+ settings.classPrefix +'-album-cover">\
//<img class="cover-image active" src="https://upload.wikimedia.org/wikipedia/en/d/df/Calvin_Harris_-_18_Months.png" alt="Calvin_Harris_-_18_Months" />\
//</div>\
//<div class="track-name">We’ll be coming back</div>\
//<div class="'+ settings.classPrefix +'-author">Calvin Harris</div>\
//<div class="'+ settings.classPrefix +'-album-name">18 months</div>\
//</div>\

//<ul class="'+ settings.classPrefix +'-controls">\
//<li class="prev"></li>\
//<li class="play-pause"></li>\
//<li class="next"></li>\
//<li class="timeline"></li>\
//<li class="volume" title="volume"></li>\
//<li class="shuffle"></li>\
//<li class="repeat"></li>\
//</ul>\
//<div class="'+ settings.classPrefix +'-footer"> </div>\
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