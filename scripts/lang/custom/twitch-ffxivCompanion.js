/** 
 * ffxivCompanion.js
 * 
 * Language file for ffxivCompanionTwitch.js
 * 
 * Original author: Onigiri070 (rpgPilgrim)
 */

/**
 * Region strings
 */
$.lang.register('ffxivtwitch.region.success', 'Region successfully changed to $1');
$.lang.register('ffxivtwitch.region.invalid', 'Invalid region. Please use NA, EU, or JP.');
$.lang.register('ffxivtwitch.region.current', 'Region currently set to $1');

/**
 * Lodestone strings
 */
$.lang.register('ffxivtwitch.lodestone.usage', 'Please provide a first name, last name, and server name.');
$.lang.register('ffxivtwitch.lodestone.notfound', 'API return error: Character not found.');
$.lang.register('ffxivtwitch.lodestone.multiple', "Multiple matches found. Did you include the character's first name, last name and server?");
$.lang.register('ffxivtwitch.lodestone.found', 'Lodestone profile for $1: $2');

/**
 * Character registration strings
 */
$.lang.register('ffxivtwitch.registration.usage', 'Please provide a first name, last name, and server name.');
$.lang.register('ffxivtwitch.registration.success', '$1 successfully registered. Their profle URL can be accessed using: !profile $2');

/**
 * Profile strings
 */
$.lang.register('ffxivtwitch.profile.usage', 'Usage: !profile {firstNameOfCharacter}');
$.lang.register('ffxivtwitch.profile.success', 'Lodestone profile for $1: $2');

/**
 * Active character strings
 */
$.lang.register('ffxivtwitch.active.usage', 'Usage: !setactive {firstNameOfCharacter} {lastNameOfCharacter} {characterServer}');
$.lang.register('ffxivtwitch.active.success', 'Active character successfully set to $1 $2 on $3!');
$.lang.register('ffxivtwitch.active.error', 'Unable to set active character.');
$.lang.register('ffxivtwitch.active.limit', 'Please run !active by itself.');
$.lang.register('ffxivtwitch.active.current', 'Current active character: $1 $2 on $3');
