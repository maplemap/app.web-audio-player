'use strict';

App.Views.TrackList = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-track-list',

    initialize: function () {
        this.listenTo(App.Tracks, 'add', this.addOne);
        App.Events.on('add-files-to-playlist', this.render, this);

        App.Tracks.fetch();
    },

    render: function () {
        var that = this;
        //ToDo: Add check for the presence of file on server

        $.each(App.LoadFiles.toJSON(), function (i, track) {
            that.addOneToCollection(track);
        });

        App.Helper.initScroll( this.$el );

        return this;
    },

    addOne: function (model) {
        var view = new App.Views.Track({
            model: model
        });

        model.save();
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