define(
    [
        'jquery',
        'underscore',
        'router',
        'js/upstage/views/Window',
        'js/upstage/views/Index',
        'js/upstage/views/Acts',
        'js/upstage/views/Stages',
        'js/upstage/views/Map',
        'js/upstage/views/About',
        'js/upstage/views/Search'
    ],
    function(
        $,
        _,
        Router,
        Window,
        IndexView,
        ActsView,
        StagesView,
        MapView,
        AboutView,
        SearchView
    )
    {
        var viewport = new Window();
        viewport.render();
        var routes = {
            '/index': function()
            {
            },
            '/festival/:slug/acts': function(slug)
            {
                var view = new ActsView({slug: slug});
                view.render();
                viewport.transition(view);
            },
            '/festival/:slug/stages': function(slug)
            {
                var view = new StagesView({slug: slug});
                view.render();
                viewport.transition(view);
            },
            '/festival/:slug/map': function(slug)
            {
                var view = new MapView({slug: slug});
                view.render();
                viewport.transition(view);
            },
            '/festival/:slug/search': function(slug)
            {
                var view = new SearchView({slug: slug});
                view.render();
                viewport.transition(view);
            },
            '/festival/:slug/about': function(slug)
            {
                var view = new AboutView({slug: slug});
                view.render();
                viewport.transition(view);
            }
        };
        var router = Router(routes);
        return router;
    }
);