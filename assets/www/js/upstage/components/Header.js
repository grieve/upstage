define(
    [
        'jquery',
        'underscore',
        'backbone',
        'hammer',
        'radio',
        'js/upstage/utils/FestivalManager',
        'text!js/upstage/templates/header.html'
    ],
    function(
        $,
        _,
        Backbone,
        Hammer,
        Radio,
        FestivalManager,
        tmpl_Main
    )
    {
        var HeaderView = Backbone.View.extend({
            depth: 0,
            tagName: 'header',
            className: 'header-nav',
            template: _.template(tmpl_Main),
            initialize: function()
            {
                var me = this;
            },
            render: function()
            {
                var me = this;
                me.$el.html(me.template());
            },
            menuMode: function(state)
            {
                var me = this;
                if(state)
                {
                    me.$el.find('.header-chevron').css({opacity: 0});
                }
                else
                {
                    me.$el.find('.header-chevron').css({opacity: 1});
                }
            }
        });

        return HeaderView;
    }
);