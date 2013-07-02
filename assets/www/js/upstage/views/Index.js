define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/upstage/components/Header.js',
        'js/upstage/components/Shelf.js',
        'js/upstage/utils/FestivalManager'
    ],
    function(
        $,
        _,
        Backbone,
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
                var returnToggle = function()
                {
                    me.toggleShelf();
                };
                if (state)
                {
                    me.container.on('click', returnToggle);
                }
                else
                {
                    me.container.off('click');
                }
            }
        });

        return IndexView;
    }
);