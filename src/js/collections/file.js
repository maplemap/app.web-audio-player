'use strict';


App.Collections.Files = Backbone.Collection.extend({
    model: App.Models.File,

    destroyAllCollection: function () {
        _.invoke( this.toArray(), 'destroy' );
    }
});

App.UploadFiles = new App.Collections.Files();
App.LoadFiles = new App.Collections.Files();
App.ParseFiles = new App.Collections.Files();