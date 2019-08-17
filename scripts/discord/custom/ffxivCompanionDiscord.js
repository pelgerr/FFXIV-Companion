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
        charAvatar =
        charRank = '',
        charRankIcon = '',
        charServer = '',
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

    // activeChar
    // Sets active character in database
    function activeChar(args) {
        var charFirst = String(args[0]),
            charLast = String(args[1]),
            server = String(args[2]);
        active = charFirst + ' ' + charLast + ' ' + server;
        $.setIniDbString('activeTable', 'current', active);
        $.discord.say(channel, $.lang.get('ffxivdiscord.active.success', charFirst, charLast, server));
    }    

    // getLodestone
    // Query the API for character data based on name and server 
    function getLodestone(charFirst, charLast, server) {
        var charQueryURL = apiURI + "character/search?name=" + charFirst + "+" + charLast + "&server=" + server,
            resultsJSON = JSON.parse($.customAPI.get(charQueryURL).content);
        // Success check
        if (resultsJSON.Pagination.Results <= 0) {
            $.discord.say(channel, $.lang.get('ffxivdiscord.lodestone.notfound'));
            return;
        } else if (resultsJSON.Pagination.Results > 1) {
            $.discord.say(channel, $.lang.get('ffxivdiscord.lodestone.multiple'));
            return;
        } else if (resultsJSON.Pagination.Results == 1) {
            // Store character summary data in variables
            charID = resultsJSON.Results[0].ID;
            charName = resultsJSON.Results[0].Name;
            charAvatar = resultsJSON.Results[0].Avatar,
            charRank = resultsJSON.Results[0].Rank,
            charRankIcon = resultsJSON.Results[0].RankIcon,
            charServer = resultsJSON.Results[0].Server;
            // Generate Profile URL 
            charURL = "https://" + region.toLowerCase() + ".finalfantasyxiv.com/lodestone/character/" + charID;
        }
    }

    // Embed functions
    function lodeEmbed (charAvatar, charName, charServer, charURL, charRank) {
        $.discordAPI.sendMessageEmbed(channel, new Packages.sx.blah.discord.util.EmbedBuilder()
            .withColor(0, 168, 249)
            .withThumbnail(charAvatar)
            .withTitle($.lang.get('ffxivdiscord.lodestone.embed.title'))
            .withDesc($.lang.get('ffxivdiscord.lodestone.embed.desc', charName, charURL))
            .appendField('Name', charName, true)
            .appendField('Server', charServer, true)
            .appendField('Rank', charRank, true)
            .withTimestamp(Date.now())
            .withFooterText($.lang.get('ffxivdiscord.lodestone.embed.footer'))
            .withUrl(charURL)
            .build());
    }

    // Event handling
    $.bind('discordChannelCommand', function(event) {
        channel = event.getDiscordChannel();  
		var	command = event.getCommand(), 
            //sender = event.getSender(), 
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

        // !setactive command
        if (command.equalsIgnoreCase('setactive')) {
            if (args.length !== 3) {
                $.discord.say(channel, $.lang.get('ffxivdiscord.active.usage'));
                return;
            } else {
                activeChar(args);
            }
        }

        // !active command
        if (command.equalsIgnoreCase('active')) {
            if (args.length > 0) {
                $.discord.say(channel, $.lang.get('ffxivdiscord.active.limit'));
                return;
            } else {
                var activeArr = active.split(' ');
                $.discord.say(channel, $.lang.get('ffxivdiscord.active.current', activeArr[0], activeArr[1], activeArr[2]));
            }
        }

        // !lodestone command        
        if (command.equalsIgnoreCase('lodestone')) {
            if (args.length !== 3) {
                $.discord.say(channel, $.lang.get('ffxivdiscord.lodestone.usage'));
                return;
            } else {
                var charFirst = String(args[0]).toLowerCase(),
                    charLast = String(args[1]).toLowerCase(),
                    server = String(args[2]).toLowerCase();
                getLodestone(charFirst, charLast, server);
                lodeEmbed(charAvatar, charName, charServer, charURL);
                //$.discord.say(channel, $.lang.get('ffxivdiscord.lodestone.found', charName, charURL));
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
        $.discord.registerCommand('./discord/custom/ffxivCompanionDiscord.js', 'lodestone', 2);
        $.discord.registerCommand('./discord/custom/ffxivCompanionDiscord.js', 'setactive', 2);
        $.discord.registerCommand('./discord/custom/ffxivCompanionDiscord.js', 'active', 2);
    });
})();
