/**
 * ffxivCompanionTwitch.js
 *
 * This module will act as a smart companion providing useful information
 * related to Final Fantasy XIV using the XIVAPI (https://xivapi.com/)
 * 
 */

(function() {
    
    /**
     * Global variable definition
     */ 
    var apiURI = "https://xivapi.com/",
        lodeURI = "https://na.finalfantasyxiv.com/lodestone/",
        charID = '',
        profileURL = '',
        region = $.getIniDbString('regionTable', 'currentRegion', 'unset');

    /**
     * Changes the active region. Performs a check to verify
     * the given region is valid. 
     * @function regionSwitch
     * @param {region code} region
     */
    function regionSwitch(args) {
        var regionArr = ["NA", "EU", "JP"];
        // Using .indexOf() we can check if the argument exists within the array
        if (regionArr.indexOf(String(args[0].toUpperCase())) !== -1) {
            region = String(args[0].toUpperCase());
            $.setIniDbString('regionTable', 'currentRegion', region);
            $.say("Region successfully changed to " + region);
        } else {
            $.say("Invalid region. Please use NA, EU, or JP.")
        }
    }

    /**
     * Query the API for character data based on name and server
     * @function characterSearch
     * @param {first name} charFirst 
     * @param {last name} charLast 
     * @param {server name} server 
     */
    function characterSearch(charFirst, charLast, server) {
        var charQueryURL = apiURI + "character/search?name=" + charFirst + "+" + charLast + "&server=" + server,
            resultsJSON = JSON.parse($.customAPI.get(charQueryURL).content);
        // Success check
        if (resultsJSON.Pagination.Results <= 0) {
            $.say("API return error: Character not found.");
            return;
        } else if (resultsJSON.Pagination.Results > 1) {
            $say("Multiple matches found. Did you include first and last name as well as server?");
            return;
        } else if (resultsJSON.Pagination.Results == 1) {
            // Store character summary data in variables
            charID = resultsJSON.Results[0].ID;
            //var charAvatar = resultsJSON.Results[0].Avatar,
            //    charRank = resultsJSON.Results[0].Rank,
            //    charRankIcon = resultsJSON.Results[0].RankIcon,
            //    charServer = resultsJSON.Results[0].Server;
            // Generate Profile URL 
            profileURL = "https://" + region.toLowerCase() + ".finalfantasyxiv.com/lodestone/character/" + charID;
            $.say(charFirst + " " + charLast + " Lodestone profile: " + profileURL);
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
         * Region command
         */
        if (command.equalsIgnoreCase('xivregion')) {
            if (args.length < 1) {$.say("Region currently set to " + region); 
            return;
            } else {
                regionSwitch(args);
            }
        }

        /**
         * Character commands
         */
        if (command.equalsIgnoreCase('findchar')) {
            if (args.length !== 3) {$.say("Please provide a first name, last name, and server.");
            return;
            } else {
                var charFirst = String(args[0]).toLowerCase(),
                    charLast = String(args[1]).toLowerCase(),
                    server = String(args[2]).toLowerCase();
            characterSearch(charFirst, charLast, server);
            }
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
        $.registerChatCommand('./custom/ffxivCompanionTwitch.js', 'xivregion', 2);
        $.registerChatCommand('./custom/ffxivCompanionTwitch.js', 'findchar', 2);
    });
})();