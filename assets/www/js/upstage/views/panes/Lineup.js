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
                me.selectedStage = 0;
            },
            render: function()
            {
                var me = this;
                console.log(me.festival);
                Hammer(me.el).on("swipeleft swiperight", _.bind(me.handleSwipe, me));
                me.renderDay(0);
            },
            renderDay: function(idx)
            {
                var me = this;
                me.$el.html(me.template({day: me.festival.days[idx]}));
                me.$el.find('.act').each(function(idx, elem)
                {
                    var $elem = $(elem);
                    $elem.css({
                        marginTop: $elem.data('leadtime') * 2,
                        height: $elem.data('duration') * 2
                    });
                });
            },
            handleSwipe: function(evt)
            {
                evt.preventDefault();
                evt.stopPropagation();
                var me = this;
                if(evt.type == "swiperight")
                {
                    if (me.selectedStage === 0)
                    {
                        return;
                    }
                    me.$el.find('#stage-pane-' + me.selectedStage).addClass('stage-right');
                    me.$el.find('#stage-pane-' + (--me.selectedStage)).removeClass('stage-left');

                }
                else if (evt.type == "swipeleft")
                {
                    if(me.selectedStage == me.festival.days[0].stages.length - 1)
                    {
                        return;
                    }
                    me.$el.find('#stage-pane-' + me.selectedStage).addClass('stage-left');
                    me.$el.find('#stage-pane-' + (++me.selectedStage)).removeClass('stage-right');
                }
            }
        });

        return View;
    }
);