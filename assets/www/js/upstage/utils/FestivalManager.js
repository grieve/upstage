define(
    [
        'jquery',
        'underscore',
        'moment',
        'text!data/glasgowbury.json'
    ],
    function(
        $,
        _,
        Moment,
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
                me.slugs[festival.slug] = me.fixTimes(festival);
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
        };

        FestivalManager.prototype.fixTimes = function(festival)
        {
            var me = this;
            _.each(festival['days'], function(d, i, days)
            {
               d['date'] = Moment.unix(d['date'] - 3600).utc();
               _.each(d['stages'], function(s, j, stages)
               {
                    var lead = null;
                    _.each(s['acts'], function(a, k, acts)
                    {
                        a['end'] = Moment.unix(a['end'] - 3600).utc();
                        a['start'] = Moment.unix(a['start'] - 3600).utc();
                        a['duration'] = a['end'].diff(a['start'])/60000;
                        if (lead)
                        {
                            a['leadtime'] = a['start'].diff(lead)/60000;
                        }
                        else
                        {
                            a['leadtime'] = 0;
                        }
                        lead = a['end'];
                    });
               });
            });
            console.log(festival);
            return festival;
        };

        return new FestivalManager();
    }
);