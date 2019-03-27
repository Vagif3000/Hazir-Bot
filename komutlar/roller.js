const Discord = require('discord.js');

exports.run = (bot, message, params) => {
   const embed = new Discord.RichEmbed()
   .setColor("RANDOM")
   .setAuthor(message.guild.name, message.guild.userURL)
   .setThumbnail(message.guild.iconURL)
   .addField(':bust_in_silhouette:Varsayılan rol:', message.guild.defaultRole, true)
   .addField(':busts_in_silhouette:Roller:', message.guild.roles.map(role => role.name).join(', '), true)
   .setFooter('Rol Listesi', message.guild.iconURL)
   .setTimestamp()
   message.channel.send({embed});
   message.react('✅')
 };
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [],
   permLevel: 0,
   kategori: "sunucu"
 };
 exports.help = {
   komut: 'roller',
   aciklama: 'Sunucu bilgisini söyler.',
   kullanim: 'roller'
 };
