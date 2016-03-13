'use strict';


App.Collections.Tracks = Backbone.Collection.extend({
    model: App.Models.Track,
    localStorage: new Backbone.LocalStorage('web-player'),

    getTotalTime: function () {
        var totalSeconds = 0,
            hours, minutes, seconds, time;

        this.each(function (obj, index) {
            var timeArray = obj.get('duration').split(':');
            totalSeconds += parseInt(timeArray[0], 10) * 60 + parseInt(timeArray[1], 10);
        });

        hours   = Math.floor(totalSeconds / 3600);
        minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
        seconds = totalSeconds - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = '0' + hours;}
        if (minutes < 10) {minutes = '0' + minutes;}
        if (seconds < 10) {seconds = '0' + seconds;}

        time = hours + ':' + minutes + ':' + seconds;

        return time;
    }
});

App.Tracks = new App.Collections.Tracks();