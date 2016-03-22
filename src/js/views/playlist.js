'use strict';

App.Views.Playlist = Backbone.View.extend({
    className: App.Settings.classPrefix + '-playlist',

    initialize: function () {
        //App.Events.on('enable-upload-window', this.enableUploadWindow, this);
        //App.Events.on('disable-modal-window', this.disableModalWindow, this);

        this.trackerView = new App.Views.TrackList();
        this.playlistInfoView = new App.Views.PlaylistInfo();
        this.modalWindow = ( new App.Views.ModalWindow() );

        this.render();
    },

    render: function () {
        this.$el.append( this.playlistInfoView.render().el );
        this.$el.append( this.trackerView.render().el );
        this.$el.append( this.modalWindow.render().el );

        App.Events.on('show-filelist', this.showFilelist, this);
        App.Events.on('hide-filelist', this.hideFilelist, this);

        return this;
    },

    showFilelist: function () {
        this.$el.addClass('show-filelist');
    },

    hideFilelist: function () {
        this.$el.removeClass('show-filelist');
    }

    //enableModalWindow: function (content) {
    //    var that = this;
    //
    //    this.$modalWindow.addClass('active');
    //    this.$modalWindow.find('.cancel').on('click', function (e) {
    //        e.stopPropagation();
    //        App.Events.trigger('disable-modal-window');
    //    });
    //
    //    this.$modalWindow.find('.modal-content').html(content);
    //},
    //
    //disableModalWindow : function () {
    //    this.$modalWindow.removeClass('active');
    //    this.$modalWindow.find('.cancel').off('click');
    //    this.$modalWindow.find('.modal-content').html('');
    //},
    //
    //enableUploadWindow: function () {
    //    this.$fileUploader = new App.Views.FileUploader();
    //
    //    this.enableModalWindow( this.$fileUploader.render().el );
    //}
});