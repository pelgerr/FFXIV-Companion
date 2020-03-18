# FFXIV Companion - PhantomBot Custom Module  

*A Twitch and Discord companion module for use with PhantomBot*  

---

### Installation

1. Download this repository and unzip. Copy and paste the *scripts/* folder into your PhantomBot directory.  
*Note: You should not be prompted to replace anything. If you are, place the files in their respective directories, individually.*
2. Start PhantomBot and enable the module, if necessary.

### Usage

***Changing Regions***  
`!xivregion {NA | EU | JP}` - Changes the region the bot uses to perform server-specific searches and Lodestone URL generation. Valid regions are NA, EU, and JP.  
Using `!xivregion` alone will display the current region.  

***Searching for Characters on the Lodestone***  
`!lodestone {first} {last} {server}` - Performs a search for the specified character and returns a Lodestone profile URL if successful. Requires the character's first name, last name and server name.  
![](https://i.imgur.com/pJVhXk4.png)

***Registering Characters***  
`!xivregister` - Registers characters with the bot. Registered characters will have their full name and Lodestone profile URL stored in PhantomBot's local database. This allows for the character data to be retrieved quickly and frequently without having to query the API.  
`!profile` - Displays the specified registered character's Lodestone profile URL.  
![](https://i.imgur.com/hsQd9NT.png)

***Active Character***  
`!setactive {first} {last} {server}` - Sets the active character. Commands that support optional arguments will use the active character's data if no arguments are used.  
`!active` - Displays the character currently set as active.

---  

There is much more on the way. The ultimate goal of this project is to create a comprehensive solution to the majority of FF XIV needs in both Twitch chat and Discord servers.  

As of right now all features are fully functional for both Twitch and Discord. The database is shared between both, so all data is accessible from both platforms.

*Have a feature you would like to request or a bug to report?*  
Head over to  [Project Issues](https://github.com/onigiri070/FFXIV-Companion/issues) and let me know!

---

### Contact  
[Twitter](https://twitter.com/8bitonigiri)  
[Twitch.tv](https://twitch.tv/8bitonigiri)  
[PhantomBot Community Forum](https://community.phantom.bot/u/unrealcroissant)  
[8bitOnigiri#3359](https://discordapp.com/) on Discord  
rpgpilgrim @ [irc.speedrunslive.com](http://www.speedrunslive.com/profiles/#!/rpgPilgrim/)
