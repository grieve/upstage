define(
    [
        'jquery',
        'underscore',
        'backbone',
    ],
    function(
        $,
        _
    )
    {
        var FileManager = function(rootPath, callback)
        {
            var me = this;
            me.root = rootPath;
            me.listeners = [];
            if (callback)
                me.listeners.push(callback);
            window.requestFileSystem(
                LocalFileSystem.PERSISTENT,
                0,
                function(fs)
                {
                    me.isReady = true;
                    me.filesystem = fs;
                    _.each(me.listeners, function(listener)
                    {
                        listener();
                    });
                }
            );
        };
        
        FileManager.prototype.isReady = false;

        FileManager.prototype.getOrCreateDirectory = function(path, callback)
        {
            this.mkdir(path.split('/'), 0, callback);
        }

        FileManager.prototype.mkdir = function(dirs, idx, callback)
        {
            var me = this;
            if (idx >= dirs.length)
            {
                callback();
            }
            else
            {
                var path = "";
                for(var i=0; i <= idx; i++)
                {
                    if (i > 0)
                        path += '/';
                    path += dirs[i];
                }
                me.filesystem.root.getDirectory(
                    path,
                    {create: true, exclusive: false}, 
                    function()
                    {
                        me.mkdir(dirs, idx+1, callback);
                    },
                    me.error
                );
            }
        }

        FileManager.prototype.onReady = function(callback)
        {
            var me = this;
            if (me.isReady)
                callback();
            else
                me.listeners.push(callback);
        }

        FileManager.prototype.read = function(path, callback)
        {
            var me = this;
            if(!me.isReady)
            {
                throw "Filesystem is not ready";
            }
            path = me.root + "/" + path;
            var dirs = path.split('/');
            dirs.splice(dirs.length - 1, 1);
            me.getOrCreateDirectory(dirs.join('/'), function()
            {
                me.filesystem.root.getFile(
                    path,
                    null,
                    function(fileEntry)
                    {
                        fileEntry.file(function(file)
                        {
                            var reader = new FileReader();
                            reader.onloadend = function(evt) {
                                callback(evt.target.result);
                            };
                            reader.readAsText(file);
                        }, me.error);
                    },
                    me.error
                );
            });
        };

        FileManager.prototype.write = function(path, content, mode, callback)
        {
            var me = this;
            if(!me.isReady)
            {
                throw "Filesystem is not ready";
            }
            path = me.root + "/" + path;
            var dirs = path.split('/');
            dirs.splice(dirs.length - 1, 1);
            me.getOrCreateDirectory(dirs.join('/'), function()
            {
                me.filesystem.root.getFile(
                    path,
                    {create: true, exclusive: false},
                    function(fileEntry)
                    {
                        fileEntry.createWriter(function(writer)
                        {
                            writer.onwriteend = function(evt)
                            {
                                callback();
                            };
                            switch(mode)
                            {
                                case 'w':
                                    writer.write(content);
                                    break;
                                case 'a':
                                    writer.seek(writer.length);
                                    writer.write(content);
                                    break;
                            }
                        }, me.error);
                    },
                    me.error
                );
            });
        };

        FileManager.prototype.error = function(fileError)
        {
            for (var prop in FileError)
            {
                if (FileError[prop] == fileError.code)
                {
                    throw prop;
                }
            }
        }

        return FileManager;
    }
);