'use strict';

var TmpEngine = (function () {

    var render = function (tmpName, data) {
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