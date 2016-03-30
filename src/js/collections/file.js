'use strict';


App.Collections.UploadFiles = Backbone.Collection.extend({
    model: App.Models.File,

    destroyAllCollection: function () {
        _.invoke( this.toArray(), 'destroy' );
    }
});

App.UploadFiles = new App.Collections.UploadFiles();
App.LoadFiles = new App.Collections.UploadFiles();