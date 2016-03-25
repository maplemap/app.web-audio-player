'use strict';

App.Views.File = Backbone.View.extend({
    tagName: 'li',

    events: {
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
        this.model.destroy();
    },

    changeProgressBar: function () {
        this.$progressBar.text( this.model.get('progressDone') + '%' );
    }
});