'use strict';

App.Views.Tools = Backbone.View.extend({

    tagName: 'ul',
    className: App.Settings.classPrefix + '-tools',
    
    events: {
        'click li': 'toggleTools'
    },
    
    initialize: function () {
        App.Events.on('disable-modal-window', this.removeActiveClasses, this);

        this.$tools = $( App.TmpEngine.getTemplate('tools') );

        this.render();
    },

    render: function () {
        this.$el.append( this.$tools );

        return this;
    },

    toggleTools: function (e) {
        var $target = $(e.target),
            event = $target.data('event');

        if( $target.hasClass('active') ) {
            $target.removeClass('active');
            App.Events.trigger('disable-modal-window');
        } else {
            this.$el.find('li').removeClass('active');

            App.Events.trigger( event );
            $target.addClass('active');
        }
    },

    removeActiveClasses: function () {
        this.$el.find('li').removeClass('active');
    }
});
