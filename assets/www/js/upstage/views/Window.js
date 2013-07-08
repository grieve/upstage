define(
    [
        'jquery',
        'underscore',
        'backbone',
        'hammer',
        'radio',
        'js/upstage/components/Header.js',
        'js/upstage/components/Shelf.js',
        'js/upstage/utils/FestivalManager'
    ],
    function(
        $,
        _,
        Backbone,
        Hammer,
        Radio,
        Header,
        Shelf,
        FestivalManager
    )
    {
        var Window = Backbone.View.extend({
            depth: 0,
            tagName: 'div',
            className: 'main-content container',
            events :{
                'click .action': 'handleActions'
            },
            initialize: function(opts)
            {
                // var fm = new FileManager("Upstage");
                // fm.write('data/test/test.txt', "testing123123", 'w', function(data)
                // {
                //     fm.read('data/test/test.txt', function(data){ console.log(data); });
                // });
                var me = this;
                me.router = opts.router;
                me.header = new Header();
                me.shelf = new Shelf({router:me.router});
                me.container = $('<div>');
                me.container.addClass('container primary-pane');
                me.menuMode(false);

                Radio('toggleShelf').subscribe([me.toggleShelf, me]);
                Hammer(me.el).on("swipeleft swiperight", function(evt){
                    if((evt.type == "swiperight" && !me.menuOpen) || (evt.type == "swipeleft" && me.menuOpen))
                        Radio('toggleShelf').broadcast(evt);
                });
            },
            render: function()
            {
                var me = this;
                me.header.render();
                me.$el.append(me.header.el);
                me.shelf.render();
                me.$el.append(me.shelf.el);
                me.$el.append(me.container);

                me.$el.css({
                    width: $(document).width(),
                    height: $(document).height()
                });
                $('body').append(me.el);
            },
            transition: function(newView)
            {
                var me = this;
                me.shelf.updateActive();
                me.container.html(newView.$el);
                if(me.menuOpen)
                {
                    Radio('toggleShelf').broadcast();
                }
            },
            handleActions: function(evt)
            {
                evt.stopPropagation();
                evt.preventDefault();

                var me = this;
                var $elem = $(evt.currentTarget);
                var action = $elem.data('action');

                Radio(action).broadcast(evt);
            },
            toggleShelf: function(evt)
            {
                var me = this;
                if(me.container.offset().left > 0)
                {
                    // me.container.animate({
                    //     left: 0
                    // }, 200, function()
                    // {
                    //     me.menuMode(false);
                    // });
                    // me.shelf.$el.animate({left: -50}, 200);
                    me.$el.removeClass('menuOpen');
                    me.menuMode(false);
                }
                else
                {
                    // me.container.animate({
                    //     left: "80%"
                    // }, 200, function()
                    // {
                    //     me.menuMode(true);
                    // });
                    // me.shelf.$el.animate({left: 0}, 200);
                    me.$el.addClass('menuOpen');
                    me.menuMode(true);
                }
            },
            menuMode: function(state)
            {
                var me = this;
                me.header.menuMode(state);
                me.menuOpen = state;
            }
        });

        return Window;
    }
);