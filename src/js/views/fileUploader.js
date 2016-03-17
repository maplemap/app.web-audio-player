'use strict';

App.Views.FileUploader = Backbone.View.extend({
    tagName: 'ul',
    className: App.CLASS_PREFIX + '-file-uploader',

    initialize: function () {
        this.$dropZone = $( App.TmpEngine.getTemplate('dropZone') );
    },

    render: function () {
        this.$el.html( this.$dropZone );

        return this;
    }
});