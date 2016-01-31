'use strict';

var app = app || {};

app.PlayerView = Backbone.View.extend({
    
    initialize: function () {
        this.$el.html( TmpEngine.render('player', {phrase: 'Hello!!!'}) );
    }
});