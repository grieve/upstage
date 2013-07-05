define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/upstage/utils/FileManager',
        'js/upstage/utils/FestivalManager',
        'text!js/upstage/templates/panes/home.html'
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
        var View = Backbone.View.extend({
            depth: 0,
            tagName: 'section',
            className: 'pane',
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

        return View;
    }
);