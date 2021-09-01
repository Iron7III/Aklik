const { default: axios } = require("axios");
const { registerFont } = require("canvas");
const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient,FortniteAPIIoClient, {assets}, checkSnowflakeId, swgoh) => {
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
    async function fetchPlayer(PLAYER_ALLY_CODE){
        let PLAYER_PAYLOAD = {
            allycode: trimAllyCode(PLAYER_ALLY_CODE)
        };
        let {result,error,warning} = await swgoh.fetchPlayer(PLAYER_PAYLOAD);
        PLAYER = Array.isArray(result)?result[0]:result;
        return PLAYER;
    }
    async function fetchGuild(GUILD_MEMBER_ALLY_CODE){
        let GUILD_PAYLOAD = {
            allycode: trimAllyCode(GUILD_MEMBER_ALLY_CODE)
        };
        let {result,error,warning} = await swgoh.fetchGuild(GUILD_PAYLOAD);
        GUILD = Array.isArray(result)?result[0]:result;
        return GUILD;
    }
    async function fetchRoster(PLAYER_ALLY_CODE){
        let ROSTER_PAYLOAD = {
            allycode: trimAllyCode(PLAYER_ALLY_CODE)
        };
        let {result,error,warning} = await swgoh.fetchUnits(ROSTER_PAYLOAD);
        ROSTER = Array.isArray(result)?result[0]:result;
        return ROSTER;
    }
    async function fetchData(COLLECTION){
        VALID_COLLECTIONS = ["abilityList","battleEnvironmentsList","battleTargetingRuleList","categoryList","challengeList","challengeStyleList","effectList","environmentCollectionList","equipmentList","eventSamplingList","guildExchangeItemList","guildRaidList","helpEntryList","materialList","playerTitleList","powerUpBundleList","raidConfigList","recipeList","requirementList","skillList","starterGuildList","statModList","statModSetList","statProgressionList","tableList","targetingSetList","territoryBattleDefinitionList","territoryWarDefinitionList","unitsList","unlockAnnouncementDefinitionList","warDefinitionList","xpTableList"]
        if(VALID_COLLECTIONS.some(c => c==COLLECTION)){
            let DATA_PAYLOAD = {
                collection: COLLECTION
            };
            let {result,error,warning} = await swgoh.fetchData(DATA_PAYLOAD);
            DATA = Array.isArray(result)?result[0]:result;
            return DATA;
        } else {
            return undefined;
        }
    }
    const INVALID_ALLY_CODE = new Discord.MessageEmbed()
        .setAuthor('Invalid ally code.')
        .setColor('#FF2222')
    const INVALID_GUILD_ID = new Discord.MessageEmbed()
        .setAuthor('Invalid guild Id.')
        .setColor('#FF2222')
    switch (args[0]){
        case 'player':
            var playerData = await axios.get(`https://swgoh.gg/api/player/${trimAllyCode(args[1])}/`).catch(() => {return});
            PLAYER = fetchPlayer(trimAllyCode(args[1]));
            console.log(PLAYER)
            if(playerData===undefined){return message.channel.send({embeds: [INVALID_ALLY_CODE]})};
            var characterListData = await axios.get(`https://swgoh.gg/api/characters/`)
            var arenaLeader = await characterListData.data.find(unit => unit.base_id===playerData.data.data.arena_leader_base_id);
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
                `> **Name ➜ **\`${PLAYER.name}\``,
                `> **Ally Code ➜ **\`${FormatAllyCode(PLAYER.allyCode)}\``,
                `> **Level ➜ **\`${PLAYER.level}\``,
                `> **Guild Name ➜ **\`${PLAYER.guildName}\``,
            ]
            var StatsData = [
                `> **Galactic Power ➜ **\`${new Intl.NumberFormat("es-ES").format(playerData.data.data.galactic_power)}\``,
                `> **Galactic Power (Characters) ➜ **\`${new Intl.NumberFormat("es-ES").format(playerData.data.data.character_galactic_power)}\``,
                `> **Galactic Power (Ships) ➜ **\`${new Intl.NumberFormat("es-ES").format(playerData.data.data.ship_galactic_power)}\``,
                `> **Galactic Power (Ships) ➜ **\`${new Intl.NumberFormat("es-ES").format(playerData.data.data.ship_galactic_power)}\``
            ]
            var ArenaData = [
                `> **Arena Rank ➜ **\`${new Intl.NumberFormat("es-ES").format(PLAYER.arena.char.rank)}\``,
                `> **Fleet Arena Rank ➜ **\`${new Intl.NumberFormat("es-ES").format(PLAYER.arena.ship.rank)}\``,
                `> **Fleet Arena Battles Won ➜ **\`${new Intl.NumberFormat("es-ES").format(playerData.data.data.ship_battles_won)}\``,
                `> **Squad Arena Battles Won ➜ **\`${new Intl.NumberFormat("es-ES").format(playerData.data.data.pvp_battles_won)}\``
            ]
            var GuildData = [
                `> **Guild Name ➜ **\`${playerData.data.data.guild_name}\``,
                ``
            ]
            var PlayerEmbed = new Discord.MessageEmbed()
                .setAuthor(`${playerData.data.data.name}`,arenaLeader.image)
                .setDescription(`> **${PLAYER.titles.selected}**`)
                .addField('Player', PlayerData.join('\n'))
                .addField('Stats', StatsData.join('\n'))
                .addField('Arena', ArenaData.join('\n'))
                //.addField('Guild Stats')
                .setColor('#FD3D26')
            message.channel.send({embeds:[PlayerEmbed]})
            break;
        case 'gl':
            var glData = await axios.get(`https://swgoh.gg/api/gl-checklist/`);
            if(!args[1]){
                let GLList = new Discord.MessageEmbed()
                    .setAuthor('Galactic Legends List')
                    .setDescription(glData.data.units.map(n => `> **${n.unitName}**`).join('\n'))
                    .setColor('#FD3D26')
                message.channel.send({embeds:[GLList]})
            } else {
                var gl = glData.data.units.find(n => n.unitName.toLowerCase()===args.slice(1).join(' ').toLowerCase())
                console.log(gl)
                var GLData = new Discord.MessageEmbed()
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
                var playerData = await axios.get(`https://swgoh.gg/api/player/${trimAllyCode(allyCode)}/`).catch(() => {return});
                if(playerData===undefined){return message.channel.send({embeds: [INVALID_ALLY_CODE]})};
                var galacticLegendsList = await axios.get(`https://swgoh.gg/api/gl-checklist/`);
                var charactersList = await axios.get(`https://swgoh.gg/api/characters/`);
                var galacticLegend = galacticLegendsList.data.units.find(n => n.unitName.toLowerCase()===character.toLowerCase())
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
                    var playerUnit = await playerData.data.units.find(unit => unit.data.base_id===galacticLegendUnit.baseId);
                    var gameUnit = charactersList.data.find(character => character.base_id===galacticLegendUnit.baseId);
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
            var check = await checkRequirements(args[1],args.slice(2).join(' '))
            console.log(check.galacticLegend.requiredUnits)
            var embed = new Discord.MessageEmbed()
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
            var embedData = new Discord.MessageEmbed()
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
                switch (args[1]){
                    case 'geonosis':
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
                        break;
                    default:
                        return
                }
            }
            break;
        case 'guild':
            async function getGuildUnits(GUILD_DATA){
                var REYg13, SLKRg13, JMLg13, SEEg13, JMKg13, DRg13, JKLg13;
                REYg13 = SLKRg13 = JMLg13 = SEEg13 = JMKg13 = DRg13 = JKLg13 = 0;
                var REYg12, SLKRg12, JMLg12, SEEg12, JMKg12, DRg12, JKLg12;
                REYg12 = SLKRg12 = JMLg12 = SEEg12 = JMKg12 = DRg12 = JKLg12 = 0;
                var REY = [], SLKR = [], JML = [], SEE = [], JMK = [], DR = [], JKL= []
                for(var i=0;i<GUILD_DATA.members-1;i++){
                    var ROSTER = await fetchRoster(trimAllyCode(GUILD_DATA.roster[i].allyCode))
                    if(ROSTER['GLREY']!==undefined){
                        REY.push(ROSTER['GLREY'][0])
                    }
                    if(ROSTER['SUPREMELEADERKYLOREN']!==undefined){
                        SLKR.push(ROSTER['SUPREMELEADERKYLOREN'][0])
                    }
                    if(ROSTER['GRANDMASTERLUKE']!==undefined){
                        JML.push(ROSTER['GRANDMASTERLUKE'][0])
                    }
                    if(ROSTER['SITHPALPATINE']!==undefined){
                        SEE.push(ROSTER['SITHPALPATINE'][0])
                    }
                    if(ROSTER['JEDIMASTERKENOBI']!==undefined){
                        JMK.push(ROSTER['JEDIMASTERKENOBI'][0])
                    }
                    if(ROSTER['DARTHREVAN']!==undefined){
                        DR.push(ROSTER['DARTHREVAN'][0])
                    }
                    if(ROSTER['JEDIKNIGHTLUKE']!==undefined){
                        JKL.push(ROSTER['JEDIKNIGHTLUKE'][0])
                    }
                }
                REY.map(UNIT => {
                    if(UNIT.gearLevel===13){
                        REYg13++
                    } else if(UNIT.gearLevel===12){
                        REYg12++
                    }
                })
                SLKR.map(UNIT => {
                    if(UNIT.gearLevel===13){
                        SLKRg13++
                    } else if(UNIT.gearLevel===12){
                        SLKRg12++
                    }
                })
                JML.map(UNIT => {
                    if(UNIT.gearLevel===13){
                        JMLg13++
                    } else if(UNIT.gearLevel===12){
                        JMLg12++
                    }
                })
                SEE.map(UNIT => {
                    if(UNIT.gearLevel===13){
                        SEEg13++
                    } else if(UNIT.gearLevel===12){
                        SEEg12++
                    }
                })
                JMK.map(UNIT => {
                    if(UNIT.gearLevel===13){
                        JMKg13++
                    } else if(UNIT.gearLevel===12){
                        JMKg12++
                    }
                })
                DR.map(UNIT => {
                    if(UNIT.gearLevel===13){
                        DRg13++
                    } else if(UNIT.gearLevel===12){
                        DRg12++
                    }
                })
                JKL.map(UNIT => {
                    if(UNIT.gearLevel===13){
                        JKLg13++
                    } else if(UNIT.gearLevel===12){
                        JKLg12++
                    }
                })
                var data = {
                    rey: { count: REY.length, g13: REYg13, g12: REYg12},
                    slkr: { count: SLKR.length, g13: SLKRg13, g12: SLKRg12},
                    jml: { count: JML.length, g13: JMLg13, g12: JMLg12},
                    see: { count: SEE.length, g13: SEEg13, g12: SEEg12},
                    jmk: { count: JMK.length, g13: JMKg13, g12: JMKg12},
                    dr: { count: DR.length, g13: DRg13, g12: DRg12},
                    jkl: { count: JKL.length, g13: JKLg13, g12: JKLg12}
                }
                return data;
            }
            var embed = new Discord.MessageEmbed()
                .setTitle(`Getting guild data...`)
                .setColor('#FD3D26')
            message.channel.send({embeds: [embed]}).then(async msg => {
                let GUILD = await fetchGuild(trimAllyCode(args[1]));
                var guildStats = [
                    `> **Id ➜ **\`${GUILD.id}\``,
                    `> **Member Count ➜ **\`${GUILD.members}/50\``,
                    `> **Galactic Power ➜ **\`${new Intl.NumberFormat("es-ES").format(GUILD.gp)}\``,
                    `> **Avg Galactic Power ➜ **\`${new Intl.NumberFormat("es-ES").format(Math.trunc(GUILD.gp/GUILD.members))}\``
                ]
                embed
                .setTitle(`${GUILD.name}`)
                .setFields([
                    {
                        name: 'Statistics',
                        value: guildStats.join('\n')
                    },
                    {
                        name: 'Galactic Legends Count',
                        value: '> **Getting data, please wait...**',
                    }
                ])
                .setDescription(`> **${GUILD.desc}**`)
                msg.edit({embeds: [embed]}).then(async msg2 => {
                    var data = await getGuildUnits(GUILD);
                    var galacticLegendsCountStats = [
                        `> **Rey ➜ **\`${data.rey.count}/${GUILD.members}\`${data.rey.count===0?'':` **•** \`${data.rey.g13}\`${client.emojis.cache.get('881494918256791663')} **•** \`${data.rey.g12}\`${client.emojis.cache.get('881494918273597490')}`}`,
                        `> **SLKR ➜ **\`${data.slkr.count}/${GUILD.members}\`${data.slkr.count===0?'':` **•** \`${data.slkr.g13}\`${client.emojis.cache.get('881494918252605530')} **•** \`${data.slkr.g12}\`${client.emojis.cache.get('881494918273597490')}`}`,
                        `> **JML ➜ **\`${data.jml.count}/${GUILD.members}\`${data.jml.count===0?'':` **•** \`${data.jml.g13}\`${client.emojis.cache.get('881494918256791663')} **•** \`${data.jml.g12}\`${client.emojis.cache.get('881494918273597490')}`}`,
                        `> **SEE ➜ **\`${data.see.count}/${GUILD.members}\`${data.see.count===0?'':` **•** \`${data.see.g13}\`${client.emojis.cache.get('881494918252605530')} **•** \`${data.see.g12}\`${client.emojis.cache.get('881494918273597490')}`}`,
                        `> **JMK ➜ **\`${data.jmk.count}/${GUILD.members}\`${data.jmk.count===0?'':` **•** \`${data.jmk.g13}\`${client.emojis.cache.get('881494918256791663')} **•** \`${data.jmk.g12}\`${client.emojis.cache.get('881494918273597490')}`}`,
                        `> **DR ➜ **\`${data.dr.count}/${GUILD.members}\`${data.dr.count===0?'':` **•** \`${data.dr.g13}\`${client.emojis.cache.get('881494918252605530')} **•** \`${data.dr.g12}\`${client.emojis.cache.get('881494918273597490')}`}`,
                        `> **JKL ➜ **\`${data.jkl.count}/${GUILD.members}\`${data.jkl.count===0?'':` **•** \`${data.jkl.g13}\`${client.emojis.cache.get('881494918256791663')} **•** \`${data.jkl.g12}\`${client.emojis.cache.get('881494918273597490')}`}`
                    ]
                    embed.setFields([
                        msg2.embeds[0].fields[0],
                        {
                            name: 'Galactic Legends Count',
                            value: galacticLegendsCountStats.join('\n'),
                        }
                    ])
                    msg2.edit({embeds: [embed]})
                })
            })
            
            break;
        case 'number':
            async function CollatzConjecture(x){
                var y=Number(x),a=[y];
                while(y!==1){
                    if(y%2===0){y=y/2}else{y=3*y+1}
                    a.push(y)
                }
                return a;
            }
            console.log(await CollatzConjecture(args[1]))
            break;
        default:
            const NoSubCommand = new Discord.MessageEmbed()
                .setTitle(`These is the valid subcommand list and use.`)
                .addField('Player',`> **\`f-player\`** \`ALLY_CODE\``)
                .addField('Character',`> **\`f-character\`** \`CHARACTER_NAME\``)
                .addField('Galactic Legend',`> **\`f-gl\`** \`GL_NAME\``)
                .addField('Guild',`> **\`f-guild\`** \`GUILD_ID\``)
                .addField('Check',`> **\`f-check\`** \`ALLY_CODE\` \`GL_NAME\``)
                .setColor('#FD3D26')
            message.channel.send({embeds: [NoSubCommand]})
            break;
    }
}