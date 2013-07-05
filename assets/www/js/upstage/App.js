define(
    [
        'jquery',
        'underscore',
        'router',
        'js/upstage/views/Window',
        'js/upstage/views/panes/Home',
        'js/upstage/views/panes/Lineup',
        'js/upstage/views/panes/Acts',
        'js/upstage/views/panes/Locations',
        'js/upstage/views/panes/Social',
        'js/upstage/views/panes/About'
    ],
    function(
        $,
        _,
        Router,
        Window,
        HomePane,
        LineupPane,
        ActsPane,
        LocationsPane,
        SocialPane,
        AboutPane
    )
    {
        var routes = {
            '/festival/:slug/home': function(slug)
            {
                var view = new HomePane({slug: slug});
                view.render();
                viewport.transition(view);
            },
            '/festival/:slug/lineup': function(slug)
            {
                var view = new LineupPane({slug: slug});
                view.render();
                viewport.transition(view);
            },
            '/festival/:slug/acts': function(slug)
            {
                var view = new ActsPane({slug: slug});
                view.render();
                viewport.transition(view);
            },
            '/festival/:slug/locations': function(slug)
            {
                var view = new LocationsPane({slug: slug});
                view.render();
                viewport.transition(view);
            },
            '/festival/:slug/social': function(slug)
            {
                var view = new SocialPane({slug: slug});
                view.render();
                viewport.transition(view);
            },
            '/festival/:slug/about': function(slug)
            {
                var view = new AboutPane({slug: slug});
                view.render();
                viewport.transition(view);
            }
        };
        var router = Router(routes);
        var viewport = new Window({router:router});
        viewport.render();
        window.location.href = "#/festival/glasgowbury/home";
        return router;
    }
);