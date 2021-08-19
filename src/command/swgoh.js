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
                    message.channel.send({embeds:[GLData]}).then(msg => setTimeout(() => msg.edit({embeds:[GLData]}), 2000))
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    } else if(args[0]==='check'){
        async function checkRequirements(allyCode,character) {
            const playerData = await axios.get(`https://swgoh.gg/api/player/${allyCode}/`);
            const galacticLegendsList = await axios.get(`https://swgoh.gg/api/gl-checklist/`);
            const charactersList = await axios.get(`https://swgoh.gg/api/characters/`);
            const galacticLegend = galacticLegendsList.data.units.find(n => n.unitName.toLowerCase()===character.toLowerCase())
            var requirements = {
                playerName: playerData.data.data.name,
                allyCode: playerData.data.data.ally_code,
                galacticLegend: {
                    unitName: galacticLegend.unitName,
                    baseId: galacticLegend.baseId,
                    image: `https://swgoh.gg/${galacticLegend.image}`,
                    requiredUnits:[]
                }
            }
            galacticLegend.requiredUnits.map(async galacticLegendUnit => {
                const playerUnit = await playerData.data.units.find(unit => unit.data.base_id===galacticLegendUnit.baseId);
                const gameUnit = charactersList.data.find(character => character.base_id===galacticLegendUnit.baseId);
                if(playerUnit===undefined){
                    var noData = {
                        unitName: gameUnit.name,
                        baseId: galacticLegendUnit.baseId,
                        playerHas: false
                    }
                    requirements.galacticLegend.requiredUnits.push(noData)
                } else {
                    
                    var data = {
                        unitName: gameUnit.name,
                        baseId: galacticLegendUnit.baseId,
                        gear: {
                            required: galacticLegendUnit.gearLevel,
                            unit: playerUnit.data.gear_level<0?0:playerUnit.data.gear_level,
                            match: playerUnit.data.gear_level>=galacticLegendUnit.gearLevel?true:false,
                        },
                        relic: {
                            required: galacticLegendUnit.relicTier,
                            unit: playerUnit.data.relic_tier-2<0?0:playerUnit.data.relic_tier-2,
                            match: playerUnit.data.relic_tier-2>=galacticLegendUnit.relicTier?true:false,
                        }
                    }
                    requirements.galacticLegend.requiredUnits.push(data)
                }
                
            })
            return requirements;
        }
        const check = await checkRequirements(args[1],args.slice(2).join(' '))
        console.log(check.galacticLegend.requiredUnits)
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${check.galacticLegend.unitName}'s Requirements Progress`)
            .setDescription(`> **Player Name ➜ **\`${check.playerName}\`\n> **Ally Code ➜ **\`${check.allyCode}\`\n> **Base Id ➜ **\`${check.galacticLegend.baseId}\``)
            .setColor('#FD3D26')
        
        check.galacticLegend.requiredUnits.map(unit => {
            if(unit.playerHas===false){
                embed.addField(unit.unitName,`> **Doesn\'t have the character**`,false)
            } else {
                embed.addField(unit.unitName,`> **Gear ➜ **\`${unit.gear.unit}/${unit.gear.required}\` ${unit.gear.match===true?client.emojis.cache.get('876872571243593738'):client.emojis.cache.get('876872571394621460')}\n> **Relic ➜ **\`${unit.relic.unit}/${unit.relic.required}\` ${unit.relic.match===true?client.emojis.cache.get('876872571243593738'):client.emojis.cache.get('876872571394621460')}`,false)
            }
        })
        message.channel.send({embeds: [embed]})
    } else if(args[0]==='character'){
        var characterListData = await axios.get(`https://swgoh.gg/api/characters/`);
        var characterData = characterListData.data.find(c => c.name.toLowerCase()===args.slice(1).join(' ').toLowerCase());
        var x = characterData;
        function sortCategories(alignment,categories){
            var perks = []
            if(categories.includes('Galactic Legend')){
                perks.splice(0,0,`> \`\`\`fix\n> ≜ Galactic Legend\n> \`\`\``)
                categories.splice(1,1)
                switch (alignment) {
                    case 'Light Side':
                        perks.splice(1,0,`\`\`\`md\n> # Light Side\n> \`\`\``)
                        break;
                    case 'Dark Side':
                        perks.splice(1,0,`\`\`\`diff\n> - Dark Side\n> \`\`\``)
                        break;
                }
                if(categories.includes('Tank')===true){
                    perks.splice(2,0,`\`\`\`diff\n> + ${categories[categories.indexOf('Tank')]}\n> \`\`\``)
                    categories.splice(categories.indexOf('Tank'),1)
                } else if(categories.includes('Support')===true){
                    perks.splice(2,0,`\`\`\`diff\n> + ${categories[categories.indexOf('Support')]}\n> \`\`\``)
                    categories.splice(categories.indexOf('Support'),1)
                } else if(categories.includes('Attacker')===true){
                    perks.splice(2,0,`\`\`\`diff\n> + ${categories[categories.indexOf('Attacker')]}\n> \`\`\``)
                    categories.splice(categories.indexOf('Attacker'),1)
                } else if(categories.includes('Healer')===true){
                    perks.splice(2,0,`\`\`\`diff\n> + ${categories[categories.indexOf('Healer')]}\n> \`\`\``)
                    categories.splice(categories.indexOf('Healer'),1)
                }
                categories.map(c => perks.splice(3,0,`\`\`\`diff\n> ⊹ ${c}\n> \`\`\``))
            } else {
                switch (alignment) {
                    case 'Light Side':
                        perks.splice(0,0,`\`\`\`md\n# Light Side\n\`\`\``)
                        break;
                    case 'Dark Side':
                        perks.splice(0,0,`\`\`\`diff\n- Dark Side\n\`\`\``)
                        break;
                }
                if(categories.includes('Tank')===true){
                    perks.splice(1,0,`\`\`\`diff\n+ ${categories[categories.indexOf('Tank')]}\n\`\`\``)
                    categories.splice(categories.indexOf('Tank'),1)
                } else if(categories.includes('Support')===true){
                    perks.splice(1,0,`\`\`\`diff\n+ ${categories[categories.indexOf('Support')]}\n\`\`\``)
                    categories.splice(categories.indexOf('Support'),1)
                } else if(categories.includes('Attacker')===true){
                    perks.splice(1,0,`\`\`\`diff\n+ ${categories[categories.indexOf('Attacker')]}\n\`\`\``)
                    categories.splice(categories.indexOf('Attacker'),1)
                } else if(categories.includes('Healer')===true){
                    perks.splice(1,0,`\`\`\`diff\n+ ${categories[categories.indexOf('Healer')]}\n\`\`\``)
                    categories.splice(categories.indexOf('Healer'),1)
                }
                categories.map(c => perks.splice(2,0,`\`\`\`diff\n⊹ ${c}\n\`\`\``))
            }
            return perks;
        }
        var gearListData = await axios.get(`https://swgoh.gg/api/gear/`);
        const embedData = new Discord.MessageEmbed()
            .setAuthor(`${characterData.name}'s Information`,characterData.image)
            .setDescription(`**${characterData.description}**`)
            .addField('Categories',`${sortCategories(characterData.alignment,characterData.categories).join('')}`,false)
            .addField('Information',`> **Role ➜ **\`${characterData.role}\`\n> **Activate Shards ➜ **\`${characterData.activate_shard_count}\`${client.emojis.cache.get('874939449946021920')}\n> **Max. Power ➜ **\`${Intl.NumberFormat("es-ES").format(characterData.power)}\``,false)
            .setColor('#FD3D26')
        /*characterData.gear_levels.map(async g => {
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