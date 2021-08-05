const { default: axios } = require("axios");
const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient,FortniteAPIIoClient, {assets}, checkSnowflakeId) => {
    if(args[0]==='player'){
        var player = args[1].replace('-', '').replace('-', '')
        axios.get(`https://swgoh.gg/api/player/${player}/`)
            .then(function (res) {
                console.log(res.data);
                function FormatAllyCode(nStr){
                    nStr += '';
                    x = nStr.split('.');
                    x1 = x[0];
                    x2 = x.length > 1 ? '.' + x[1] : '';
                    var rgx = /(\d+)(\d{3})/;
                    while (rgx.test(x1)) {
                    	x1 = x1.replace(rgx, '$1' + '-' + '$2');
                    }
                    return x1 + x2;
                }
                var PlayerData = [
                    `> **Name ➜ **\`${res.data.data.name}\``,
                    `> **Ally Code ➜ **\`${FormatAllyCode(res.data.data.ally_code)}\``,
                    `> **Level ➜ **\`${res.data.data.level}\``,
                    `> **Guild Name ➜ **\`${res.data.data.guild_name}\``,
                ]
                var StatsData = [
                    `> **Galactic Power ➜ **\`${new Intl.NumberFormat("es-ES").format(res.data.data.galactic_power)}\``,
                    `> **Galactic Power (Characters) ➜ **\`${new Intl.NumberFormat("es-ES").format(res.data.data.character_galactic_power)}\``,
                    `> **Galactic Power (Ships) ➜ **\`${new Intl.NumberFormat("es-ES").format(res.data.data.ship_galactic_power)}\``,
                    `> **Galactic Power (Ships) ➜ **\`${new Intl.NumberFormat("es-ES").format(res.data.data.ship_galactic_power)}\``
                ]
                var ArenaData = [
                    `> **Arena Rank ➜ **\`${new Intl.NumberFormat("es-ES").format(res.data.data.arena_rank)}\``,
                    `> **Fleet Arena Battles Won ➜ **\`${new Intl.NumberFormat("es-ES").format(res.data.data.ship_battles_won)}\``,
                    `> **Squad Arena Battles Won ➜ **\`${new Intl.NumberFormat("es-ES").format(res.data.data.pvp_battles_won)}\``
                ]
                const PlayerEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${res.data.data.name}`, `https://swgoh.gg/game-asset/u/${res.data.data.arena_leader_base_id}.png`)
                    .addField('Player', PlayerData.join('\n'))
                    .addField('Stats', StatsData.join('\n'))
                    .addField('Arena', ArenaData.join('\n'))
                    .setColor('#FD3D26')
                message.channel.send({embeds:[PlayerEmbed]})
            })
            .catch(function (error) {
                console.log(error);
            })
    } else if(args[0]==='gl'){
        axios.get(`https://swgoh.gg/api/gl-checklist/`)
            .then(function (res) {
                if(!args[1]){
                    const GLList = new Discord.MessageEmbed()
                        .setAuthor('Galactic Legends List')
                        .setDescription(res.data.units.map(n => `> **${n.unitName}**`).join('\n'))
                        .setColor('#FD3D26')
                    message.channel.send({embeds:[GLList]})
                } else {
                    var gl = res.data.units.find(n => n.unitName.toLowerCase()===args.slice(1).join(' ').toLowerCase())
                    console.log(gl)
                    const GLData = new Discord.MessageEmbed()
                        .setAuthor(`${gl.unitName}`, `https://swgoh.gg/game-asset/u/${gl.baseId}.png`)
                        .setThumbnail(`https://swgoh.gg${gl.image}`)
                        .setDescription(`> **Getting ${gl.unitName}'s Data**`)
                        .setColor('#FD3D26')
                    gl.requiredUnits.map(async ru => {
                        var Name = await axios.get(`https://swgoh.gg/api/characters/`);
                        var glName = Name.data.find(n => n.base_id===ru.baseId);
                        GLData.addField(`${glName.name}`, `> **Gear Level ➜ **\`${ru.gearLevel}\`\n> **Relic Tier ➜ **\`${ru.relicTier}\``, true).setDescription('')
                    })
                    message.channel.send({embeds:[GLData]}).then(msg => client.setTimeout(() => msg.edit({embeds:[GLData]}), 2000))
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}