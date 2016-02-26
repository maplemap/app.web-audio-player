var app = app || {};

app.PlaylistView = Backbone.View.extend({

    initialize: function () {
        this.$el.html( TmpEngine.render('playlist') );

        this.collection = new app.TrackList(tracks);
        //this.render();
    },

    render: function () {
        var that = this;
        _.each(this.collection.models, function (item) {
            that.renderTrack(item);
        }, this);
    },

    renderTrack: function (item) {
        var trackView = new app.TrackView({
            model: item
        });
        this.$tracker.append( trackView.render().el );
    }
});