'use strict';

var App = {
    Models: {},
    Collections: {},
    Views: {},
    Events: _.extend({}, Backbone.Events),
    Helper: {}
};

//settings
App.Settings = {
    playerID: 'webAudioPlayer',
    classPrefix: 'wap',
    uploadFileTypes: ['audio/mp3', 'audio/mpeg'],
    phpServer: {
        uploadUrl: '/server/php/upload.php',
        loadUrl: '/server/php/load.php'
    }
};
'use strict';

App.TmpEngine = (function () {

    var getTemplate = function (tmpName, data) {
            data = data || {};
            if( Templates[tmpName] ) return Templates[tmpName](data);
        },

        Templates = {

            playbox: function () {
                return '<div class="album-cover">\
                            <img src="../dist/img/default-album-cover.png" alt="album-cover">\
                        </div>'
            },

            audiobox: function () {
                return '<div class="'+ App.Settings.classPrefix +'-audiobox">\
                            <audio></audio>\
                        </div>';
            },

            playlistInfo: function (data) {
                return '<li class="duration"><span>'+ data.duration +'</span></li>\
                        <li class="amount"><span>'+ data.amount +'</span></li>\
                        <li class="info hidden"></li>\
                        <li class="stop-adding-tracks hidden"><button>stop process</button></li>\
                        <li class="tracks-delete"><button>delete all</button></li>'
            },

            track: function (data) {
                return '<span class="name" title="' + data.name + '">' + data.name + '</span>\
                        <span class="delete" title="delete track"></span>\
                        <span class="duration">' + data.duration + '</span>'
            },

            tools: function () {
                return '<li class="upload-files" data-event="enable-upload-window" title="upload files to server"></li>\
                        <li class="get-files" data-event="enable-loader-window" title="get files from server"></li>'
            },
            
            information: function (options) {
                return '<div class="'+ App.Settings.classPrefix +'-album-cover">\
                            <img class="cover-image active" src="https://upload.wikimedia.org/wikipedia/en/d/df/Calvin_Harris_-_18_Months.png" alt="Calvin_Harris_-_18_Months" />\
                        </div>\
                        <div class="track-name">We’ll be coming back</div>\
                        <div class="'+ App.Settings.classPrefix +'-author">Calvin Harris</div>\
                        <div class="'+ App.Settings.classPrefix +'-album-name">18 months</div>'
            },

            listMessage: function (message) {
                return '<li class="list-message">' + message + '</li>'
            },

            fileList: function () {
                return '<ul class="' + App.Settings.classPrefix + '-file-list"></ul>'
            },

            fileUploadListInfo: function (data) {
                return '<li class="amount">'+ data.amount +'</li>\
                        <li><button class="upload">Upload</button></li>'
            },

            fileLoaderListInfo: function (data) {
                return  '<li class="amount">0</li>\
                        <li class="selected-files">0</li>\
                        <li><button class="action-btn"></button></li>\
                        <li class="select-all hidden"><button>choose all</button></li>'
            },

            file: function (data) {
                return '<span class="name" title="' + data.name + '">' + data.name + '</span>\
                        <span class="delete" title="delete file"></span>\
                        <span class="choose" title="check file"></span>\
                        <span class="progressbar">0%</span>'
            },
            
            modalWindow: function () {
                return '<span class="close" title="close"></span>\
                        <div class="modal-content">'
            },

            dropZone: function () {
                return '<div class="'+ App.Settings.classPrefix +'-dropzone">\
                            Drop files(only mp3) here <br>or click to load on server.\
                            <input type="file" name="files[]" multiple>\
                        </div>'
            }
        };

    return {
        getTemplate: getTemplate
    }

}());

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




//<li class="get-files" title="get files from server"></li>
'use strict';

App.Views.Track = Backbone.View.extend({
    tagName: 'li',

    events: {
        'click .delete': 'destroy'
    },

    initialize: function () {
        this.listenTo(this. model, 'change', this.render);
        this.model.on('destroy', this.remove, this);
    },

    render: function () {
        this.$el.html( App.TmpEngine.getTemplate('track', this.model.toJSON()) );

        return this;
    },

    remove: function () {
      this.$el.remove();
    },

    destroy: function () {
        this.model.destroy();
    }
});
'use strict';

App.Models.Track = Backbone.Model.extend({
    defaults: {
        artist: '',
        name: '',
        link: '',
        duration: ''
    }
});
'use strict';

App.Models.File = Backbone.Model.extend({
    defaults: {
        index: ''
    },

    initialize: function () {
        this.set('index', App.Helper.fileCounter);
        App.Helper.fileCounter += 1;
    }
});
'use strict';


App.Collections.Tracks = Backbone.Collection.extend({
    model: App.Models.Track,
    localStorage: new Backbone.LocalStorage('web-player'),

    getTotalTime: function () {
        var totalSeconds = 0;

        this.each(function (obj, index) {
            var timeArray = obj.get('duration').split(':');
            totalSeconds += parseInt(timeArray[0], 10) * 60 + parseInt(timeArray[1], 10);
        });


        return this.getTimeFromSeconds(totalSeconds, 'hours');
    },

    getTimeFromSeconds: function (seconds, flag) {
        var hours, minutes, time;

        hours   = Math.floor(seconds / 3600);
        minutes = Math.floor((seconds - (hours * 3600)) / 60);
        seconds = seconds - (hours * 3600) - (minutes * 60);

        hours = (hours && hours < 10) ? '0' + hours + ':' : '';

        if (hours) {
            if (hours < 10) hours =  '0' + hours + ':';
        } else {
            hours = (flag === 'hours') ? '00:' : '';
        }
        if (minutes < 10) {minutes = '0' + minutes;}
        if (seconds < 10) {seconds = '0' + seconds;}

        time = hours + minutes + ':' + seconds;

        return time;
    },

    destroyAllCollection: function () {
        _.invoke( this.toArray(), 'destroy' );
    }
});

App.Tracks = new App.Collections.Tracks();
'use strict';


App.Collections.Files = Backbone.Collection.extend({
    model: App.Models.File,

    destroyAllCollection: function () {
        _.invoke( this.toArray(), 'destroy' );
    }
});

App.UploadFiles = new App.Collections.Files();
App.LoadFiles = new App.Collections.Files();
App.SelectedFiles = new App.Collections.Files();
App.ParseFiles = new App.Collections.Files();
'use strict';

App.Views.Player = Backbone.View.extend({
    id: App.Settings.playerID,

    initialize: function () {
        this.toolsView = new App.Views.Tools();
        this.playlistView = new App.Views.Playlist;
        this.playBoxView = new App.Views.Playbox;

        this.render();
    },
    render: function () {
        this.$el.append( this.playBoxView.$el );
        this.$el.append( this.playlistView.$el );
        this.$el.append( this.toolsView.$el );

        return this;
    }
});

'use strict';

App.Views.Playlist = Backbone.View.extend({
    className: App.Settings.classPrefix + '-playlist',

    initialize: function () {
        this.trackerView = new App.Views.TrackList();
        this.playlistInfoView = new App.Views.PlaylistInfo();
        this.modalWindow = ( new App.Views.ModalWindow() );

        App.Events.on('show-filelist', this.showFilelist, this);
        App.Events.on('hide-filelist', this.hideFilelist, this);

        this.render();
    },

    render: function () {
        this.$el.append( this.playlistInfoView.render().el );
        this.$el.append( this.trackerView.render().el );
        this.$el.append( this.modalWindow.render().el );

        return this;
    },

    showFilelist: function () {
        this.$el.addClass('show-filelist');
    },

    hideFilelist: function () {
        this.$el.removeClass('show-filelist');
    }
});
'use strict';

App.Views.Playbox = Backbone.View.extend({
    className: App.Settings.classPrefix + '-playbox',

    initialize: function () {
        this.$audioBox = $( App.TmpEngine.getTemplate('audiobox') );
        this.playbox = App.TmpEngine.getTemplate('playbox');

        this.render();
    },

    render: function () {
        this.$el.append( this.$audioBox );
        this.$el.append( this.playbox );

        this.$albumCover = this.$el.find('.album-cover');

        return this;
    }
});

//initFileUpload: function () {
//    var that = this;
//
//    app.UploadFiles.init('#' + app.PLAYER_ID + ' .upload-files', function (allFiles) {
//        $.each(tracks, function (i, track) {
//            that.addOneToCollection(track);
//        })
//    });
//},

//initTimeline: function () {
//    this.$(".timeline").slider({
//        range: "min",
//        min: 0,
//        max: 100
//    });
//},
//
//initVolumeControl: function () {
//    this.$(".volume").slider({
//        range: "min",
//        min: 0,
//        max: 100,
//        value: 20,
//        slide: function( event, ui ) {
//            //$( "#amount" ).val( ui.value );
//        }
//    });
//}
'use strict';

App.Views.PlaylistInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-playlist-info',

    events: {
        'click .tracks-delete': 'destroyAllCollection',
        'click .stop-adding-tracks': 'disableParseLoadedFilesEvent'
    },

    initialize: function () {
        this.listenTo(App.Tracks, 'all', this.refreshData);
        App.Events.on('start-audio-parsing', this.startParseProcess, this);
        App.Events.on('stop-audio-parsing', this.stopParseProcess, this);
    },

    render: function () {
        var data = {
            amount: App.Tracks.length,
            duration: App.Tracks.getTotalTime()
        };

        this.$el.html( App.TmpEngine.getTemplate('playlistInfo', data) );
        this.$amount = this.$el.find('.amount');
        this.$duration = this.$el.find('.duration');
        this.$info = this.$el.find('.info');
        this.$stopAddTracks = this.$el.find('.stop-adding-tracks');
        this.$tracksDelete = this.$el.find('.tracks-delete');

        return this;
    },

    refreshData: function () {
        this.$amount.html( App.Tracks.length );
        this.$duration.html( App.Tracks.getTotalTime() );
    },

    startParseProcess: function () {
        this.$info.html('Adding tracks')
                  .removeClass('hidden')
                  .addClass('processing');

        this.$tracksDelete.addClass('hidden');
        this.$stopAddTracks.removeClass('hidden');
    },

    stopParseProcess: function () {
        this.$info.addClass('hidden')
                  .html('')
                  .removeClass('processing');

        this.$tracksDelete.removeClass('hidden');
        this.$stopAddTracks.addClass('hidden');
    },

    disableParseLoadedFilesEvent: function () {
        App.Events.trigger('disable-parse-loaded-files');
    },

    destroyAllCollection: function () {
        console.log('ToDo: Add load process of destroying'); //ToDo: Add load process of destroying
        App.Events.trigger('start-destroying-of-tracks-collection');
        App.Tracks.destroyAllCollection();
    }
});
'use strict';

App.Views.ModalWindow = Backbone.View.extend({
    className: App.Settings.classPrefix + '-modal-window',
    template: $( App.TmpEngine.getTemplate('modalWindow') ),

    initialize: function () {
        App.Events.on('enable-upload-window', this.enableUploadWindow, this);
        App.Events.on('enable-loader-window', this.enableLoaderWindow, this);
        App.Events.on('disable-modal-window', this.disable, this);

        this.render();
    },

    render: function () {
        this.$el.append( this.template );
        this.$closeButton = this.$el.find('.close');
        this.$modalContent = this.$el.find('.modal-content');

        return this;
    },

    enable: function (content) {
        this.$el.addClass('active');
        this.$closeButton.on('click', function (e) { //ToDo: refactoring
            e.stopPropagation();
            App.Events.trigger('disable-modal-window');
        });

        this.$modalContent.html(content);
    },

    disable: function () {
        this.$el.removeClass('active');
        this.$closeButton.off('click');
        this.$modalContent.html('');
    },

    enableUploadWindow: function () {
        if( !this.fileUploader ) {
            this.fileUploader = new App.Views.FileUploader();
        }

        this.enable( this.fileUploader.render().el );
    },
    
    enableLoaderWindow: function () {
        App.LoadFiles.destroyAllCollection();

        if( !this.fileLoader ) {
            this.fileLoader = new App.Views.FileLoader();
        }

        this.enable( this.fileLoader.render().el );
        App.Events.trigger('start-loading-process');
    }
});
'use strict';

App.Views.TrackList = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-track-list',

    initialize: function () {
        this.listenTo(App.Tracks, 'add', this.addOne);
        App.Events.on('add-files-to-playlist', this.render, this);

        App.Tracks.fetch();
    },

    render: function () {
        var that = this;
        //ToDo: Add check for the presence of file on server

        $.each(App.LoadFiles.toJSON(), function (i, track) {
            that.addOneToCollection(track);
        });

        App.Helper.initScroll( this.$el );

        return this;
    },

    addOne: function (model) {
        var view = new App.Views.Track({
            model: model
        });

        model.save();
        this.$el.append( view.render().el );
    },

    addOneToCollection: function (track) {
        App.Tracks.add(track);
    },

    renderList: function (event) {
        var that = this;
        App.Tracks.each(function (model, indx) {
            that.addOne(model);
        });
    }
});
'use strict';

App.Views.Tools = Backbone.View.extend({

    tagName: 'ul',
    className: App.Settings.classPrefix + '-tools',
    
    events: {
        'click li': 'toggleTools'
    },
    
    initialize: function () {
        App.Events.on('disable-modal-window', this.removeActiveClasses, this);

        this.$tools = $( App.TmpEngine.getTemplate('tools') );

        this.render();
    },

    render: function () {
        this.$el.append( this.$tools );

        return this;
    },

    toggleTools: function (e) {
        var $target = $(e.target),
            event = $target.data('event');

        if( $target.hasClass('active') ) {
            App.Events.trigger('disable-modal-window');
        } else {
            App.Events.trigger('disable-modal-window');
            App.Events.trigger( event );
            $target.addClass('active');
        }
    },

    removeActiveClasses: function () {
        this.$el.find('li').removeClass('active');
    }
});

'use strict';

App.Views.FileLoader = Backbone.View.extend({
    className: App.Settings.classPrefix + '-file-loader',

    initialize: function () {
        App.Events.on('start-loading-process', this.filesLoading, this);

        this.fileLoaderListInfo = new App.Views.FileLoaderListInfo();
        this.fileList = new App.Views.LoadFileList();
    },

    render: function () {
        this.$fileList = $( this.fileList.render().el );

        this.$el.append( this.fileLoaderListInfo.render().el );
        this.$el.append( this.$fileList );

        this.delegateEvents(this.events);

        return this;
    },

    filesLoading: function () {

        var that = this;
        console.log('start loading');
        $.ajax({
            url: App.Settings.phpServer.loadUrl,
            type: 'GET',
            cache: true,
            dataType: 'json',
            error: function(xhr, ajaxOptions, thrownError) {
                App.Events.trigger('stop-loading-process');
                console.log(xhr);
            },
            success: function(data) {
                App.Events.trigger('stop-loading-process');
                that.dataHandler(data);
            }
        });
    },

    dataHandler: function (data) {
        var that = this;
        this.$fileList.html('');

        if(data && data.length) {
            App.Events.trigger('show-filelist');

            _.each(data, function(fileModel, i) {
                if(fileModel.name) that.fileList.addOneToCollection( fileModel );
            });

            App.Events.trigger('activate-add-to-pl-btn');

        } else {
            this.$fileList.html( App.TmpEngine.getTemplate('listMessage', this.messages["files_not_found"]) );
        }
    },

    messages: {
        "files_not_found": "Files not found. Please, upload files"
    }
});

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
        this.$inputTypeFile = this.$dropZone.find('input[type="file"]');
        this.fileUploadListInfo = new App.Views.FileUploadListInfo();
        this.fileList = new App.Views.UploadFileList();

        App.Events.on('show-filelist', this.showFilelist, this);
        App.Events.on('hide-filelist', this.hideFilelist, this);
        App.Events.on('start-upload', this.queueUpload, this);
        App.Events.on('file-upload-abort', this.fileUploadAbort, this);
        App.Events.on('disable-modal-window', this.cleaninputTypeFile, this);
    },

    render: function () {
        this.$el.append( this.$dropZone );
        this.$el.append( this.fileUploadListInfo.render().el );
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
        this.$inputTypeFile.on('click', function (e) { e.stopPropagation() })
                   .trigger('click');
    },

    cleaninputTypeFile: function () {
        this.$inputTypeFile.val('');
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

        App.Events.trigger('finish-upload');
    },

    fileUpload: function (model) {
        var that = this,
            data = new FormData();

        data.append('file', model.get('file'));
        this.currentUploadFile = model.get('index');

        $.ajax({
            url: App.Settings.phpServer.uploadUrl,
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'text',
            contentType: false,
            processData: false,
            xhr: function() {
                return fileUploadProgress(model);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr);
                //ToDo: In the case of file upload interruption creates a message with the contents 'error'
            },
            success: function(response){
                console.log(model.get('file')['name'] + ' upload');
            }
        });


        function fileUploadProgress (model) {
            that.xhr = new window.XMLHttpRequest();

            that.xhr.upload.addEventListener("progress", function(e) {
                if (e.lengthComputable) {
                    var percentComplete = e.loaded / e.total;
                    percentComplete = parseInt(percentComplete * 100);

                    model.set('progressDone', percentComplete);

                    if (percentComplete === 100) that.queueUpload();
                }
            }, false);

            return that.xhr;
        }
    },

    fileUploadAbort: function (index) {
        if(this.xhr && index === this.currentUploadFile || this.xhr && index === 'cancel') {
            this.xhr.abort();

            this.queueUpload();
        }
    }
});

'use strict';

App.Views.UploadFileList = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-fileList',

    initialize: function () {
        this.listenTo(App.UploadFiles, 'add', this.addOne);
        App.Events.on('disable-modal-window', this.disableFileList, this);
    },

    render: function () {
        App.Helper.initScroll( this.$el );

        return this;
    },

    addOne: function (model) {
        var view = new App.Views.File({
            model: model
        });

        this.$el.append( view.render().el );
    },

    addOneToCollection: function (model) {
        App.UploadFiles.add(model);
    },

    renderList: function (event) {
        var that = this;
        App.Tracks.each(function (model, indx) {
            that.addOne(model);
        });
    },

    disableFileList: function () {
        App.Events.trigger('hide-filelist');

        App.Events.trigger('file-upload-abort', 'cancel');
        App.UploadFiles.destroyAllCollection();
    }
});
'use strict';

App.Views.LoadFileList = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-fileList',

    initialize: function () {
        this.listenTo(App.LoadFiles, 'add', this.addOne);
        App.Events.on('disable-modal-window', this.disableFileList, this);
        App.Events.on('select-all-loading-files', this.selectAllFiles, this);
        App.Events.on('deselect-all-loading-files', this.deselectAllFiles, this);
    },

    render: function () {
        App.Helper.initScroll( this.$el );

        return this;
    },

    addOne: function (model) {
        var view = new App.Views.File({
            model: model
        });

        this.$el.append( view.render().el );
    },

    addOneToCollection: function (model) {
        App.LoadFiles.add(model);
    },

    disableFileList: function () {
        App.Events.trigger('hide-filelist');
    },

    selectAllFiles: function () {
        this.$el.find('li').addClass('selected');
    },

    deselectAllFiles: function () {
        this.$el.find('li').removeClass('selected');
    }
});
'use strict';

App.Views.FileUploadListInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-file-upload-list-info',

    events: {
        'click .upload': 'startUpload'
    },

    initialize: function () {
        this.listenTo(App.UploadFiles, 'all', this.refreshData);
        App.Events.on('finish-upload', this.finishUpload, this);
    },

    render: function () {
        var data = {
            amount: App.UploadFiles.length
        };
        this.$el.html( App.TmpEngine.getTemplate('fileUploadListInfo', data) );
        this.$uploadBtn = this.$el.find('.upload');

        this.delegateEvents(this.events);

        return this;
    },

    refreshData: function () {
        this.$el.find('.amount').html( App.UploadFiles.length );
    },

    startUpload: function () {
        this.$uploadBtn
            .attr('disabled', 'disabled')
            .addClass('processing');

        App.Events.trigger('start-upload');
    },

    finishUpload: function () {
        this.$uploadBtn
            .removeAttr('disabled')
            .removeClass('processing');
    }
});
'use strict';

App.Views.FileLoaderListInfo = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-file-loader-List-info',

    events: {
        'click .select-all': 'toggleAllSelect'
    },

    initialize: function () {
        this.listenTo(App.LoadFiles, 'all', this.refreshLoadData);
        this.listenTo(App.SelectedFiles, 'all', this.refreshSelectedData);
        App.Events.on('start-loading-process', this.startLoadingProcess, this);
        App.Events.on('stop-loading-process', this.stopLoadingProcess, this);
        App.Events.on('activate-add-to-pl-btn', this.activateAddToPlaylistBtn, this);
    },

    render: function () {
        this.$el.html( App.TmpEngine.getTemplate('fileLoaderListInfo') );

        this.$amount = this.$el.find('.amount');
        this.$selectedFiles = this.$el.find('.selected-files');
        this.$actionBtn = this.$el.find('.action-btn');
        this.$selectAll = this.$el.find('.select-all');

        this.delegateEvents(this.events);

        return this;
    },

    refreshLoadData: function () {
        this.$amount.html( App.LoadFiles.length );
    },

    refreshSelectedData: function () {
        this.$selectedFiles.html( App.SelectedFiles.length );
    },

    activateAddToPlaylistBtn: function () {
        this.$actionBtn
            .html('Add to playlist')
            .on('click', function () {
                if(!App.SelectedFiles.length) return;

                App.Events.trigger('enable-parse-loaded-files');
                App.Events.trigger('disable-modal-window');
            })
    },

    startLoadingProcess: function () {
        this.$actionBtn
            .html('Loading')
            .attr('disabled', 'disabled')
            .addClass('processing');
    },

    stopLoadingProcess: function () {
        this.$actionBtn
            .removeAttr('disabled')
            .removeClass('processing')
            .html('');

        this.$selectAll.removeClass('hidden');
    },

    toggleAllSelect: function () {
        App.SelectedFiles.destroyAllCollection();

        if( this.$selectAll.hasClass('selected-all')) {
            this.$selectAll.removeClass('selected-all');
            App.Events.trigger('deselect-all-loading-files');
        } else {
            this.$selectAll.addClass('selected-all');
            App.Events.trigger('select-all-loading-files');

            App.LoadFiles.each( function(model) {
                App.SelectedFiles.add( new Backbone.Model (model.toJSON() ) );
            });
        }
    }
});
'use strict';

App.Views.File = Backbone.View.extend({
    tagName: 'li',

    events: {
        'click .choose': 'choose',
        'click .delete': 'destroy'
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.changeProgressBar);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function () {
        this.$el.html( App.TmpEngine.getTemplate('file', this.model.toJSON()) );
        this.$progressBar = this.$el.find('.progressbar');

        return this;
    },

    remove: function () {
        this.$el.remove();
    },

    destroy: function () {
        var index = this.model.get('index'),
            progress = this.model.get('progressDone');

        this.model.destroy();
        if(progress !== 100) App.Events.trigger('file-upload-abort', index);
    },

    changeProgressBar: function () {
        this.$progressBar.text( this.model.get('progressDone') + '%' );
    },

    choose: function (e) {
        var $parentLi = $(e.target).parent('li'),
            index, model;

        $parentLi.toggleClass('selected');
        index = this.model.get('index');

        if( $parentLi.hasClass('selected') ) {
            App.SelectedFiles.add( new Backbone.Model( this.model.toJSON() ) );
        } else {
            model = App.SelectedFiles.where({ index: index })[0];
            App.SelectedFiles.remove( model );
        }
    }
});
'use strict';

App.AudioParsing = (function (jsmediatags, async) {

var filesCollection = false,
    tracksCollection = false,
    breakPoint = false,
    currentIndex = 0,

    start = function () {
        filesCollection = App.SelectedFiles;
        tracksCollection = App.Tracks;

        queueParse();
        App.Events.trigger('start-audio-parsing');
    },

    stop = function () {
        if(!filesCollection) return;

        breakPoint = true;
        currentIndex = 0;
        filesCollection.destroyAllCollection();

        App.Events.trigger('stop-audio-parsing');
    },

    queueParse = function () {
        var filesArray = filesCollection.toJSON();

        if(filesArray && filesArray.length > currentIndex) {
            breakPoint = false;
            parseFile( filesArray[currentIndex] );
        } else {
            stop();
        }
    },

    startNextFile = function () {
        currentIndex++;
        queueParse();
    },

    parseFile = function (file) {
        var trackModel = {};

        async.waterfall([
            function(callback) {
                getTags(file.link, function (err, tags) {
                    if(err) return callback(err);

                    trackModel = {
                        link: file.link,
                        duration: file.duration,
                        name: tags.title || file.name || '',
                        album: tags.album || '',
                        artist: tags.artist || '',
                        comment: tags.comment || '',
                        genre: tags.genre || '',
                        year: tags.year || ''
                    };

                    callback(null, tags);
                });
            },
            function(tags, callback) {
                getBase64(tags.picture, function (dataBase64) {
                    trackModel.image = dataBase64;

                    callback(null);
                });
            }
        ], function (err) {
            if(err) {
                startNextFile();
                return console.log(err);
            }
            if(breakPoint) return console.log('parsing break');

            tracksCollection.add( trackModel );
            startNextFile();
        });
    },

    getTags = function (filelink, callback) {
        var waitingPeriod = setTimeout(function () {
            callback(true);
        }, 4000);
        
        jsmediatags.read(filelink, {
            onSuccess: function(data) {
                clearTimeout(waitingPeriod);
                if(typeof callback === 'function') callback(null, data.tags);
            },
            onError: function(error) {
                console.log(error);
                clearTimeout(waitingPeriod);

                callback(true);
            }
        });
    },

    getBase64 = function (pictureTag, callback) {
        var data = '';
        if( !$.isEmptyObject(pictureTag) && pictureTag.data.length) {
            var array = new Uint8Array(pictureTag.data);
            data = bufferToBase64(array);

            getMimeType(pictureTag.format, function (mimeType) {
                data = 'data:' + mimeType + ';base64,' + data;
            });
        }

        if(typeof callback === 'function') callback( data );



        function bufferToBase64 (buf) {
            var binstr = Array.prototype.map.call(buf, function (ch) {
                return String.fromCharCode(ch);
            }).join('');

            return btoa(binstr);
        }

        function getMimeType (formatTag, callback) {
            var imgFormats = {
                gif: 'image/gif',
                jpg: 'image/jpg',
                jpeg: 'image/jpeg',
                png: 'image/png'
            };

            formatTag = formatTag.toLowerCase();

            for (var key in imgFormats) {
                if( formatTag.indexOf(key) + 1) {
                    return callback( imgFormats[key] )
                }
            }
        }
    };

    return {
        start: start,
        stop: stop
    }
})(jsmediatags, async, window);

App.Events.on('enable-parse-loaded-files', App.AudioParsing.start);
App.Events.on('disable-parse-loaded-files', App.AudioParsing.stop);
(function(A){if("object"===typeof exports&&"undefined"!==typeof module)module.f=A();else if("function"===typeof define&&define.M)define([],A);else{var g;"undefined"!==typeof window?g=window:"undefined"!==typeof global?g=global:"undefined"!==typeof self?g=self:g=this;g.ID3=A()}})(function(){return function g(l,h,f){function c(b,d){if(!h[b]){if(!l[b]){var e="function"==typeof require&&require;if(!d&&e)return e(b,!0);if(a)return a(b,!0);e=Error("Cannot find module '"+b+"'");throw e.code="MODULE_NOT_FOUND",
e;}e=h[b]={f:{}};l[b][0].call(e.f,function(a){var e=l[b][1][a];return c(e?e:a)},e,e.f,g,l,h,f)}return h[b].f}for(var a="function"==typeof require&&require,b=0;b<f.length;b++)c(f[b]);return c}({1:[function(g,l){var h=g("./stringutils");if("undefined"!==typeof document){var f=document.createElement("script");f.type="text/vbscript";f.textContent="Function IEBinary_getByteAt(strBinary, iOffset)\r\n\tIEBinary_getByteAt = AscB(MidB(strBinary,iOffset+1,1))\r\nEnd Function\r\nFunction IEBinary_getLength(strBinary)\r\n\tIEBinary_getLength = LenB(strBinary)\r\nEnd Function\r\n";
document.getElementsByTagName("head")[0].appendChild(f)}else g("btoa"),g("atob");l.f=function(c,a,b){var m=a||0,d=0;"string"==typeof c?(d=b||c.length,this.a=function(a){return c.charCodeAt(a+m)&255}):"unknown"==typeof c&&(d=b||IEBinary_getLength(c),this.a=function(a){return IEBinary_getByteAt(c,a+m)});this.s=function(a,b){for(var d=Array(b),m=0;m<b;m++)d[m]=this.a(a+m);return d};this.l=function(){return d};this.g=function(a,b){return 0!=(this.a(a)&1<<b)};this.F=function(a){a=(this.a(a+1)<<8)+this.a(a);
0>a&&(a+=65536);return a};this.m=function(a){var b=this.a(a),d=this.a(a+1),m=this.a(a+2);a=this.a(a+3);b=(((b<<8)+d<<8)+m<<8)+a;0>b&&(b+=4294967296);return b};this.w=function(a){var b=this.a(a),d=this.a(a+1);a=this.a(a+2);b=((b<<8)+d<<8)+a;0>b&&(b+=16777216);return b};this.c=function(a,b){for(var d=[],m=a,c=0;m<a+b;m++,c++)d[c]=String.fromCharCode(this.a(m));return d.join("")};this.h=function(a,b,d){a=this.s(a,b);switch(d.toLowerCase()){case "utf-16":case "utf-16le":case "utf-16be":d=h.J(a,d);break;
case "utf-8":d=h.K(a);break;default:d=h.I(a)}return d};this.i=function(a,b){b()}}},{"./stringutils":9,atob:void 0,btoa:void 0}],2:[function(g,l){var h=g("./binaryfile");l.f=function(f,c,a){function b(a,b,d,e,c,f){var k=m();k?("undefined"===typeof f&&(f=!0),b&&("undefined"!=typeof k.onload?(k.onload=function(){"200"==k.status||"206"==k.status?(k.fileSize=c||k.getResponseHeader("Content-Length"),b(k)):d&&d({error:"xhr",xhr:k});k=null},d&&(k.onerror=function(){d({error:"xhr",xhr:k});k=null})):k.onreadystatechange=
function(){4==k.readyState&&("200"==k.status||"206"==k.status?(k.fileSize=c||k.getResponseHeader("Content-Length"),b(k)):d&&d({error:"xhr",xhr:k}),k=null)}),k.open("GET",a,f),k.overrideMimeType&&k.overrideMimeType("text/plain; charset=x-user-defined"),e&&k.setRequestHeader("Range","bytes="+e[0]+"-"+e[1]),k.setRequestHeader("If-Modified-Since","Sat, 01 Jan 1970 00:00:00 GMT"),k.send(null)):d&&d({error:"Unable to create XHR object"})}function m(){var a=null;"undefined"===typeof window?a=new (g("xmlhttprequest").XMLHttpRequest):
window.XMLHttpRequest?a=new window.XMLHttpRequest:window.ActiveXObject&&(a=new window.ActiveXObject("Microsoft.XMLHTTP"));return a}function d(a,b,d){var e=m();e?(b&&("undefined"!=typeof e.onload?(e.onload=function(){"200"==e.status||"206"==e.status?b(this):d&&d({error:"xhr",xhr:e});e=null},d&&(e.onerror=function(){d({error:"xhr",xhr:e});e=null})):e.onreadystatechange=function(){4==e.readyState&&("200"==e.status||"206"==e.status?b(this):d&&d({error:"xhr",xhr:e}),e=null)}),e.open("HEAD",a,!0),e.send(null)):
d&&d({error:"Unable to create XHR object"})}function e(d,e){var m,c;function f(a){var b=~~(a[0]/m)-c;a=~~(a[1]/m)+1+c;0>b&&(b=0);a>=blockTotal&&(a=blockTotal-1);return[b,a]}function g(c,f){for(;n[c[0]];)if(c[0]++,c[0]>c[1]){f&&f();return}for(;n[c[1]];)if(c[1]--,c[0]>c[1]){f&&f();return}var h=[c[0]*m,(c[1]+1)*m-1];b(d,function(a){parseInt(a.getResponseHeader("Content-Length"),10)==e&&(c[0]=0,c[1]=blockTotal-1,h[0]=0,h[1]=e-1);a={data:a.W||a.responseText,offset:h[0]};for(var b=c[0];b<=c[1];b++)n[b]=
a;f&&f()},a,h,k,!!f)}var k,l=new h("",0,e),n=[];m=m||2048;c="undefined"===typeof c?0:c;blockTotal=~~((e-1)/m)+1;for(var p in l)l.hasOwnProperty(p)&&"function"===typeof l[p]&&(this[p]=l[p]);this.a=function(a){var b;g(f([a,a]));return(b=n[~~(a/m)])&&"string"==typeof b.data?b.data.charCodeAt(a-b.offset)&255:b&&"unknown"==typeof b.data?IEBinary_getByteAt(b.data,a-b.offset):""};this.i=function(a,b){g(f(a),b)}}(function(){d(f,function(a){a=parseInt(a.getResponseHeader("Content-Length"),10)||-1;c(new e(f,
a))},a)})()}},{"./binaryfile":1,xmlhttprequest:void 0}],3:[function(g,l){var h=g("./binaryfile");l.f=function(f,c){return function(a,b){var m=c||new FileReader;m.onload=function(a){b(new h(a.target.result))};m.readAsBinaryString(f)}}},{"./binaryfile":1}],4:[function(g,l){function h(b){return"ftypM4A"==b.c(4,7)?f:"ID3"==b.c(0,3)?a:c}var f=g("./id4"),c=g("./id3v1"),a=g("./id3v2"),b=g("./bufferedbinaryajax"),m=g("./filereader");"undefined"!==typeof window&&(window.FileAPIReader=m);var d={},e={},r=[0,
7];d.B=function(a){delete e[a]};d.A=function(){e={}};d.H=function(a,d,c){c=c||{};(c.dataReader||b)(a,function(b){b.i(r,function(){var m=h(b);m.u(b,function(){var f=c.tags,h=m.v(b,f),f=e[a]||{},r;for(r in h)h.hasOwnProperty(r)&&(f[r]=h[r]);e[a]=f;d&&d()})})},c.onError)};d.D=function(a){if(!e[a])return null;var b={},d;for(d in e[a])e[a].hasOwnProperty(d)&&(b[d]=e[a][d]);return b};d.G=function(a,b){return e[a]?e[a][b]:null};d.FileAPIReader=m;d.loadTags=d.H;d.getAllTags=d.D;d.getTag=d.G;d.clearTags=d.B;
d.clearAll=d.A;l.f=d},{"./bufferedbinaryajax":2,"./filereader":3,"./id3v1":5,"./id3v2":6,"./id4":8}],5:[function(g,l){var h={},f="Blues;Classic Rock;Country;Dance;Disco;Funk;Grunge;Hip-Hop;Jazz;Metal;New Age;Oldies;Other;Pop;R&B;Rap;Reggae;Rock;Techno;Industrial;Alternative;Ska;Death Metal;Pranks;Soundtrack;Euro-Techno;Ambient;Trip-Hop;Vocal;Jazz+Funk;Fusion;Trance;Classical;Instrumental;Acid;House;Game;Sound Clip;Gospel;Noise;AlternRock;Bass;Soul;Punk;Space;Meditative;Instrumental Pop;Instrumental Rock;Ethnic;Gothic;Darkwave;Techno-Industrial;Electronic;Pop-Folk;Eurodance;Dream;Southern Rock;Comedy;Cult;Gangsta;Top 40;Christian Rap;Pop/Funk;Jungle;Native American;Cabaret;New Wave;Psychadelic;Rave;Showtunes;Trailer;Lo-Fi;Tribal;Acid Punk;Acid Jazz;Polka;Retro;Musical;Rock & Roll;Hard Rock;Folk;Folk-Rock;National Folk;Swing;Fast Fusion;Bebob;Latin;Revival;Celtic;Bluegrass;Avantgarde;Gothic Rock;Progressive Rock;Psychedelic Rock;Symphonic Rock;Slow Rock;Big Band;Chorus;Easy Listening;Acoustic;Humour;Speech;Chanson;Opera;Chamber Music;Sonata;Symphony;Booty Bass;Primus;Porn Groove;Satire;Slow Jam;Club;Tango;Samba;Folklore;Ballad;Power Ballad;Rhythmic Soul;Freestyle;Duet;Punk Rock;Drum Solo;Acapella;Euro-House;Dance Hall".split(";");
h.u=function(c,a){var b=c.l();c.i([b-128-1,b],a)};h.v=function(c){var a=c.l()-128;if("TAG"==c.c(a,3)){var b=c.c(a+3,30).replace(/\0/g,""),m=c.c(a+33,30).replace(/\0/g,""),d=c.c(a+63,30).replace(/\0/g,""),e=c.c(a+93,4).replace(/\0/g,"");if(0==c.a(a+97+28))var h=c.c(a+97,28).replace(/\0/g,""),g=c.a(a+97+29);else h="",g=0;c=c.a(a+97+30);return{version:"1.1",title:b,artist:m,album:d,year:e,comment:h,track:g,genre:255>c?f[c]:""}}return{}};l.f=h},{}],6:[function(g,l){function h(a,c){var d=c.a(a),e=c.a(a+
1),f=c.a(a+2);return c.a(a+3)&127|(f&127)<<7|(e&127)<<14|(d&127)<<21}var f=g("./id3v2frames");f.frames={BUF:"Recommended buffer size",CNT:"Play counter",COM:"Comments",CRA:"Audio encryption",CRM:"Encrypted meta frame",ETC:"Event timing codes",EQU:"Equalization",GEO:"General encapsulated object",IPL:"Involved people list",LNK:"Linked information",MCI:"Music CD Identifier",MLL:"MPEG location lookup table",PIC:"Attached picture",POP:"Popularimeter",REV:"Reverb",RVA:"Relative volume adjustment",SLT:"Synchronized lyric/text",
STC:"Synced tempo codes",TAL:"Album/Movie/Show title",TBP:"BPM (Beats Per Minute)",TCM:"Composer",TCO:"Content type",TCR:"Copyright message",TDA:"Date",TDY:"Playlist delay",TEN:"Encoded by",TFT:"File type",TIM:"Time",TKE:"Initial key",TLA:"Language(s)",TLE:"Length",TMT:"Media type",TOA:"Original artist(s)/performer(s)",TOF:"Original filename",TOL:"Original Lyricist(s)/text writer(s)",TOR:"Original release year",TOT:"Original album/Movie/Show title",TP1:"Lead artist(s)/Lead performer(s)/Soloist(s)/Performing group",
TP2:"Band/Orchestra/Accompaniment",TP3:"Conductor/Performer refinement",TP4:"Interpreted, remixed, or otherwise modified by",TPA:"Part of a set",TPB:"Publisher",TRC:"ISRC (International Standard Recording Code)",TRD:"Recording dates",TRK:"Track number/Position in set",TSI:"Size",TSS:"Software/hardware and settings used for encoding",TT1:"Content group description",TT2:"Title/Songname/Content description",TT3:"Subtitle/Description refinement",TXT:"Lyricist/text writer",TXX:"User defined text information frame",
TYE:"Year",UFI:"Unique file identifier",ULT:"Unsychronized lyric/text transcription",WAF:"Official audio file webpage",WAR:"Official artist/performer webpage",WAS:"Official audio source webpage",WCM:"Commercial information",WCP:"Copyright/Legal information",WPB:"Publishers official webpage",WXX:"User defined URL link frame",AENC:"Audio encryption",APIC:"Attached picture",COMM:"Comments",COMR:"Commercial frame",ENCR:"Encryption method registration",EQUA:"Equalization",ETCO:"Event timing codes",GEOB:"General encapsulated object",
GRID:"Group identification registration",IPLS:"Involved people list",LINK:"Linked information",MCDI:"Music CD identifier",MLLT:"MPEG location lookup table",OWNE:"Ownership frame",PRIV:"Private frame",PCNT:"Play counter",POPM:"Popularimeter",POSS:"Position synchronisation frame",RBUF:"Recommended buffer size",RVAD:"Relative volume adjustment",RVRB:"Reverb",SYLT:"Synchronized lyric/text",SYTC:"Synchronized tempo codes",TALB:"Album/Movie/Show title",TBPM:"BPM (beats per minute)",TCOM:"Composer",TCON:"Content type",
TCOP:"Copyright message",TDAT:"Date",TDLY:"Playlist delay",TENC:"Encoded by",TEXT:"Lyricist/Text writer",TFLT:"File type",TIME:"Time",TIT1:"Content group description",TIT2:"Title/songname/content description",TIT3:"Subtitle/Description refinement",TKEY:"Initial key",TLAN:"Language(s)",TLEN:"Length",TMED:"Media type",TOAL:"Original album/movie/show title",TOFN:"Original filename",TOLY:"Original lyricist(s)/text writer(s)",TOPE:"Original artist(s)/performer(s)",TORY:"Original release year",TOWN:"File owner/licensee",
TPE1:"Lead performer(s)/Soloist(s)",TPE2:"Band/orchestra/accompaniment",TPE3:"Conductor/performer refinement",TPE4:"Interpreted, remixed, or otherwise modified by",TPOS:"Part of a set",TPUB:"Publisher",TRCK:"Track number/Position in set",TRDA:"Recording dates",TRSN:"Internet radio station name",TRSO:"Internet radio station owner",TSIZ:"Size",TSRC:"ISRC (international standard recording code)",TSSE:"Software/Hardware and settings used for encoding",TYER:"Year",TXXX:"User defined text information frame",
UFID:"Unique file identifier",USER:"Terms of use",USLT:"Unsychronized lyric/text transcription",WCOM:"Commercial information",WCOP:"Copyright/Legal information",WOAF:"Official audio file webpage",WOAR:"Official artist/performer webpage",WOAS:"Official audio source webpage",WORS:"Official internet radio station homepage",WPAY:"Payment",WPUB:"Publishers official webpage",WXXX:"User defined URL link frame"};var c={title:["TIT2","TT2"],artist:["TPE1","TP1"],album:["TALB","TAL"],year:["TYER","TYE"],comment:["COMM",
"COM"],track:["TRCK","TRK"],genre:["TCON","TCO"],picture:["APIC","PIC"],lyrics:["USLT","ULT"]},a=["title","artist","album","track"];f.u=function(a,c){a.i([0,h(6,a)],c)};f.v=function(b,m){var d=0,e=b.a(d+3);if(4<e)return{version:">2.4"};var r=b.a(d+4),g=b.g(d+5,7),l=b.g(d+5,6),w=b.g(d+5,5),x=h(d+6,b),d=d+10;if(l)var q=b.m(d),d=d+(q+4);var e={version:"2."+e+"."+r,major:e,revision:r,flags:{unsynchronisation:g,extended_header:l,experimental_indicator:w},size:x},k;if(g)k={};else{for(var x=x-10,g=b,r=m,
l={},w=e.major,q=[],u=0,n;n=(r||a)[u];u++)q=q.concat(c[n]||[n]);for(r=q;d<x;){q=null;u=g;n=d;var p=null;switch(w){case 2:k=u.c(n,3);var t=u.w(n+3),z=6;break;case 3:k=u.c(n,4);t=u.m(n+4);z=10;break;case 4:k=u.c(n,4),t=h(n+4,u),z=10}if(""==k)break;d+=z+t;if(!(0>r.indexOf(k))){if(2<w)var p=u,y=n+8,p={message:{Y:p.g(y,6),R:p.g(y,5),V:p.g(y,4)},format:{T:p.g(y+1,7),N:p.g(y+1,3),P:p.g(y+1,2),L:p.g(y+1,1),C:p.g(y+1,0)}};n+=z;p&&p.format.C&&(h(n,u),n+=4,t-=4);p&&p.format.L||(k in f.b?q=f.b[k]:"T"==k[0]&&
(q=f.b["T*"]),q=q?q(n,t,u,p):void 0,q={id:k,size:t,description:k in f.frames?f.frames[k]:"Unknown",data:q},k in l?(l[k].id&&(l[k]=[l[k]]),l[k].push(q)):l[k]=q)}}k=l}for(var B in c)if(c.hasOwnProperty(B)){a:{t=c[B];"string"==typeof t&&(t=[t]);z=0;for(d=void 0;d=t[z];z++)if(d in k){b=k[d].data;break a}b=void 0}b&&(e[B]=b)}for(var C in k)k.hasOwnProperty(C)&&(e[C]=k[C]);return e};l.f=f},{"./id3v2frames":7}],7:[function(g,l){function h(a){var b;switch(a){case 0:b="iso-8859-1";break;case 1:b="utf-16";
break;case 2:b="utf-16be";break;case 3:b="utf-8"}return b}var f={b:{}},c="32x32 pixels 'file icon' (PNG only);Other file icon;Cover (front);Cover (back);Leaflet page;Media (e.g. lable side of CD);Lead artist/lead performer/soloist;Artist/performer;Conductor;Band/Orchestra;Composer;Lyricist/text writer;Recording Location;During recording;During performance;Movie/video screen capture;A bright coloured fish;Illustration;Band/artist logotype;Publisher/Studio logotype".split(";");f.b.APIC=function(a,b,
m,d,e){e=e||"3";d=a;var f=h(m.a(a));switch(e){case "2":var g=m.c(a+1,3);a+=4;break;case "3":case "4":g=m.h(a+1,b-(a-d),""),a+=1+g.j}e=m.a(a,1);e=c[e];f=m.h(a+1,b-(a-d),f);a+=1+f.j;return{format:g.toString(),type:e,description:f.toString(),data:m.s(a,d+b-a)}};f.b.COMM=function(a,b,c){var d=a,e=h(c.a(a)),f=c.c(a+1,3),g=c.h(a+4,b-4,e);a+=4+g.j;a=c.h(a,d+b-a,e);return{language:f,X:g.toString(),text:a.toString()}};f.b.COM=f.b.COMM;f.b.PIC=function(a,b,c,d){return f.b.APIC(a,b,c,d,"2")};f.b.PCNT=function(a,
b,c){return c.S(a)};f.b.CNT=f.b.PCNT;f.b["T*"]=function(a,b,c){var d=h(c.a(a));return c.h(a+1,b-1,d).toString()};f.b.TCON=function(a,b,c){return f.b["T*"].apply(this,arguments).replace(/^\(\d+\)/,"")};f.b.TCO=f.b.TCON;f.b.USLT=function(a,b,c){var d=a,e=h(c.a(a)),f=c.c(a+1,3),g=c.h(a+4,b-4,e);a+=4+g.j;a=c.h(a,d+b-a,e);return{language:f,O:g.toString(),U:a.toString()}};f.b.ULT=f.b.USLT;l.f=f},{}],8:[function(g,l){function h(a,b,f,d){var e=a.m(b);if(0==e)d();else{var g=a.c(b+4,4);-1<["moov","udta","meta",
"ilst"].indexOf(g)?("meta"==g&&(b+=4),a.i([b+8,b+8+8],function(){h(a,b+8,e-8,d)})):a.i([b+(g in c.o?0:e),b+e+8],function(){h(a,b+e,f,d)})}}function f(a,b,h,d,e){e=void 0===e?"":e+"  ";for(var g=h;g<h+d;){var l=b.m(g);if(0==l)break;var v=b.c(g+4,4);if(-1<["moov","udta","meta","ilst"].indexOf(v)){"meta"==v&&(g+=4);f(a,b,g+8,l-8,e);break}if(c.o[v]){var w=b.w(g+16+1),x=c.o[v],w=c.types[w];if("trkn"==v)a[x[0]]=b.a(g+16+11),a.count=b.a(g+16+13);else{var v=g+16+4+4,q=l-16-4-4,k;switch(w){case "text":k=b.h(v,
q,"UTF-8");break;case "uint8":k=b.F(v);break;case "jpeg":case "png":k={format:"image/"+w,data:b.s(v,q)}}a[x[0]]="comment"===x[0]?{text:k}:k}}g+=l}}var c={types:{0:"uint8",1:"text",13:"jpeg",14:"png",21:"uint8"},o:{"\u00a9alb":["album"],"\u00a9art":["artist"],"\u00a9ART":["artist"],aART:["artist"],"\u00a9day":["year"],"\u00a9nam":["title"],"\u00a9gen":["genre"],trkn:["track"],"\u00a9wrt":["composer"],"\u00a9too":["encoder"],cprt:["copyright"],covr:["picture"],"\u00a9grp":["grouping"],keyw:["keyword"],
"\u00a9lyr":["lyrics"],"\u00a9cmt":["comment"],tmpo:["tempo"],cpil:["compilation"],disk:["disc"]},u:function(a,b){a.i([0,7],function(){h(a,0,a.l(),b)})},v:function(a){var b={};f(b,a,0,a.l());return b}};l.f=c},{}],9:[function(g,l){l.f={J:function(h,f,c){var a=0,b=1,g=0;c=Math.min(c||h.length,h.length);254==h[0]&&255==h[1]?(f=!0,a=2):255==h[0]&&254==h[1]&&(f=!1,a=2);f&&(b=0,g=1);f=[];for(var d=0;a<c;d++){var e=h[a+b],l=(e<<8)+h[a+g],a=a+2;if(0==l)break;else 216>e||224<=e?f[d]=String.fromCharCode(l):
(e=(h[a+b]<<8)+h[a+g],a+=2,f[d]=String.fromCharCode(l,e))}h=new String(f.join(""));h.j=a;return h},K:function(h,f){var c=0;f=Math.min(f||h.length,h.length);239==h[0]&&187==h[1]&&191==h[2]&&(c=3);for(var a=[],b=0;c<f;b++){var g=h[c++];if(0==g)break;else if(128>g)a[b]=String.fromCharCode(g);else if(194<=g&&224>g){var d=h[c++];a[b]=String.fromCharCode(((g&31)<<6)+(d&63))}else if(224<=g&&240>g){var d=h[c++],e=h[c++];a[b]=String.fromCharCode(((g&255)<<12)+((d&63)<<6)+(e&63))}else if(240<=g&&245>g){var d=
h[c++],e=h[c++],l=h[c++],g=((g&7)<<18)+((d&63)<<12)+((e&63)<<6)+(l&63)-65536;a[b]=String.fromCharCode((g>>10)+55296,(g&1023)+56320)}}a=new String(a.join(""));a.j=c;return a},I:function(g,f){var c=[];f=f||g.length;for(var a=0;a<f;){var b=g[a++];if(0==b)break;c[a-1]=String.fromCharCode(b)}c=new String(c.join(""));c.j=a;return c}}},{}]},{},[4])(4)});

'use strict';

App.Helper = {
    fileCounter: 1,

    initScroll: function (element) {
        element.perfectScrollbar({
            minScrollbarLength: 50
        });
    }
};