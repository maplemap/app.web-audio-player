'use strict';

var app = app || {};

app.PlayerView = Backbone.View.extend({
    
    initialize: function () {
        this.$el.html( TmpEngine.render('player', {phrase: 'Hello!!!'}) );
    }
});


'use strict';

var TmpEngine = (function () {

    var settings = {
            templater: {
                name: 'twig',
                fileResolution: '.html.twig'
            },
            path: {
                templates: 'views/'
            }
        },

        render = function (tmpName, data) {
            if( Templates[tmpName] ) return Templates[tmpName](data);
        },

        Templates = {
            player: function (data) {
                return '<div id="webPlayer">\
                            <div class="header">\
                               ' + data.phrase + '\
                            </div>\
                        </div>'
            }
        };

    return {
        render: render
    }

}());