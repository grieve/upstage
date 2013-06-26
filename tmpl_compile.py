import os

MONITOR = "assets/www/js/upstage/templates"


def encode_templates():
    for root, dirs, files in os.walk(MONITOR):
        for tmpl in files:
            if tmpl.endswith(".html"):
                path = MONITOR + "/" + tmpl
                with open(path) as i:
                    with open(path + ".js", 'w') as o:
                        print "Encoding: '%s'" % path
                        content = "%r" % i.read()
                        o.write('define("text!' + path + '",[],function(){return "%s"});' % content.strip("'").replace("\"", "'"))

encode_templates()
