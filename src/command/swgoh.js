const { default: axios } = require("axios");
const { registerFont } = require("canvas");
const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient,FortniteAPIIoClient, {assets}, checkSnowflakeId) => {
    function trimAllyCode(str){
        var rgx0 = /\d{9}/;
        var rgx1 = /\d{3}/;
        if(rgx0.test(str)===true){
            return str;
        } else if(rgx1.test(str)===true){
            var newStr = str.split(/[$-/:-?{-~!"^_`\[\]]/).join('');
            return newStr;
        } else {
            return null;
        }
    }
    switch (args[0]){
        case 'player':
            var player = trimAllyCode(args[1])
            const playerData = await axios.get(`https://swgoh.gg/api/player/${player}/`);
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
                `> **Name ➜ **\`${playerData.data.data.name}\``,
                `> **Ally Code ➜ **\`${FormatAllyCode(playerData.data.data.ally_code)}\``,
                `> **Level ➜ **\`${playerData.data.data.level}\``,
                `> **Guild Name ➜ **\`${playerData.data.data.guild_name}\``,
            ]
            var StatsData = [
                `> **Galactic Power ➜ **\`${new Intl.NumberFormat("es-ES").format(playerData.data.data.galactic_power)}\``,
                `> **Galactic Power (Characters) ➜ **\`${new Intl.NumberFormat("es-ES").format(playerData.data.data.character_galactic_power)}\``,
                `> **Galactic Power (Ships) ➜ **\`${new Intl.NumberFormat("es-ES").format(playerData.data.data.ship_galactic_power)}\``,
                `> **Galactic Power (Ships) ➜ **\`${new Intl.NumberFormat("es-ES").format(playerData.data.data.ship_galactic_power)}\``
            ]
            var ArenaData = [
                `> **Arena Rank ➜ **\`${new Intl.NumberFormat("es-ES").format(playerData.data.data.arena_rank)}\``,
                `> **Fleet Arena Battles Won ➜ **\`${new Intl.NumberFormat("es-ES").format(playerData.data.data.ship_battles_won)}\``,
                `> **Squad Arena Battles Won ➜ **\`${new Intl.NumberFormat("es-ES").format(playerData.data.data.pvp_battles_won)}\``
            ]
            const PlayerEmbed = new Discord.MessageEmbed()
                .setAuthor(`${playerData.data.data.name}`, `https://swgoh.gg/game-asset/u/${playerData.data.data.arena_leader_base_id}.png`)
                .addField('Player', PlayerData.join('\n'))
                .addField('Stats', StatsData.join('\n'))
                .addField('Arena', ArenaData.join('\n'))
                .setColor('#FD3D26')
            message.channel.send({embeds:[PlayerEmbed]})
            break;
        case 'gl':
            const glData = await axios.get(`https://swgoh.gg/api/gl-checklist/`);
            if(!args[1]){
                const GLList = new Discord.MessageEmbed()
                    .setAuthor('Galactic Legends List')
                    .setDescription(glData.data.units.map(n => `> **${n.unitName}**`).join('\n'))
                    .setColor('#FD3D26')
                message.channel.send({embeds:[GLList]})
            } else {
                var gl = glData.data.units.find(n => n.unitName.toLowerCase()===args.slice(1).join(' ').toLowerCase())
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
            break;
        case 'check':
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
            break;
        case 'character':
            const characterListData = await axios.get(`https://swgoh.gg/api/characters/`);
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
            const gearListData = await axios.get(`https://swgoh.gg/api/gear/`);
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
            break;
        case 'rules':
            if(message.guild.id==='724221331943456788'||message.guild.id==='514150100575191040'){
                if(args[1]==='geonosis'){
                    const strategy = [
                        [
                            `> **Above ➜ **${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}`,
                            `> **Bottom ➜ **\`Add 31M & complete ALL the platoons\``
                        ],
                        [
                            `> **Ships ➜ **${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}`,
                            `> **Middle ➜ **${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')} \`& complete the platoons\``,
                            `> **Bottom ➜ **${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}`
                        ],
                        [
                            `> **Ships ➜ **${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}`,
                            `> **Middle ➜ **\`NO get the Wat Tambor\` ${client.emojis.cache.get('879466444822282291')}`,
                            `> **Bottom ➜ **${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')} \`adding 88M & platoons\``
                        ],
                        [
                            `> **Ships ➜ **\`Minimum\` ${client.emojis.cache.get('879466444822282291')} \`& add\``,
                            `> **Middle ➜ **${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')} \`& Wat Tambor\``,
                            `> **Bottom ➜ **${client.emojis.cache.get('879466444822282291')}`
                        ],
                    ]
                    const rulesGeonosis_0 = new Discord.MessageEmbed()
                        .setTitle('Geonosis: Separatist Might')
                        .setDescription(`> \`\`\`fix\n> Next objective: try to get 18★\n> \`\`\``)
                        .setColor('#FD3D26')
                    const rulesGeonosis_1 = new Discord.MessageEmbed()
                        .setTitle('Phase 1/4')
                        .addField(`Above ${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}`,`> \`Get the stars & complete the platoons\` ${client.emojis.cache.get('879484314738389023')}`)
                        .addField(`Bottom`,`> \`Add 31M & try to complete the platoons\` ${client.emojis.cache.get('879485350161047582')}`)
                        .setFooter('Complete the platoons that gives bonificators for Wat Tambor & do the missions', 'https://game-assets.swgoh.gg/tex.charui_wattambor.png')
                        .setColor('#FD3D26')
                    const rulesGeonosis_2 = new Discord.MessageEmbed()
                        .setTitle('Phase 2/4')
                        .addField(`Ships ${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}`,`> \`Get the stars\``)
                        .addField(`Middle ${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}`,`> \`Get the stars & complete the platoons\` ${client.emojis.cache.get('879486249444974602')}`)
                        .addField(`Bottom ${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}`,`> \`Get the stars\``)
                        .setFooter('Complete the platoons that gives bonificators for Wat Tambor & do the missions', 'https://game-assets.swgoh.gg/tex.charui_wattambor.png')
                        .setColor('#FD3D26')
                    const rulesGeonosis_3 = new Discord.MessageEmbed()
                        .setTitle('Phase 3/4')
                        .addField(`Ships ${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}`,`> \`Get the stars\``)
                        .addField(`Middle`,`> \`NO get the Wat Tambor star\``)
                        .addField(`Bottom ${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}`,`> \`Get the stars adding 88M & platoons\` ${client.emojis.cache.get('879487214071996436')}`)
                        .setFooter('Complete the platoons that gives bonificators for Wat Tambor & do the missions', 'https://game-assets.swgoh.gg/tex.charui_wattambor.png')
                        .setColor('#FD3D26')
                    const rulesGeonosis_4 = new Discord.MessageEmbed()
                        .setTitle('Phase 4/4')
                        .addField(`Ships ${client.emojis.cache.get('879466444822282291')}`,`> \`Get minimum the star & add\``)
                        .addField(`Middle ${client.emojis.cache.get('879466444822282291')}${client.emojis.cache.get('879466444822282291')}`,`> \`Get the stars & Wat Tambor\``)
                        .addField(`Bottom ${client.emojis.cache.get('879466444822282291')}`,`> \`Get the star\``)
                        .setFooter('Deploy all the units avalaible & do all the missions until reach the mark', 'https://game-assets.swgoh.gg/tex.charui_geonosian_poggle.png')
                        .setColor('#FD3D26')
                    message.channel.send({embeds: [rulesGeonosis_0,rulesGeonosis_1,rulesGeonosis_2,rulesGeonosis_3,rulesGeonosis_4]});
                } else if(args[1]==='sith'){
                    const rulesSith = new Discord.MessageEmbed()
                }
            } else {
                return;
            }
            break;
        default:
            const NoSubCommand = new Discord.MessageEmbed()
                .setAuthor(`Write a valid subcommand.`,assets.error)
                .setColor('#ED4245')
            message.channel.send({embeds: [NoSubCommand]})
            break;
    }
}