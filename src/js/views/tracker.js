'use strict';

App.Views.Tracker = Backbone.View.extend({
    tagName: 'ul',
    className: App.CLASS_PREFIX + '-tracker',

    initialize: function () {
        this.listenTo(App.Tracks, 'add', this.addOne);

        App.Tracks.fetch();
    },

    render: function () {
        //var tracker = App.TmpEngine.render('tracker');
        //this.$el.append( tracker );

        var that = this;

        //$.each(tracks, function (i, track) {
        //    that.addOneToCollection(track);
        //});

        return this;
    },

    addOne: function (track) {
        var view = new App.Views.Track({
            model: track
        });

        track.save();
        this.$el.append( view.render().el );
    },

    addOneToCollection: function (track) {
        App.Tracks.add(track);
    },

    renderList: function (event) {
        var that = this;
        App.Tracks.each(function (model, indx) {
            that.addOne(model);
        });
    }
});