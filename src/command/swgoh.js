const { default: axios } = require("axios");
const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient,FortniteAPIIoClient, {assets}, checkSnowflakeId) => {
    if(!args[0]){
        const NoSubCommand = new Discord.MessageEmbed()
            .setAuthor(`Write a valid subcommand.`,assets.error)
            .setDescription('')
            .setColor('#ED4245')
        message.channel.send({embeds: [NoSubCommand]})
    } else if(args[0]==='player'){
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
    } else if(args[0]==='check'){
        async function checkData(allyCode,character) {
            var playerData = await axios.get(`https://swgoh.gg/api/player/${allyCode}/`);
        }
    } else if(args[0]==='character'){
        var characterListData = await axios.get(`https://swgoh.gg/api/characters/`);
        var characterData = characterListData.data.find(c => c.name.toLowerCase()===args.slice(1).join(' ').toLowerCase());
        console.log(characterData)
        var x = characterData;
        function sortCategories(alignment,categories){
            var perks = []
            if(categories.includes('Galactic Legend')){
                perks.splice(0,0,`> \`\`\`fix\n> ≜ Galactic Legend\n> \`\`\``)
                categories.splice(1,1)
                if(alignment==='Light Side'){
                    perks.splice(1,0,`\`\`\`md\n> # Light Side\n> \`\`\``)
                } else if(alignment==='Dark Side'){
                    perks.splice(1,0,`\`\`\`diff\n> - Dark Side\n> \`\`\``)
                }
                if(categories.includes('Tank')===true){
                    var l = categories.indexOf('Tank')
                    perks.splice(2,0,`\`\`\`diff\n> + ${categories[l]}\n> \`\`\``)
                    categories.splice(l,1)
                } else if(categories.includes('Support')===true){
                    var l = categories.indexOf('Support')
                    perks.splice(2,0,`\`\`\`diff\n> + ${categories[l]}\n> \`\`\``)
                    categories.splice(l,1)
                } else if(categories.includes('Attacker')===true){
                    var l = categories.indexOf('Attacker')
                    perks.splice(2,0,`\`\`\`diff\n> + ${categories[l]}\n> \`\`\``)
                    categories.splice(l,1)
                } else if(categories.includes('Healer')===true){
                    var l = categories.indexOf('Healer')
                    perks.splice(2,0,`\`\`\`diff\n> + ${categories[l]}\n> \`\`\``)
                    categories.splice(l,1)
                }
                categories.map(c => perks.splice(3,0,`\`\`\`diff\n> ⊹ ${c}\n> \`\`\``))
            } else {
                if(alignment==='Light Side'){
                    perks.splice(0,0,`\`\`\`md\n# Light Side\n\`\`\``)
                } else if(alignment==='Dark Side'){
                    perks.splice(0,0,`\`\`\`diff\n- Dark Side\n\`\`\``)
                }
                if(categories.includes('Tank')===true){
                    var l = categories.indexOf('Tank')
                    perks.splice(1,0,`\`\`\`diff\n+ ${categories[l]}\n\`\`\``)
                    categories.splice(l,1)
                } else if(categories.includes('Support')===true){
                    var l = categories.indexOf('Support')
                    perks.splice(1,0,`\`\`\`diff\n+ ${categories[l]}\n\`\`\``)
                    categories.splice(l,1)
                } else if(categories.includes('Attacker')===true){
                    var l = categories.indexOf('Attacker')
                    perks.splice(1,0,`\`\`\`diff\n+ ${categories[l]}\n\`\`\``)
                    categories.splice(l,1)
                } else if(categories.includes('Healer')===true){
                    var l = categories.indexOf('Healer')
                    perks.splice(1,0,`\`\`\`diff\n+ ${categories[l]}\n\`\`\``)
                    categories.splice(l,1)
                }
                categories.map(c => perks.splice(2,0,`\`\`\`diff\n⊹ ${c}\n\`\`\``))
            }
            return perks;
        }
        var gearListData = await axios.get(`https://swgoh.gg/api/gear/`);
        const embedData = new Discord.MessageEmbed()
            .setAuthor(`${x.name}'s Information`,x.image)
            .setDescription(`**${x.description}**`)
            .addField('Categories',`${sortCategories(x.alignment,x.categories).join('')}`,false)
            .addField('Information',`> **Role ➜ **\`${x.role}\`\n> **Activate Shards ➜ **\`${x.activate_shard_count}\`${client.emojis.cache.get('874805488791994458')}\n> **Max. Power ➜ **\`${Intl.NumberFormat("es-ES").format(x.power)}\``,false)
            .setColor('#FD3D26')
        /*x.gear_levels.map(async g => {
            if(g.tier<13){
                var gearLevels = {tier: g.tier,gear:[]}
                g.gear.map(gd => {
                    var gearData = gearListData.data.find(c => c.base_id===gd);
                    gearLevels.gear.push(gearData.name)    
                })
                embedData.addField(`Tier ${gearLevels.tier}`,gearLevels.gear.map(g => `> **\`${g}\`**`).join('\n'),false)
                console.log(gearLevels)
                console.log('-----------------------')
            } else {
                return
            }
        })*/
        message.channel.send({embeds: [embedData]})
    }
}