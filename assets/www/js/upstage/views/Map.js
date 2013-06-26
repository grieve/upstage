define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!js/upstage/templates/map.html'
    ],
    function(
        $,
        _,
        Backbone,
        tmpl_Main
    )
    {
        var MapView = Backbone.View.extend({
            depth: 2,
            tagName: 'section',
            className: 'page',
            template: _.template(tmpl_Main),
            initialize: function()
            {

            },
            render: function()
            {
                var me = this;
                me.$el.html(me.template({}));
            }
        });

        return MapView;
    }
);