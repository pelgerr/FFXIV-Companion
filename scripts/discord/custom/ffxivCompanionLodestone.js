/**
 * ffxivCompanionLodestone.js
 *
 * This module will act as a smart companion checking for 
 * news posts on the official Final Fantasy XIV Lodestone using Raely's Lodestone API (https://github.com/mattantonelli/lodestone)
 * 
 * Original author: Onigiri070 (rpgPilgrim)
 * 
 */

(function() {

    // Check the API headers to see if the data has expired or been modified since the last check.
    //var HttpResponse = Packages.com.gmt2001.HttpResponse,
    //HttpRequest = Packages.com.gmt2001.HttpRequest,
    //HashMap = Packages.java.util.HashMap;
    //hashMap = new HashMap();
    //hashMap.put('Authorization', 'Client-ID ');
    //
    //var responseHeaders = HttpRequest.getResponseHeader
    //var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, "URL_HERE", "", hashMap),
    //    json = JSON.parse(responseData.content);

    function testHeaders() {
     var HttpRequest = Packages.com.gmt2001.HttpRequest;
                var HashMap = Packages.java.util.HashMap;
                var h = new HashMap(1);
                var r = HttpRequest.getData(HttpRequest.RequestType.GET, 'http://na.lodestonenews.com/news/feed', '', h); 
            if (r.success) {
                $.discord.say(channel, r.content);
            } else {
                $.discord.say(channel, "Error connecting to API");// do debug stuff here?
            }
    }

    // Event handling
    $.bind('discordChannelCommand', function(event) {
        channel = event.getDiscordChannel();  
		var	command = event.getCommand(), 
            //sender = event.getSender(), 
            args = event.getArgs();

        // !header command
        if (command.equalsIgnoreCase('header')) {
            if (args.length > 0) {
                $.discord.say(channel, 'No arguments, please.'); 
                return;
            } else {
                testHeaders();
                return;
            }
        }

        
    });

    /**
     * Permission group ID according to IllusionaryOne:
     * https://community.phantom.bot/t/setting-permission-for-a-command/4855
     * 
     * 0 = Broadcaster
     * 1 = Admin
     * 2 = Moderator
     * 3 = Subscriber
     * 4 = N/A
     * 5 = N/A
     * 6 = Regular
     * 7 = Viewer
     */
    $.bind('initReady', function() {
        // Register the command with the: module path, command name, and command permission.
        $.discord.registerCommand('./discord/custom/ffxivCompanionLodestone.js', 'header', 2);
    });
});