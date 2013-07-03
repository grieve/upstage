define(
    [
        'jquery',
        'underscore',
        'backbone',
        'hammer',
        'js/upstage/components/Header.js',
        'js/upstage/components/Shelf.js',
        'js/upstage/utils/FestivalManager'
    ],
    function(
        $,
        _,
        Backbone,
        Hammer,
        Header,
        Shelf,
        FestivalManager
    )
    {
        var IndexView = Backbone.View.extend({
            depth: 0,
            tagName: 'div',
            className: 'main-content container',
            events :{
                'click .action': 'handleActions'
            },
            initialize: function()
            {
                // var fm = new FileManager("Upstage");
                // fm.write('data/test/test.txt', "testing123123", 'w', function(data)
                // {
                //     fm.read('data/test/test.txt', function(data){ console.log(data); });
                // });
                var me = this;
                me.header = new Header();
                me.shelf = new Shelf();
                me.container = $('<div>');
                me.container.addClass('container primary-pane');
                me.menuMode(false);

                var menuToggle = function(evt)
                {
                    console.log(me.menuOpen + evt.type);
                    if(evt.type == "swiperight" && !me.menuOpen)
                        me.toggleShelf();
                    else if (evt.type == "swipeleft" && me.menuOpen)
                        me.toggleShelf();
                };
                Hammer(me.el).on("swipeleft", menuToggle);
                Hammer(me.el).on("swiperight", menuToggle);
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
            handleActions: function(evt)
            {
                evt.stopPropagation();
                evt.preventDefault();

                var me = this;
                var $elem = $(evt.currentTarget);
                var action = $elem.data('action');

                console.log(action);
                me[action](evt);
            },
            toggleShelf: function(evt)
            {
                var me = this;
                if(me.container.offset().left > 0)
                {
                    me.container.animate({
                        left: 0
                    }, 200, function()
                    {
                        me.menuMode(false);
                    });
                }
                else
                {
                    me.container.animate({
                        left: "80%"
                    }, 200, function()
                    {
                        me.menuMode(true);
                    });
                }
            },
            menuMode: function(state)
            {
                var me = this;
                me.header.menuMode(state);
                me.menuOpen = state;
            }
        });

        return IndexView;
    }
);