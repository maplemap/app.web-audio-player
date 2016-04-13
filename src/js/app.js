'use strict';

App.Helper = {
    fileCounter: 1,

    initScroll: function (element) {
        element.perfectScrollbar({
            minScrollbarLength: 50
        });
    }
};