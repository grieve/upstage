require.config({
    paths: {
        text: 'js/lib/require/text',
        jquery: 'js/lib/jquery',
        underscore: 'js/lib/underscore',
        router: 'js/lib/director',
        backbone: 'js/lib/backbone',
        hammer: 'js/lib/hammer'
    },
    shim: {
        'router': {
            exports: 'Router'
        },
        'hammer': {
            exports: 'Hammer'
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