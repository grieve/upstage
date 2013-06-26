define(
    [
        'jquery',
        'underscore',
        'router',
        'js/upstage/views/Index',
        'js/upstage/views/Acts',
        'js/upstage/views/Stages',
        'js/upstage/views/Map',
        'js/upstage/views/Search'
    ],
    function(
        $,
        _,
        Router,
        IndexView,
        ActsView,
        StagesView,
        MapView,
        SearchView
    )
    {
        var currentView = null;
        var transitionView = function(newView, callback)
        {
            if(!currentView)
            {
                newView.$el.css({opacity:0});
                $('.page').replaceWith(newView.$el);
                newView.$el.animate({opacity:1}, 500);
                currentView = newView;
            }
            else
            {
                currentView.el.parentNode.insertBefore(newView.el, currentView.el);
                if (currentView.depth < newView.depth)
                {
                  newView.el.classList.add('push');
                  currentView.el.classList.add('fade');
                  newView.el.addEventListener('webkitAnimationEnd', pushEnd);

                  function pushEnd() {
                    newView.el.removeEventListener('webkitAnimationEnd', pushEnd);
                    newView.el.classList.remove('push');
                    currentView.el.parentNode.removeChild(currentView.el);
                    currentView = newView;
                    callback && callback();
                  }
                }
                else
                {
                  newView.el.style.opacity = 1;
                  currentView.el.classList.add('pop');
                  currentView.el.addEventListener('webkitAnimationEnd', popEnd);

                  function popEnd(){
                    currentView.el.removeEventListener('webkitAnimationEnd', popEnd);
                    currentView.el.parentNode.removeChild(currentView.el);
                    currentView = newView;
                    callback && callback();
                  }
                }
            }
        };
        var routes = {
            '/index': function()
            {
                var view = new IndexView();
                view.render();
                transitionView(view);
            },
            '/acts': function()
            {
                var view = new ActsView();
                view.render();
                transitionView(view);
            },
            '/stages': function()
            {
                var view = new StagesView();
                view.render();
                transitionView(view);
            },
            '/map': function()
            {
                var view = new MapView();
                view.render();
                transitionView(view);
            },
            '/search': function()
            {
                var view = new SearchView();
                view.render();
                transitionView(view);
            }
        };
        var router = Router(routes);
        return router;
    }
);