'use strict';

var Template = (function (twig) {

    var settings = {
            templater: {
                name: 'twig',
                fileResolution: '.html.twig'
            },
            path: {
                templates: './views/'
            }
        },

        render = function (tmpName, data) {
            return Templater[ settings.templater.name ] (tmpName, data);
        },

        Templater = {

            twig: function (tmpName, data) {
                data = data || {};

                var twigTemplate = twig({ ref: tmpName }),
                    content = '';

                if( twigTemplate ) {
                    content = twigTemplate.render(data);
                } else {
                    twig({
                        id: tmpName,
                        href: settings.path.templates + tmpName + settings.templater.fileResolution,
                        async: false,

                        load: function(template) {
                            content = template.render(data);
                        }
                    });
                }

                return content;
            }
        };

    return {
        render: render
    }

}(twig));