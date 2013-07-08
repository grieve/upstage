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
                me.$el.html(me.template({festival: me.festival}));
                me.enableDragging();
            },
            enableDragging: function()
            {
                var me = this;

                me.stageRule = me.$el.find('.stage-rule')[0];
                me.timesRule = me.$el.find('.times-rule')[0];
                me.lineups = me.$el.find('.lineups')[0];

                var duration = 0;
                var velocity = [0, 0];
                var position = [0, 0];
                var startPosition = [0, 0];
                var existingDelta = [0, 0];
                var startDragging = function(evt)
                {
                    startPosition = [
                        evt.gesture.center.pageX,
                        evt.gesture.center.pageY
                    ];
                };

                var stopDragging = function(evt)
                {
                    existingDelta = [
                        existingDelta[0] + evt.gesture.center.pageX - startPosition[0],
                        existingDelta[1] + evt.gesture.center.pageY - startPosition[1]
                    ];
                };

                var handleDrag = function(evt)
                {
                    var delta = [
                        existingDelta[0] + evt.gesture.center.pageX - startPosition[0],
                        existingDelta[1] + evt.gesture.center.pageY - startPosition[1]
                    ];
                    console.log(delta);
                    if(delta[0] > 0) delta[0] = 0;
                    if(delta[1] > 0) delta[1] = 0;
                    console.log(delta);
                    $(me.lineups).css(
                        {
                            'transform': 'translate(' + delta[0] + 'px, ' + delta[1] + 'px)',
                            'transition': 'all 0s'
                        }
                    );
                    $(me.stageRule).css(
                        {
                            'transform': 'translate(' + delta[0] + 'px, 0px)',
                            'transition': 'all 0s'
                        }
                    );
                    $(me.timesRule).css(
                        {
                            'transform': 'translate(0px, ' + delta[1] + 'px)',
                            'transition': 'all 0s'
                        }
                    );
                };

                Hammer(me.lineups).on('dragstart', startDragging);
                Hammer(me.lineups).on('dragend', stopDragging);
                Hammer(me.lineups).on('drag', handleDrag);
            }
        });

        return View;
    }
);