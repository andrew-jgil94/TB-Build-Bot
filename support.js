const Discord = require("discord.js"); 

const embed = new Discord.MessageEmbed()
	.setColor('#4B0082')
	.setTitle('TB Build Bot Help Desk')
    .setURL('https://discord.js.org/')
	.setAuthor('TB Build Bot', 'https://i.imgur.com/soU2tPn.png')
    .setDescription(' Searches should be formatted as <AT> <Primary Powerset> <Secondary Powerset>. Any powerset with a space should be indicated with a period ie ice.armor or fire.manipulation. '+
    'Some example searches are as follows:')
	.setThumbnail('https://i.imgur.com/vvzx0hT.png')
    .addField('Example searches:', 'tbrequest! controller\ntbrequest! tanker bio.armor \ntbrequest! fire.blast atom', true)
    .addField('Double check powers!', 'tbrequest! Brute spines fiery.aura is a good search; tbrequest! brute fire is not.', true)
    .addField('Only 2 arguments?', 'The search function assumes <AT> <Primary>, so a search such as tbrequest! brute fiery.aura will not find any builds.' , true)

	.setTimestamp()
    .setFooter('Created by Desserts (@Fire Itch). Questions? Concerns? Find me @Desserts#7397 on Discord.');

module.exports = (embed);