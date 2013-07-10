define(
    [
        'jquery',
        'underscore',
        'backbone',
        'hammer',
        'js/upstage/utils/FileManager',
        'js/upstage/utils/FestivalManager',
        'text!js/upstage/templates/panes/lineup.html'
    ],
    function(
        $,
        _,
        Backbone,
        Hammer,
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
                console.log(me.festival);
                me.$el.html(me.template({festival: me.festival}));
            }
        });

        return View;
    }
);