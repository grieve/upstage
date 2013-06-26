define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!js/upstage/templates/index.html'
    ],
    function(
        $,
        _,
        Backbone,
        tmpl_Main
    )
    {
        var IndexView = Backbone.View.extend({
            depth: 0,
            tagName: 'section',
            className: 'page',
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

        return IndexView;
    }
);