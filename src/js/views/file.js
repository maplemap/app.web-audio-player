'use strict';

App.Views.File = Backbone.View.extend({
    tagName: 'li',

    events: {
        //'click .track-delete': 'destroy'
    },

    initialize: function () {
        //this.listenTo(this. model, 'change', this.render);
        //this.model.on('destroy', this.remove, this);
    },

    render: function (data) {
        //this.$el.html( App.TmpEngine.getTemplate('file', this.model.toJSON()) );
        this.$el.html( data.name );

        return this;
    },

    remove: function () {
        //this.$el.remove();
    },

    destroy: function () {
        //this.model.destroy();
    }
});