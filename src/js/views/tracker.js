'use strict';

App.Views.Tracker = Backbone.View.extend({
    tagName: 'ul',
    className: App.CLASS_PREFIX + '-tracker',

    initialize: function () {
        //this.$el.append( App.TmpEngine.render('track') );

        this.render();
    },

    render: function () {
        //var tracker = App.TmpEngine.render('tracker');
        //this.$el.append( tracker );

        return this;
    }
});