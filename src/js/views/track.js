var app = app || {};

app.TrackView = Backbone.View.extend({
    tagName: 'li',

    initialize: function () {
        this.listenTo(this. model, 'change', this.render);
    },

    render: function () {
        this.$el.html( app.TmpEngine.render('track', this.model.toJSON()) );

        return this;
    }
});