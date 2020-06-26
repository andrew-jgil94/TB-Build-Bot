const Discord = require("discord.js"); 

const embed = new Discord.MessageEmbed()
	.setColor('#4B0082')
	.setTitle('Updates')
    .setURL('https://discord.js.org/')
	.setAuthor('TB Build Bot', 'https://i.imgur.com/soU2tPn.png')
	.setDescription('A bot designed to help connect you with the builds that you want. Returns any mids or pines build from the database that matches the desired AT or Powerset.'+
					' Update - 6/12/2020: grammar update; all ATs (ex. heats/veats) updated - 4,136 builds and counting; search engine updated.')
	.setThumbnail('https://i.imgur.com/vvzx0hT.png')
    .addField('Special thanks: ', 'El Cubano, Kiki, Flirt and Zed!', true)

	.setTimestamp()
    .setFooter('Created by Desserts (@Fire Itch) - version 5.2.1');

   
module.exports = (embed);