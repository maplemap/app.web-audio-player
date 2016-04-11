'use strict';

App.Views.File = Backbone.View.extend({
    tagName: 'li',

    events: {
        'click .choose': 'choose',
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
        var index = this.model.get('index'),
            progress = this.model.get('progressDone');

        this.model.destroy();
        if(progress !== 100) App.Events.trigger('file-upload-abort', index);
    },

    changeProgressBar: function () {
        this.$progressBar.text( this.model.get('progressDone') + '%' );
    },

    choose: function (e) {
        var $parentLi = $(e.target).parent('li'),
            index, model;

        $parentLi.toggleClass('selected');
        index = this.model.get('index');

        if( $parentLi.hasClass('selected') ) {
            App.SelectedFiles.add( new Backbone.Model( this.model.toJSON() ) );
        } else {
            model = App.SelectedFiles.where({ index: index })[0];
            App.SelectedFiles.remove( model );
        }
    }
});