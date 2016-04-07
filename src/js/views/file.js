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
        var target = $(e.target),
            className = 'selected';

        target.toggleClass(className);
        target.parent('li').toggleClass(className);
    }
});