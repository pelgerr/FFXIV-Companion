/**
 * ffxivCompanionTwitch.js
 *
 * This module will act as a smart companion providing useful information
 * related to Final Fantasy XIV using the XIVAPI (https://xivapi.com/)
 * 
 */

 (function() {
    
    /**
     * Global variables
     */ 
    var apiURI = "https://xivapi.com/",
        lodeURI = "https://na.finalfantasyxiv.com/lodestone/",
        charID = '',
        profileURL = '',
        region = $.getIniDbString('regions', 'currentRegion', 'unset');

    /**
     * Query the API for character data based on name and server
     * @param {*} charFirst 
     * @param {*} charLast 
     * @param {*} server 
     */
    function characterSearch(charFirst, charLast, server) {
        charQueryURL = apiURI + "character/search?name=" + charFirst + "+" + charLast + "&server=" + server;
        queryResults = $.customAPI.get(charQueryURL).content;
        queryJSON = JSON.parse(queryResults);

        // Success condition checking
        // This probably isn't right.
        if (queryJSON.Pagination.Results <= 0) {
            $.say("API error: Character not found.");
            return;
        } else if (queryJSON.Pagination.Results > 1) {
            $say("Multiple matches found. Did you include first and last name as well as server?");
            return;
        } else if (queryJSON.Pagination.Results == 1) {
            // Store character data 
            charID = queryJSON.Results[0].ID;
            charAvatar = queryJSON.Results[0].Avatar;
            charRank = queryJSON.Results[0].Rank;
            charRankIcon = queryJSON.Results[0].RankIcon;
            charServer = queryJSON.Results[0].Server;

            // Generate Profile URL 
            profileURL = "https://" + region + ".finalfantasyxiv.com/lodestone/character/" + charID;

            $.say(charFirst + " " + charLast + "Lodestone profile: " + profileURL);
        }

    }

    /**
     * 
     * Event handling
     * 
     */
    $.bind('command', function(event) {
    	var command = event.getCommand(),
            sender = event.getSender(),
            args = event.getArgs(),
            argument = String(event.getArguments());
        
        /**
         * Region switching
         * 
         * TODO: Limit regions to NA, EU, and JP
         */
        if (command.equalsIgnoreCase('xivregion')) {
            if (args.length < 1) {$.say("Region currently set to " + region); 
            return;
            }
            region = String(args[0].toLowerCase());
            $.setIniDbString('regions', 'currentRegion', region);
            $.say("Region successfully changed to " + region);
        }
    })

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
        $.registerChatCommand('./custom/ffxivCompanionTwitch.js', 'xivregion', 2)
    });
})();