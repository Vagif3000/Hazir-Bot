const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async (client,message,args) => {
    const embed = new Discord.RichEmbed()
    .setImage(`http://18.184.116.22/api/cerceve?cerceve=brilliance&url=${message.author.avatarURL}`)
    .setColor(0xff7f00)
    return message.channel.send(embed)
}
  
    

                                       
                                       
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    kategori: "eğlence"
  };
 
  exports.help = {
    komut: 'brilliance',
    description: 'brilliance2',
    usage: 'brilliance'
  };