/** 
 * ffxivCompanion.js
 * 
 * Language file for ffxivCompanionDiscord.js
 * 
 * Original author: Onigiri070 (rpgPilgrim)
 */

/**
 * Region strings
 */
$.lang.register('ffxivdiscord.region.success', 'Region successfully changed to $1');
$.lang.register('ffxivdiscord.region.invalid', 'Invalid region. Please use NA, EU, or JP.');
$.lang.register('ffxivdiscord.region.current', 'Region currently set to $1');

/**
 * Lodestone search strings
 */
$.lang.register('ffxivdiscord.lodestone.usage', 'Please provide a first name, last name, and server name.');
$.lang.register('ffxivdiscord.lodestone.notfound', 'API return error: Character not found.');
$.lang.register('ffxivdiscord.lodestone.multiple', "Multiple matches found. Did you include the character's first name, last name and server?");
$.lang.register('ffxivdiscord.lodestone.found', 'Lodestone profile for $1: $2');
$.lang.register('ffxivdiscord.lodestone.embed.title', 'Final Fantasy XIV Lodestone');
$.lang.register('ffxivdiscord.lodestone.embed.desc', 'Lodestone profile for $1: $2');
$.lang.register('ffxivdiscord.lodestone.embed.footer', 'Final Fantasy XIV');

/**
 * Character registration strings
 */
$.lang.register('ffxivdiscord.charreg.usage', 'Please provide a first name, last name, and server name.');
$.lang.register('ffxivdiscord.charreg.success', '$1 successfully registered. Their profle URL can be accessed using: !profile $2');

/**
 * Profile strings
 */
$.lang.register('ffxivdiscord.profile.usage', 'Usage: !profile {firstNameOfCharacter}');
$.lang.register('ffxivdiscord.profile.success', 'Lodestone profile for $1: $2');

/**
 * Active character strings
 */
$.lang.register('ffxivdiscord.active.usage', 'Usage: !setactive {firstNameOfCharacter} {lastNameOfCharacter} {characterServer}');
$.lang.register('ffxivdiscord.active.success', 'Active character successfully set to $1 $2 on $3!');
$.lang.register('ffxivdiscord.active.error', 'Unable to set active character.');
$.lang.register('ffxivdiscord.active.limit', 'Please run !active by itself.');
$.lang.register('ffxivdiscord.active.current', 'Current active character: $1 $2 on $3');
