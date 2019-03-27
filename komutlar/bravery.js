const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async (client,message,args) => {
  
    const embed = new Discord.RichEmbed()
    .setImage(`http://18.184.116.22/api/cerceve?cerceve=bravery2&url=${message.author.avatarURL}`)
    .setColor(0xff7f00)
    return message.channel.send(embed)
  }
  
    

                                       ;
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    kategori: "eğlence"
  };
 
  exports.help = {
    komut: 'bravery',
    description: 'bravery1',
    usage: 'bravery'
  };