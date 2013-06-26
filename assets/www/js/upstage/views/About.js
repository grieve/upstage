define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/upstage/utils/FileManager',
        'js/upstage/utils/FestivalManager',
        'text!js/upstage/templates/about.html'
    ],
    function(
        $,
        _,
        Backbone,
        FileManager,
        FestivalManager,
        tmpl_Main
    )
    {
        var AboutView = Backbone.View.extend({
            depth: 0,
            tagName: 'section',
            className: 'page',
            template: _.template(tmpl_Main),
            initialize: function(opts)
            {
                var me = this;
                me.festival = FestivalManager.get(opts.slug);
            },
            render: function()
            {
                var me = this;
                me.$el.html(me.template({festival: me.festival}));
            }
        });

        return AboutView;
    }
);