document.addEventListener(
    "deviceready",
    function()
    {
        require.config({
            paths: {
                text: 'js/lib/require/text',
                jquery: 'js/lib/jquery',
                underscore: 'js/lib/underscore',
                router: 'js/lib/director',
                backbone: 'js/lib/backbone'
            },
            shim: {
                'router': {
                    exports: 'Router'
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
    },
    true
);