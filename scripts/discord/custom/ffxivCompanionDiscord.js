/**
 * ffxivCompanion.js
 *
 * This module will act as a smart companion providing useful information
 * related to Final Fantasy XIV using the XIVAPI (https://xivapi.com/)
 */
(function() {

    // Global variable definition
    var apiURI = "https://xivapi.com/",
        charID = '',
        charURL = '',
        charName = '',
        channel = '',
        profileURL = '',
        active = $.getIniDbString('activeTable', 'current', 'unset'),
        region = $.getIniDbString('regionTable', 'currentRegion', 'unset');

    // regionSwitch 
    // Changes the active region. Performs a check to verify the given region is valid. 
    function regionSwitch(args) {
        var regionArr = ["NA", "EU", "JP"];
        // Using .indexOf() we can check if the argument exists within the array
        if (regionArr.indexOf(String(args[0].toUpperCase())) !== -1) {
            region = String(args[0].toUpperCase());
            $.setIniDbString('regionTable', 'currentRegion', region);
            $.discord.say(channel, $.lang.get('ffxivdiscord.region.success', region));
        } else {
            $.discord.say(channel, $.lang.get('ffxivdiscord.region.invalid'));
        }
    }

    // charSearch
    // Query the API for character data based on name and server 
    function charSearch(charFirst, charLast, server) {
        var charQueryURL = apiURI + "character/search?name=" + charFirst + "+" + charLast + "&server=" + server,
            resultsJSON = JSON.parse($.customAPI.get(charQueryURL).content);
        // Success check
        if (resultsJSON.Pagination.Results <= 0) {
            $.discord.say(channel, $.lang.get('ffxivdiscord.charsearch.notfound'));
            return;
        } else if (resultsJSON.Pagination.Results > 1) {
            $.discord.say(channel, $.lang.get('ffxivdiscord.charsearch.multiple'));
            return;
        } else if (resultsJSON.Pagination.Results == 1) {
            // Store character summary data in variables
            charID = resultsJSON.Results[0].ID;
            charName = resultsJSON.Results[0].Name;
            //var charAvatar = resultsJSON.Results[0].Avatar,
            //    charRank = resultsJSON.Results[0].Rank,
            //    charRankIcon = resultsJSON.Results[0].RankIcon,
            //    charServer = resultsJSON.Results[0].Server;
            // Generate Profile URL 
            charURL = "https://" + region.toLowerCase() + ".finalfantasyxiv.com/lodestone/character/" + charID;
        }
    }

//     /**
//     * @function doCharacterEmbed
//     *
//     * Performs the character profile embed to discord.
//     */
//    function sendGoingLive(channelToGoLive) {
//        setTimeout(function() {
//            var enabledChannel = $.getIniDbBoolean('goinglive_channels', channelToGoLive);
//            if ($.isOnline(channelToGoLive) && enabledChannel) {
//                $.consoleDebug(">> Running (ONLINE) Going Live Update For " + channelToGoLive);
//                autoHostQueue.add(channelToGoLive);
//        
//                $.discordAPI.sendMessageEmbed(channelName, new //Packages.sx.blah.discord.util.EmbedBuilder()
//                    .withColor(100, 65, 164)
//                    .withThumbnail($.getLogo(channelToGoLive))
//                    .withTitle($.lang.get('discord.streamhandler.common.link', //$.username.resolve(channelToGoLive)))
//                    .appendField($.lang.get('discord.streamhandler.common.game'), $.getGame//(channelToGoLive), true)
//                    .appendField($.lang.get('discord.streamhandler.common.title'), $.getStatus//(channelToGoLive), true)
//                    .appendField($.lang.get('discord.streamhandler.common.uptime'), //$.getStreamUptime(channelToGoLive).toString(), true)
//                    .appendField($.lang.get('discord.streamhandler.common.viewers'), //$.getViewers(channelToGoLive), true)
//                    .withTimestamp(Date.now())
//                    .withFooterText('Twitch')
//                    .withFooterIcon($.getLogo(channelToGoLive))
//                    .withUrl('https://twitch.tv/' + channelToGoLive)
//                    .build());
//            }
//        }, 5e2);
//    }

    // Event handling
    $.bind('discordChannelCommand', function(event) {
        channel = event.getDiscordChannel();  
		var	command = event.getCommand(), 
            //sender = event.getSender(),   // user who sent the command lower case.
            args = event.getArgs(); 

        // !xivregion command
        if (command.equalsIgnoreCase('xivregion')) {
            if (args.length < 1) {
                $.discord.say(channel, $.lang.get('ffxivdiscord.region.current', region)); 
                return;
            } else {
                regionSwitch(args);
                return;
            }
        }

        // !findchar command        
        if (command.equalsIgnoreCase('findchar')) {
            if (args.length !== 3) {
                $.discord.say(channel, $.lang.get('ffxivdiscord.charsearch.usage'));
                return;
            } else {
                var charFirst = String(args[0]).toLowerCase(),
                    charLast = String(args[1]).toLowerCase(),
                    server = String(args[2]).toLowerCase();
                charSearch(charFirst, charLast, server);
                $.discord.say(channel, $.lang.get('ffxivdiscord.charsearch.found', charName, charURL));
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
        $.discord.registerCommand('./discord/custom/ffxivCompanionDiscord.js', 'xivregion', 2);
        $.discord.registerCommand('./discord/custom/ffxivCompanionDiscord.js', 'findchar', 2);
    });
})();
