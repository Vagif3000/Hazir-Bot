const fs = require ('fs')
const Discord = require('discord.js')
var sunucuyaözelayarlarOtorol = JSON.parse(fs.readFileSync("././sunucuyaözelayarlar/otorol.json", "utf8"));


exports.run = async (bot, message, args) =>
{
  	let profil = JSON.parse(fs.readFileSync("././sunucuyaözelayarlar/otorol.json", "utf8"));
  var mentionedChannel = message.mentions.channels.first();
  const o1 = new Discord.RichEmbed()
  .setTitle('Otorol ayarlama:')
  .setDescription('Otorolü ayarlamak için bir rol etiketlemelisin. Otorol kanalıda ayarlamayı unutma! Bu arada rolü benden altta yapman lazım yoksa rolü veremem.')
  .setColor('RANDOM')
  if (!mentionedChannel && args[0] !== "sıfırla") return message.channel.send(o1);
  if (message.guild.member(message.author.id).hasPermission(0x8))
    
    {
      var mentionedRole = message.mentions.roles.first();
      if (!mentionedRole) return message.channel.send('Doğru Kullanım = v!otorol @<roladı> #<metinkanalı>').then(msg => msg.delete(5000));
      

	if(!profil[message.guild.id]){
    
		profil[message.guild.id] = {
      
			sayi: mentionedRole.id,
      kanal: mentionedChannel.id
		};
	}
	
	profil[message.guild.id].sayi = mentionedRole.id
  profil[message.guild.id].kanal = mentionedChannel.id
	
	fs.writeFile("././sunucuyaözelayarlar/otorol.json", JSON.stringify(profil), (err) => {
		console.log(err)

	})

	const embed = new Discord.RichEmbed()
  .setTitle('Otorol ayarlandı!')
		.setDescription(`Otorol bu sunucuda ${args[0]} olarak ayarlandı! Otorol kanalı ise ${mentionedChannel} olarak ayarlandı`)
		.setColor("RANDOM")
		.setTimestamp()
	message.channel.send({embed})
}

}



exports.conf =
{
  enabled: true,
  guildOnly: true,
  aliases: ["setautorole", "otorol", "otoroldeğiştir","otorol-ayarla"],
  permLevel: 3,
  kategori: "moderasyon"
}

exports.help =
{
  komut: 'otorol',
  description: 'Sunucuya Girenlere Verilecek Olan Otorolü Ayarlar.',
  usage: 'otorolayarla'
}