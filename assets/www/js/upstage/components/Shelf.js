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
            events: {
                'click .nav-option': 'handleNavigation'
            },
            initialize: function(opts)
            {
                var me = this;
            },
            render: function()
            {
                var me = this;
                me.$el.html(me.template({slug: 'glasgowbury'}));
                me.updateActive();
            },
            updateActive: function()
            {
                $('.shelf-nav li').removeClass('active');
                $('.shelf-nav li[rel="' + window.location.hash +'"]').addClass('active');
            },
            handleNavigation: function(evt)
            {
                window.location.href = $(evt.currentTarget).attr('rel');
            }
        });

        return ShelfMenu;
    }
);