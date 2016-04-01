'use strict';


App.Collections.Tracks = Backbone.Collection.extend({
    model: App.Models.Track,
    localStorage: new Backbone.LocalStorage('web-player'),

    getTotalTime: function () {
        var totalSeconds = 0;

        this.each(function (obj, index) {
            var timeArray = obj.get('duration').split(':');
            totalSeconds += parseInt(timeArray[0], 10) * 60 + parseInt(timeArray[1], 10);
        });


        return this.getTimeFromSeconds(totalSeconds, 'hours');
    },

    getTimeFromSeconds: function (seconds, flag) {
        var hours, minutes, time;

        hours   = Math.floor(seconds / 3600);
        minutes = Math.floor((seconds - (hours * 3600)) / 60);
        seconds = seconds - (hours * 3600) - (minutes * 60);

        hours = (hours && hours < 10) ? '0' + hours + ':' : '';

        if (hours) {
            if (hours < 10) hours =  '0' + hours + ':';
        } else {
            hours = (flag === 'hours') ? '00:' : '';
        }
        if (minutes < 10) {minutes = '0' + minutes;}
        if (seconds < 10) {seconds = '0' + seconds;}

        time = hours + minutes + ':' + seconds;

        return time;
    },

    destroyAllCollection: function () {
        _.invoke( this.toArray(), 'destroy' );
    }
});

App.Tracks = new App.Collections.Tracks();