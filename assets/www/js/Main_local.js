require.config({
    paths: {
        text: 'js/lib/require/text',
        jquery: 'js/lib/jquery',
        underscore: 'js/lib/underscore',
        router: 'js/lib/director',
        backbone: 'js/lib/backbone',
        hammer: 'js/lib/hammer',
        radio: 'js/lib/radio',
        moment: 'js/lib/moment'
    },
    shim: {
        'router': {
            exports: 'Router'
        },
        'hammer': {
            exports: 'Hammer'
        },
        'moment': {
            exports: 'moment'
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
    }
);