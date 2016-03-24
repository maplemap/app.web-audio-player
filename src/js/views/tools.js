'use strict';

App.Views.Tools = Backbone.View.extend({

    tagName: 'ul',
    className: App.Settings.classPrefix + '-tools',
    
    events: {
        'click .upload-files': 'initUploadFilesEvents'
    },
    
    initialize: function () {
        App.Events.on('enable-upload-window', this.addClassToUploadFiles, this);
        App.Events.on('disable-modal-window', this.removeClassToUploadFiles, this);

        this.$tools = $( App.TmpEngine.getTemplate('tools') );

        this.render();
    },

    render: function () {
        this.$el.append( this.$tools );
        this.$uploadFiles = this.$el.find('.upload-files');

        return this;
    },

    initUploadFilesEvents: function (e) {
        var event = ( $(e.target).hasClass('active') ) ? 'disable-modal-window' : 'enable-upload-window';

        App.Events.trigger( event );
    },

    addClassToUploadFiles: function () {
        this.$uploadFiles.addClass('active');
    },

    removeClassToUploadFiles: function () {
        this.$uploadFiles.removeClass('active');
    }
});
