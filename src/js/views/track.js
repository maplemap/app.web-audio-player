'use strict';

App.Views.Track = Backbone.View.extend({
    tagName: 'li',

    events: {
        'click .delete': 'destroy',
        'click' : 'startPlayingTrack'
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.model.on('destroy', this.remove, this);
    },

    render: function () {
        this.$el.html( App.TmpEngine.getTemplate('track', this.model.toJSON()) );
        this.$el.attr('data-index', this.model.get('index'));

        return this;
    },

    remove: function () {
        this.$el.remove();
    },

    destroy: function () {
        this.model.destroy();
    },

    startPlayingTrack: function (e) {
        if( $(e.target).hasClass('delete') ) return;

        App.Events.trigger('start-playing-track', this.model);
    }
});