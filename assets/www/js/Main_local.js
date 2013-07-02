require.config({
    paths: {
        text: 'js/lib/require/text',
        jquery: 'js/lib/jquery',
        underscore: 'js/lib/underscore',
        router: 'js/lib/director',
        backbone: 'js/lib/backbone',
        snap: 'js/lib/snap'
    },
    shim: {
        'router': {
            exports: 'Router'
        },
        'snap': {
            exports: 'Snap'
        }
    }
});

require(
    [
        'js/upstage/App'
    ],
    function(App)
    {
        App.init();
        window.location.href = "#/index";
    }
);