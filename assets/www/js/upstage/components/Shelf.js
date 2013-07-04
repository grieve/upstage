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
            initialize: function(opts)
            {
                var me = this;
            },
            render: function()
            {
                var me = this;
                me.$el.html(me.template());
                me.updateActive();
            },
            updateActive: function()
            {
                $('.shelf-nav li').removeClass('active');
                $('.shelf-nav a[href="' + window.location.hash +'"]').parent().addClass('active');
            }
        });

        return ShelfMenu;
    }
);