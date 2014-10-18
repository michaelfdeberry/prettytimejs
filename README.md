prettytimejs
============
A JavaScript port of the PrettyTime Java library. 

**Why**
I wanted more precise relative dates than what is offered by moment, timeago, or other libraries that I had tried. I've used [PrettyTime](https://github.com/ocpsoft/prettytime) and, [PrettyTime.net](https://code.google.com/p/prettytimedotnet/) C# port, and knew it offered the functionality that I wanted but couldn't JavaScript port.

**Localization**
This port does not currently have support for custom TimeFormats and because of that it doesn't support any language that required a TimeFormatProvider. 

Current unsupported locales are Czech, Finnish, Japanese, Russian, Ukrainian. All other languages that are supported by pretty time are included. 

**Requirements**
The module was written as a RequireJs module and requires the amd version of i18next of localization 
http://requirejs.org/
http://i18next.com/ 

**Usage**

    var pt = new prettytime();
    
    console.log(pt.format(new Date())); 
    //prints "moments ago"
    
    var durations = pt.calculatePreciseDuration(new Date(315480000));
    console.log(pt.formatDurations(durations));
    //prints "3 days 15 hours 38 minutes from now"
	
See sample app for other usage and configuration scenarios 

**License**
Apache 2.0