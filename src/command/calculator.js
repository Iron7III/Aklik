const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    ws: {
        properties: {
            $browser: "Discord Android"
        },
    },
    intents: Discord.Intents.NON_PRIVILEGED
});

exports.run = async (client, message, args, Fortnite) => {
    const embed = new Discord.MessageEmbed()
        .setTitle('**ESTO ES UNA VERSION BETA Y NO FUNCIONA CORRECTAMENTE**')
        .setColor('RANDOM')
    client.api.channels(message.channel.id).messages.post({
        type: 1,
        data: {
            content: ' ',
            embed: embed,
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            custom_id: 'ac',
                            label: 'AC',
                            style: 4
                        },
                        {
                            type: 2,
                            custom_id: '(',
                            label: '(',
                            style: 1
                        },
                        {
                            type: 2,
                            custom_id: ')',
                            label: ')',
                            style: 1
                        },
                        {
                            type: 2,
                            custom_id: '^',
                            label: '^',
                            style: 1
                        },
                        {
                            type: 2,
                            custom_id: 'delete',
                            label: 'Del',
                            style: 4
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            custom_id: '7',
                            label: '7',
                            style: 2
                        },
                        {
                            type: 2,
                            custom_id: '8',
                            label: '8',
                            style: 2
                        },
                        {
                            type: 2,
                            custom_id: '9',
                            label: '9',
                            style: 2
                        },
                        {
                            type: 2,
                            custom_id: '/',
                            label: '/',
                            style: 1
                        },
                        {
                            type: 2,
                            custom_id: ' ',
                            label: ' ',
                            style: 2,
                            disabled: true
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            custom_id: '4',
                            label: '4',
                            style: 2
                        },
                        {
                            type: 2,
                            custom_id: '5',
                            label: '5',
                            style: 2
                        },
                        {
                            type: 2,
                            custom_id: '6',
                            label: '6',
                            style: 2
                        },
                        {
                            type: 2,
                            custom_id: 'x',
                            label: 'X',
                            style: 1
                        },
                        {
                            type: 2,
                            custom_id: ' ',
                            label: ' ',
                            style: 2,
                            disabled: true
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            custom_id: '1',
                            label: '1',
                            style: 2
                        },
                        {
                            type: 2,
                            custom_id: '2',
                            label: '2',
                            style: 2
                        },
                        {
                            type: 2,
                            custom_id: '3',
                            label: '3',
                            style: 2
                        },
                        {
                            type: 2,
                            custom_id: '-',
                            label: '-',
                            style: 1
                        },
                        {
                            type: 2,
                            custom_id: ' ',
                            label: ' ',
                            style: 2,
                            disabled: true
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            custom_id: '.',
                            label: '.',
                            style: 1
                        },
                        {
                            type: 2,
                            custom_id: '0',
                            label: '0',
                            style: 2
                        },
                        {
                            type: 2,
                            custom_id: '=',
                            label: '=',
                            style: 3
                        },
                        {
                            type: 2,
                            custom_id: '+',
                            label: '+',
                            style: 1
                        },
                        {
                            type: 2,
                            custom_id: ' ',
                            label: ' ',
                            style: 2,
                            disabled: true
                        }
                    ]
                }
            ]
        }
    })
}