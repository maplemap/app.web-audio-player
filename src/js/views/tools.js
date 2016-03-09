'use strict';

App.Views.Tools = Backbone.View.extend({

    tagName: 'ul',
    className: 'tools',
    
    events: {
        'click .upload-files': 'upload'  
    },
    
    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.append( App.TmpEngine.render('instruments') );

        return this;
    }
});
