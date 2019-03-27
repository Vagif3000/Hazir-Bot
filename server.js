//consts (for glitch)
// GEREKLİ YERLER
const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
// GEREKLİ YERLER
// -------------------------------------------------------------
/**
	Örnek komuta göz atmayı unutmayın orada
	bir kaç şey yazıyor. komutlar/ornek.js
*/

const Discord = require('discord.js')
const client = new Discord.Client()

/**
	Aşağıya bilgilerinizi yazın.
	Üst kısımda modül ve gerekli yerler bulunuyor dokunmamanız önemle rica olunur.
*/

client.ayarlar = {

	prefix: "m!", // Ön-ek
	token: "tokeninizi yazin",
	klasor: "komutlar", // Komutların bulunduğu klasörün ismi
	renk: "#FF0000", // Embed rengi (HTML kodu veya RANDOM yazılabilir.)

	surum: "1.0.0", // Botunuzun sürümü
	site: "http://www.mcekip.tk/", // Botunuzun web sitesi
	yardimcilar: ["id"], // İstenirse daha fazla eklenebilir. Eğer yoksa [] içi temizlenebilir.
	sunucuekleme: "{sunucu} adlı sunucuya eklendim! Bu sunucuda toplam {uye} üye, {bot} bulunuyor! Şuan da toplam {sunucular} tane sunucuya hizmet veriyorum!", // Bot bir sunucuya katılınca konsolda yazacak yazı
	sunucuatma: "{sunucu} adlı sunucudan atıldım! Bu sunucuda toplam {uye} üye, {bot} bulunuyordu! Şuan da toplam {sunucular} tane sunucuya hizmet veriyorum!", // Bot bir sunucudan atılınca konsolda yazacak yazı
	oyun: "{prefix}yardım | {sunucu} sunucu | {site} | {kullanıcı} kullanıcı", // Oynuyor yeri, Burayı dilediğiniz şekilde değiştirebilirsiniz.
	oyundurum: "dinliyor", // Oynuyor durumu sadece oynuyor veya dinliyor veya izliyor yazabilirsiniz eğer bunlar dışında bir şey yazarsanız veya boş bırakırsanız direk oynuyor gözükecektir.
	durum: "rahatsizetmeyin" // Botun durumu sadece rahatsizetmeyin veya cevrimici veya bosta yazabilirsiniz eğer bunlar dışında bir şey yazarsanız veya boş bırakırsanız direk çevrimiçi gözükecektir.

}


/**
	Yukarıya bilgilerinizi yazın.
	Alt kısımda bot için gerekli komutlar bulunmaktadır. Eğer bozduğunuz şekilde hiçbir zaman yardım vermeyeceğim
*/

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

const fs = require('fs')
const chalk = require('chalk')

fs.readdir(`./${client.ayarlar.klasor}/`, (err, files) => {
	let jsfiles = files.filter(f => f.split(".").pop() === "js")

	if(jsfiles.length <= 0) {
		console.log(`${chalk.redBright("Üzgünüm ama hiçbir komut bulunamadı!")}`)
	} else {
		if (err) {
			console.error(`${chalk.redBright("Hata çıktı;")}\n${err}\n\n${chalk.greenBright("Hatayı düzeltmen için bir kaç tavsiye vereceğim. İlk öncelikle ayarları doğru girdiğinden ve boş bırakmadığından emin ol. Daha sonra kendin eklediğin komutlara iyice bak ve örnek komutla karşılaştır. Hatan varsa düzelt. Eğer kodda hata olduğunu düşünüyorsan bildirmekten çekinme!")}`)
		}
		console.log(`${chalk.yellow(jsfiles.length)} komut yüklenecek.`)

		jsfiles.forEach(f => {
			let props = require(`./${client.ayarlar.klasor}/${f}`)
			client.commands.set(props.help.komut, props)
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.komut)
			})
			console.log(`Yüklenen komut: ${props.help.komut}`)
		})
	}
})
var prefix = 'm!'
client.on("ready", () => {
	var odurumlar = ["oynuyor", "dinliyor", "izliyor"]
	var odurum = "PLAYING"

	if(odurumlar.includes(client.ayarlar.oyundurum)) {
		var odurum = client.ayarlar.oyundurum.replace("oynuyor", "PLAYING").replace("dinliyor", "LISTENING").replace("izliyor", "WATCHING")
	}

	var durumlar = ["rahatsizetmeyin", "cevrimici", "bosta"]
	var durum = "dnd"

	if(durumlar.includes(client.ayarlar.durum)) {
		var durum = client.ayarlar.oyundurum.replace("rahatsizetmeyin", "dnd").replace("cevrimici", "online").replace("bosta", "idle")
	}

	client.user.setPresence({
		game: {
			name: client.ayarlar.oyun.replace(/{prefix}/g, client.ayarlar.prefix).replace(/{kullanıcı}/g, client.users.size).replace(/{sunucu}/g, client.guilds.size).replace(/{site}/g, client.ayarlar.site),
			type: odurum
		},
		status: durum
	})
	console.log(`Başarıyla komutlar yüklendi. Bot giriş yaptı!`)
})

client.on("guildCreate", guild => {
	console.log(client.ayarlar.sunucuekleme.replace(/{sunucu}/g, chalk.yellow(guild.name)).replace(/{bot}/g, chalk.blue(guild.members.filter(m => m.user.bot).size)).replace(/{uye}/g, chalk.green(guild.members.filter(m => !m.user.bot).size)).replace(/{sunucular}/g, chalk.redBright(client.guilds.size)))
	var odurumlar = ["oynuyor", "dinliyor", "izliyor"]
	var odurum = "PLAYING"

	if(odurumlar.includes(client.ayarlar.oyundurum)) {
		var odurum = client.ayarlar.oyundurum.replace("oynuyor", "PLAYING").replace("dinliyor", "LISTENING").replace("izliyor", "WATCHING")
	}

	var durumlar = ["rahatsizetmeyin", "cevrimici", "bosta"]
	var durum = "dnd"

	if(durumlar.includes(client.ayarlar.durum)) {
		var durum = client.ayarlar.oyundurum.replace("rahatsizetmeyin", "dnd").replace("cevrimici", "online").replace("bosta", "idle")
	}

	client.user.setPresence({
		game: {
			name: client.ayarlar.oyun.replace(/{prefix}/g, client.ayarlar.prefix).replace(/{kullanıcı}/g, client.users.size).replace(/{sunucu}/g, client.guilds.size).replace(/{site}/g, client.ayarlar.site),
			type: odurum
		},
		status: durum
	})
})

client.on("guildDelete", guild => {
	console.log(client.ayarlar.sunucuatma.replace(/{sunucu}/g, chalk.yellow(guild.name)).replace(/{bot}/g, chalk.blue(guild.members.filter(m => m.user.bot).size)).replace(/{uye}/g, chalk.green(guild.members.filter(m => !m.user.bot).size)).replace(/{sunucular}/g, chalk.redBright(client.guilds.size)))
	var odurumlar = ["oynuyor", "dinliyor", "izliyor"]
	var odurum = "PLAYING"

	if(odurumlar.includes(client.ayarlar.oyundurum)) {
		var odurum = client.ayarlar.oyundurum.replace("oynuyor", "PLAYING").replace("dinliyor", "LISTENING").replace("izliyor", "WATCHING")
	}

	var durumlar = ["rahatsizetmeyin", "cevrimici", "bosta"]
	var durum = "dnd"

	if(durumlar.includes(client.ayarlar.durum)) {
		var durum = client.ayarlar.oyundurum.replace("rahatsizetmeyin", "dnd").replace("cevrimici", "online").replace("bosta", "idle")
	}

	client.user.setPresence({
		game: {
			name: client.ayarlar.oyun.replace(/{prefix}/g, client.ayarlar.prefix).replace(/{kullanıcı}/g, client.users.size).replace(/{sunucu}/g, client.guilds.size).replace(/{site}/g, client.ayarlar.site),
			type: odurum
		},
		status: durum
	})
})

client.on("message", async message => {
	if (message.author.bot) return
	if (!message.content.startsWith(client.ayarlar.prefix)) return
	var command = message.content.split(' ')[0].slice(client.ayarlar.prefix.length)
	var args = message.content.split(' ').slice(1)
	var cmd = ''

	if (client.commands.has(command)) {
		var cmd = client.commands.get(command)
	} else if (client.aliases.has(command)) {
		var cmd = client.commands.get(client.aliases.get(command))
	}
		if(message.channel.type === "dm") {
			if (cmd.conf.guildOnly === true) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komut özel mesajlarda devredışı bırakılmış!`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send({embed})
				return
			}
		}
		cmd.run(client, message, args)
	})

const { GOOGLE_API_KEY } = require('./anahtarlar.json');
const YouTube = require('simple-youtube-api');
const queue = new Map();  
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require('ytdl-core');

client.on('message', async msg => {

	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)
	if (command === 'oynat') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
    .setDescription(' <:x:474973245477486612> | İlk Olarak Sesli Bir Kanala Giriş Yapmanız Gerek.'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(' <:x:474973245477486612> | İlk Olarak Sesli Bir Kanala Giriş Yapmanız Gerek.'));
		}
		if (!permissions.has('SPEAK')) {
			 return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(' <:x:474973245477486612> | Şarkı başlatılamıyor. Lütfen Mikrofonumu Açınız.'));
        }

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			 return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setTitle(`**✅ | Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          
				 msg.channel.sendEmbed(new Discord.RichEmbed()                  
         .setTitle('MCEKİP BOT | Şarkı Seçimi')
         .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
         .setFooter('Lütfen 1-10 arasında bir rakam seçiniz 10 saniye içinde liste iptal edilecektir.')
         .setColor('0x36393E'));
          msg.delete(5000)
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						 return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('0x36393E')
            .setDescription('<:x:474973245477486612> | **Şarkı Değeri Belirtmediğiniz İçin Seçim İptal Edilmiştir**.'));
                    }
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('0x36393E')
          .setDescription('<:x:474973245477486612> | **Aradaım Fakat Hiç Bir Sonuç Çıkmadı**'));
                }
            }
			return handleVideo(video, msg, voiceChannel);
      
		}
	} else if (command === 'geç') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' <:x:474973245477486612> | **Lütfen Öncelikle Sesli Bir Kanala Katılınız**.'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<:x:474973245477486612> | **Hiç Bir Müzik Çalmamakta**'));                                              
		serverQueue.connection.dispatcher.end('**Müziği Geçtim!**');
		return undefined;
	} else if (command === 'durdur') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('**<:x:474973245477486612> | Lütfen Öncelikle Sesli Bir Kanala Katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<:x:474973245477486612> **| Hiç Bir Müzik Çalmamakta**'));                                              
		msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**Müzik Bitti**');
		return undefined;
	} else if (command === 'ses') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('<:x:474973245477486612> **| Lütfen Öncelikle Sesli Bir Kanala Katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<:x:474973245477486612> | **Hiç Bir Müzik Çalmamakta**'));                                              
		if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
   .setTitle(`:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    .setColor('RANDOM'))
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`:loud_sound: Ses Seviyesi **${args[1]}** Olarak Ayarlandı.`)
    .setColor('RANDOM'));                             
	} else if (command === 'çalan') {
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("<:x:474973245477486612> | **Çalan Müzik Bulunmamakta**")
    .setColor('RANDOM'));
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle("MCEKİP BOT | Çalan")                            
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 'sıra') {
    let index = 0;
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("<:x:474973245477486612> | **Sırada Müzik Bulunmamakta**")
    .setColor('RANDOM'));
		  return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setTitle('MCEKİP BOT | Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
    .addField('Şu anda çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === 'duraklat') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("**:pause_button: Müzik Senin İçin Durduruldu!**")
      .setColor('RANDOM'));
		}
		return msg.channel.send('<:x:474973245477486612> | **Çalan Müzik Bulunmamakta**');
	} else if (command === 'devam') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("**:arrow_forward: Müzik Senin İçin Devam Etmekte!**")
      .setColor('RANDOM'));
		}
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("**<:x:474973245477486612> | Çalan Müzik Bulunmamakta.**")
    .setColor('RANDOM'));
	}
  

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
        durations: video.duration.seconds,
    views: video.views,
    };
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`<:x:474973245477486612> **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`);
			queue.delete(msg.guild.id);
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`<:x:474973245477486612> **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`)
      .setColor('RANDOM'))
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`<:white_check_mark:474982945304608769> **${song.title}** Adlı Müzik Kuyruğa Eklendi!`)
    .setColor('RANDOM'))
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === '<:x:474973245477486612> | **Yayın Akış Hızı Yeterli Değil.**') console.log('Müzik Bitti.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	 serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()                                   
  .setTitle("**MCEKİP BOT | 🎙 Müzik Başladı**",`https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('\nBaşlık', `[${song.title}](${song.url})`, true)
  .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
  .addField("Süre", `${song.durationm}:${song.durations}`, true)
  .setColor('RANDOM'));
}
client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})
client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RED")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :outbox_tray: Kullanıcı Ayrıldı. \`${sayac[member.guild.id].sayi}\` Kişi Olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` Kişi Kaldı \`${member.guild.memberCount}\` Kişiyiz! :x: **${member.user.tag}**`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("GREEN")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :inbox_tray: Kullanıcı Katıldı! **${sayac[member.guild.id].sayi}** Kişi Olmamıza **${sayac[member.guild.id].sayi - member.guild.memberCount}** Kişi Kaldı **${member.guild.memberCount}** Kişiyiz! ${process.env.basarili} Hoşgeldin! **${member.user.tag}**` );
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
        let role = otorole[member.guild.id]
  let giriscikis = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/otorol.json", "utf8"));  
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :inbox_tray:  <@${member.user.id}>'a Başarıyla Rol Verildi`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)




});



client.login(client.ayarlar.token)

//VAGİF
