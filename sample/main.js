requirejs.config({    
    paths: {
        prettytime: '../dist/prettytime.min',
        i18next: './scripts/i18next.amd-1.7.4.min'
    }
});

define([
    'i18next',
    'prettytime'
], function (i18n, prettytime) {
    var i18NOptions = {
        detectFromHeaders: false,
        lng: 'en',
        fallbackLang: 'en',
        ns: 'prettytime',
        //example for multiple namespaces
        //ns: {
        //    namespaces: ['app', 'prettytime'],
        //    defaultNs: 'app'
        //},
        resGetPath: '../dist/locales/__lng__/__ns__.json',
        useCookie: false,
    };

    function writeMessage(message) {
        var messageDiv = document.createElement('DIV');
        messageDiv.innerHTML = message;

        document.getElementById('messages').appendChild(messageDiv);
    }

    i18n.init(i18NOptions, function () {
        var date = new Date();
        //just now
        writeMessage('Expects: moments from now');
        writeMessage(new prettytime().format(new Date())); 
        //1 hour
        writeMessage('Expects: 1 hour from now');
        writeMessage(new prettytime().format(new Date(date.getTime() + 1000 * 60 * 61)));
        //1 day
        writeMessage('Expects: 1 day from now');
        writeMessage(new prettytime().format(new Date(date.getTime() + 1000 * 60 * 61 * 24)));
        //1 week 
        writeMessage('Expects: 1 week from now');
        writeMessage(new prettytime().format(new Date(date.getTime() + 1000 * 60 * 61 * 24 * 7)));
        //1 month
        writeMessage('Expects: 1 month from now');
        writeMessage(new prettytime().format(new Date(date.getTime() + 2929743831)));
        //1 year
        writeMessage('Expects: 1 year from now');
        writeMessage(new prettytime().format(new Date(date.getTime() + 2629743831 * 12)));
        //1 decade 
        writeMessage('Expects: 1 decade from now');
        writeMessage(new prettytime().format(new Date(date.getTime() + 325569259748)));
        //1 century
        writeMessage('Expects: 1 century from now');
        writeMessage(new prettytime().format(new Date(date.getTime() + 3255692597471)));
        //1 millennia
        writeMessage('Expects: 1 millennia from now');
        writeMessage(new prettytime().format(new Date(date.getTime() + 32556926000001)));        
        //just now
        writeMessage('Expects: moments ago');
        writeMessage(new prettytime().format(new Date((date.getTime() + 1000 * -1))));        
        //1 hour ago
        writeMessage('Expects: 1 hour ago');
        writeMessage(new prettytime().format(new Date((date.getTime() + 1000 * 60 * 60 * -1))));
        //1 day ago
        writeMessage('Expects: 1 day ago');
        writeMessage(new prettytime().format(new Date((date.getTime() + 1000 * 60 * 60 * 24 * -1))));
        //1 week  ago
        writeMessage('Expects: 1 week ago');
        writeMessage(new prettytime().format(new Date((date.getTime() + 1000 * 60 * 60 * 24 * 7 * -1))));
        //1 month ago
        writeMessage('Expects: 1 month ago');
        writeMessage(new prettytime().format(new Date((date.getTime() + 2629743830 * -1))));
        //1 year ago
        writeMessage('Expects: 1 year ago');
        writeMessage(new prettytime().format(new Date((date.getTime() + 2629743830 * 12 * -1))));
        //1 decade  ago
        writeMessage('Expects: 1 decade ago');
        writeMessage(new prettytime().format(new Date((date.getTime() + 315569259747 * -1))));
        //1 century ago
        writeMessage('Expects: 1 century ago');
        writeMessage(new prettytime().format(new Date((date.getTime() + 3155692597470 * -1))));
        //1 millennia ago
        writeMessage('Expects: 1 millennia ago');
        writeMessage(new prettytime().format(new Date((date.getTime() + 31556926000000 * -1))));
         
        var then = new Date("5-20-2009");
        var ref = new Date("6-17-2009");
        var t = new prettytime(ref);
        writeMessage('Expects: 1 month ago');
        writeMessage(t.format(then));
      
        try {
            t = new prettytime();
            date = null;
            writeMessage("Expects: error thrown");
            writeMessage(t.format(date));    
        } catch (e) {
            writeMessage('error thrown');
        }   
         
        writeMessage("Expects: moments from now") ;
        writeMessage(t.format(new Date()));        
            
        t = new prettytime(new Date(0));
        writeMessage("Expects: moments from now") ; 
        writeMessage(t.format(new Date(600)));
         
        t = new prettytime(new Date(0));
        writeMessage("Expects: 12 minutes from now") ; 
        writeMessage(t.format(new Date(1000 * 60 * 12)));
        
    
        t = new prettytime(new Date(0));
        writeMessage("Expects: 3 hours from now") ;
        writeMessage(t.format(new Date(1000 * 60 * 60 * 3)));

        t = new prettytime(new Date(0));
        writeMessage("Expects: 3 days from now") ; 
        writeMessage(t.format(new Date(1000 * 60 * 60 * 24 * 3)));

        t = new prettytime(new Date(0));
        writeMessage("Expects: 3 weeks from now") ; 
        writeMessage(t.format(new Date(1000 * 60 * 60 * 24 * 7 * 3)));

        t = new prettytime(new Date(0));
        writeMessage("Expects: 3 months from now") ;
        writeMessage(t.format(new Date(2629743830 * 3)));

        t = new prettytime(new Date(0));
        writeMessage("Expects: 3 years from now") ; 
        writeMessage(t.format(new Date(2629743830 * 12 * 3)));

        t = new prettytime(new Date(0));
        writeMessage("Expects: 3 decades from now") ; 
        writeMessage(t.format(new Date(315569259747 * 3)));
        t = new prettytime(new Date(0));

        writeMessage("Expects: 3 centuries from now") ;
        writeMessage(t.format(new Date(3155692597470 * 3)));
    
        t = new prettytime(new Date(6000));
        writeMessage("Expects: moments ago") ; 
        writeMessage(t.format(new Date(0)));
        
        t = new prettytime(new Date(1000 * 60 * 12));
        writeMessage("Expects: 12 minutes ago") ;
        writeMessage(t.format(new Date(0)));
        
        t = new prettytime(new Date(1000 * 60 * 60 * 3));
        writeMessage("Expects: 3 hours ago") ; 
        writeMessage(t.format(new Date(0)));
        
        t = new prettytime(new Date(1000 * 60 * 60 * 24 * 3));
        writeMessage("Expects: 3 days ago") ; 
        writeMessage(t.format(new Date(0)));
        
        t = new prettytime(new Date(1000 * 60 * 60 * 24 * 7 * 3));
        writeMessage("Expects: 3 weeks ago") ; 
        writeMessage(t.format(new Date(0)));
        
        t = new prettytime(new Date(2629743830 * 3));
        writeMessage("Expects: 3 months ago") ; 
        writeMessage(t.format(new Date(0)));
                    
        t = new prettytime(new Date(2629743830 * 12 * 3));
        writeMessage("Expects: 3 years ago") ; 
        writeMessage(t.format(new Date(0)));
       
        t = new prettytime(new Date(315569259747 * 3));
        writeMessage("Expects: 3 decades ago") ; 
        writeMessage(t.format(new Date(0)));
       
        t = new prettytime(new Date(3155692597470 * 3));
        writeMessage("Expects: 3 centuries ago") ; 
        writeMessage(t.format(new Date(0)));
       
        t = new prettytime();
        writeMessage("Expects: 2 hours ago") ; 
        writeMessage(t.format(new Date(new Date().getTime() - 6543990)));
         
        t = new prettytime();
        var durations = t.calculatePreciseDuration(new Date(new Date().getTime() + 1000 * (10 * 60 + 5 * 60 * 60)));
        writeMessage("Expets: true");
        writeMessage(durations.length >= 2); // might be more because of milliseconds between date capturing and result calculation
        writeMessage("Expects: 5"); writeMessage(durations[0].quantity);
        writeMessage("Expects: 10"); writeMessage(durations[1].quantity);
       
        t = new prettytime();
        durations = t.calculatePreciseDuration(new Date(new Date().getTime() - 1000 * (10 * 60 + 5 * 60 * 60)));
        writeMessage("Expets: true");
        writeMessage(durations.length >= 2); // might be more because of milliseconds between date capturing and result calculation
        writeMessage("Expects: -5");
        writeMessage(durations[0].quantity);
        writeMessage("Expects: -10");
        writeMessage(durations[1].quantity);
        
        t = new prettytime(new Date(1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 15 + 1000 * 60 * 38));
        durations = t.calculatePreciseDuration(new Date(0));
        writeMessage("Expects: 3 days 15 hours 38 minutes ago") ;
        writeMessage(t.formatDurations(durations));
        
        t = new prettytime(new Date(0));
        durations = t.calculatePreciseDuration(new Date(1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 15 + 1000 * 60 * 38));
        writeMessage("Expects: 3 days 15 hours 38 minutes from now") ; 
        writeMessage(t.formatDurations(durations));
                 
        var tenMinMillis = 600000;
        var tenMinAgo = new Date((new Date()).getTime() - tenMinMillis);
        t = new prettytime();        
        writeMessage("Expects: 10 minutes");       
        writeMessage(t.formatApproximateDuration(tenMinAgo));

        t = new prettytime(); 
        writeMessage("Expects 40 minutes 40 seconds ago");
        writeMessage(t.formatDurations(t.calculatePreciseDuration(new Date(new Date().getTime() - 40 * 60 * 1000 - 40 * 1000))));

        t = new prettytime();
        t.clearUnits();
        t.registerUnit({ maxQuantity: 0, millisPerUnit: 1000 * 60, resourcePrefix: 'Minute' });
        writeMessage("Expects 41 minutes ago");
        writeMessage(t.formatDurations(t.calculatePreciseDuration(new Date(new Date().getTime() - 40 * 60 * 1000 - 40 * 1000))));
    });
});