'use strict';


App.Collections.UploadFiles = Backbone.Collection.extend({
    model: App.Models.File,
    //localStorage: new Backbone.LocalStorage('web-player'),

    destroyAllCollection: function () {
        _.invoke( this.toArray(), 'destroy' );
    }
});

App.UploadFiles = new App.Collections.UploadFiles();