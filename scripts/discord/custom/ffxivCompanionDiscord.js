/**
 * ffxivCompanion.js
 *
 * This module will act as a smart companion providing useful information
 * related to Final Fantasy XIV using the XIVAPI (https://xivapi.com/)
 */
(function() {

    /**
     * Unfortunately will have to pull and parse from the API by hand here.
     * That will take some time to learn...
     *  
     */


     /**
     * @function doCharacterEmbed
     *
     * Performs the character profile embed to discord.
     */
    function sendGoingLive(channelToGoLive) {
        setTimeout(function() {
            var enabledChannel = $.getIniDbBoolean('goinglive_channels', channelToGoLive);
            if ($.isOnline(channelToGoLive) && enabledChannel) {
                $.consoleDebug(">> Running (ONLINE) Going Live Update For " + channelToGoLive);
                autoHostQueue.add(channelToGoLive);
        
                $.discordAPI.sendMessageEmbed(channelName, new Packages.sx.blah.discord.util.EmbedBuilder()
                    .withColor(100, 65, 164)
                    .withThumbnail($.getLogo(channelToGoLive))
                    .withTitle($.lang.get('discord.streamhandler.common.link', $.username.resolve(channelToGoLive)))
                    .appendField($.lang.get('discord.streamhandler.common.game'), $.getGame(channelToGoLive), true)
                    .appendField($.lang.get('discord.streamhandler.common.title'), $.getStatus(channelToGoLive), true)
                    .appendField($.lang.get('discord.streamhandler.common.uptime'), $.getStreamUptime(channelToGoLive).toString(), true)
                    .appendField($.lang.get('discord.streamhandler.common.viewers'), $.getViewers(channelToGoLive), true)
                    .withTimestamp(Date.now())
                    .withFooterText('Twitch')
                    .withFooterIcon($.getLogo(channelToGoLive))
                    .withUrl('https://twitch.tv/' + channelToGoLive)
                    .build());
            }
        }, 5e2);
    }

    // Command event for when someone types a command for this module.
    $.bind('discordChannelCommand', function(event) {
        var channel = event.getDiscordChannel(),  // get channel
			command = event.getCommand(), // command name all lower case.
            //sender = event.getSender(),   // user who sent the command lower case.
            args = event.getArgs();       // each argument after the command in an array.

        // Command name.
        if (command.equalsIgnoreCase('randomstring')) {
            // Check for arguments, if needed.
            //if (args[0] === undefined) {
                // Say something to the user.
                //$.discord.say("Usage: !randomstring [length of the string]");
                // Stop here.
               // return;
           // }

            // Argument was said, say this in chat now.
            $.discord.say(channel, "Random string: " + getRandomString(parseInt(args[0])));
        }
    });

    // Event that runs once at boot-up if the module is enabled.
    $.bind('initReady', function() {
        // Register the command with the: module path, command name, and command permission.
        $.discord.registerCommand('./discord/commands/seed.js', 'randomstring', 0);
    });
})();
