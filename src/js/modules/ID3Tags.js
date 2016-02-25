'use strict';

//requirements ../plugins/id3-minimized.js

var ID3Tags = (function ($) {

    var settings = {
      tags: ["title","artist","album","picture"]
    },

    getTags = function (file) {
        ID3.loadTags(file.name, function() {
            console.log(ID3.getAllTags(file.name));
        }, {
            tags: settings.tags,
            dataReader: ID3.FileAPIReader(file)
        });
    };

    return {
        getTags: getTags
    }
})(jQuery);