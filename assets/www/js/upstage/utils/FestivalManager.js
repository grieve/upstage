define(
    [
        'jquery',
        'underscore',
        'text!data/glasgowbury.json'
    ],
    function(
        $,
        _,
        data_Glasgowbury
    )
    {
        var FestivalManager = function()
        {
            var me = this;
            me.data = [];
            me.data.push(JSON.parse(data_Glasgowbury));
            me.slugs = {};
            _.each(me.data, function(festival)
            {
                me.slugs[festival.slug] = festival;
            });
        };

        FestivalManager.prototype.get = function(id)
        {
            var me = this;
            if(typeof id == "number")
            {
                return me.data[id];
            }
            else if(typeof id == "string")
            {
                return me.slugs[id];
            }
        }

        return new FestivalManager();
    }
);