'use strict';
var app = app || {};


app.PlayerView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html( TmpEngine.render('player', {phrase: 'Hello!!!'}) );
        this.initTimeline();
        this.initVolumeControl();

        return this;
    },

    initTimeline: function () {
        this.$(".timeline").slider({
            range: "min",
            min: 0,
            max: 100
        });
    },

    initVolumeControl: function () {
        this.$(".volume").slider({
            range: "min",
            min: 0,
            max: 100,
            value: 20,
            slide: function( event, ui ) {
                //$( "#amount" ).val( ui.value );
            }
        });
    }
});
