define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!js/upstage/templates/shelf.html'
    ],
    function(
        $,
        _,
        Backbone,
        tmpl_Main
    )
    {
        var ShelfMenu = Backbone.View.extend({
            depth: 0,
            tagName: 'section',
            className: 'shelf-menu',
            template: _.template(tmpl_Main),
            initialize: function()
            {
            },
            render: function()
            {
                var me = this;
                me.$el.html(me.template());
            }
        });

        return ShelfMenu;
    }
);