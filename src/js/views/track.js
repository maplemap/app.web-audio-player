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