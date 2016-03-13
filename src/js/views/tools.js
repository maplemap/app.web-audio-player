'use strict';

App.Views.Tools = Backbone.View.extend({

    tagName: 'ul',
    className: App.CLASS_PREFIX + '-tools',
    
    events: {
        'click .upload-files': 'upload'  
    },
    
    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.append( App.TmpEngine.getTemplate('instruments') );

        return this;
    }
});
