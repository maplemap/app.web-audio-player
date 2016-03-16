'use strict';

App.Views.Tools = Backbone.View.extend({

    tagName: 'ul',
    className: App.CLASS_PREFIX + '-tools',
    
    events: {
        'click .upload-files': 'addUploadFilesEvents'
    },
    
    initialize: function () {
        App.Events.on('enable-upload-window', this.enableUploadWindow, this);
        App.Events.on('disable-modal-window', this.disableUploadWindow, this);

        this.$tools = $( App.TmpEngine.getTemplate('tools') );

        this.render();
    },

    render: function () {
        this.$el.append( this.$tools );
        this.$uploadFiles = this.$el.find('.upload-files');

        return this;
    },

    addUploadFilesEvents: function (e) {
        var event = ( $(e.target).hasClass('active') ) ? 'disable-modal-window' : 'enable-upload-window';

        App.Events.trigger( event );
    },

    enableUploadWindow: function () {
        this.$uploadFiles.addClass('active');
    },

    disableUploadWindow: function () {
        this.$uploadFiles.removeClass('active');
    }
});
