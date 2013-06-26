define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/upstage/utils/FileManager',
        'js/upstage/utils/FestivalManager',
        'text!js/upstage/templates/index.html'
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
        var IndexView = Backbone.View.extend({
            depth: 0,
            tagName: 'section',
            className: 'page',
            template: _.template(tmpl_Main),
            initialize: function()
            {
                // var fm = new FileManager("Upstage");
                // fm.write('data/test/test.txt', "testing123123", 'w', function(data)
                // {
                //     fm.read('data/test/test.txt', function(data){ console.log(data); });
                // });
            },
            render: function()
            {
                var me = this;
                me.$el.html(me.template({festivals: FestivalManager.data}));
            }
        });

        return IndexView;
    }
);