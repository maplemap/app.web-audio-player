'use strict';

App.Views.Track = Backbone.View.extend({
    tagName: 'li',

    initialize: function () {
        this.listenTo(this. model, 'change', this.render);
    },

    render: function () {
        this.$el.html( App.TmpEngine.getTemplate('track', this.model.toJSON()) );

        return this;
    }
});