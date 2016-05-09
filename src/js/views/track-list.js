'use strict';

App.Views.TrackList = Backbone.View.extend({
    tagName: 'ul',
    className: App.Settings.classPrefix + '-track-list',

    initialize: function () {
        this.listenTo(App.Tracks, 'add', this.addOne);
        App.Events.on('add-files-to-playlist', this.render, this);
        App.Events.on('set-active-class-for-track', this.setActiveClassForTrack, this);
        App.Events.on('stop-playing-track', this.setActiveClassForTrack, this);
        App.Events.on('scroll-list-to-top', this.scrollTopList, this);

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

    renderList: function () {
        var that = this;
        App.Tracks.each(function (model, indx) {
            that.addOne(model);
        });
    },

    setActiveClassForTrack: function (currentIndex) {
        currentIndex = currentIndex || 'noIndex';

        this.$el.find('li:not([data-index="'+ currentIndex +'"])').removeClass('active');
        this.$el.find('li[data-index="'+ currentIndex +'"]').addClass('active');
    },

    scrollTopList: function (currentIndex) {
        var position = this.$el.find( '[data-index="'+ currentIndex +'"]').position();

        this.$el.scrollTop( position.top );
    }
});