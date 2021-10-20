const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
    /**
    * @param {number} x
    */
    async function CollatzConjecture(x){
        var y=Number(x),a=[y];
        while(y!==1){
            y=y%2===0?y/2:3*y+1
            a.push(y)
        }
        return a;
    }
    /**
    * @param {number} n
    */
    async function KaprekarRoutine(n){
        let t = n,a = [Number(t)];
        while(t!==6174){
            let min = parseInt(("0000"+t).substr(-4,4).toString().split('').sort(function(a,b){return a-b}).join(''));
            let max = parseInt(("0000"+t).substr(-4,4).toString().split('').sort(function(a,b){return b-a}).join(''));
            t = max - min;
            a.push(t)
        }
        return a;
    }
    /**
    * @param {number} n
    */
    async function Fibonacci(n){
        for(var a = [0,1], i=0,j=1,k=0; k<n;i=j,j=x,k++ ){
            x=i+j;
            a.push(x);
        }
        return a;
    }
    /**
    * @param {number} n
    */
    async function HanoiTowers(n){
        return (2**n)-1;
    }
    console.log(await HanoiTowers(3))

    switch(args[0]){
        case 'collatz':
            var COLLATZ_CONJECTURE = await CollatzConjecture(args[1])
            console.log(COLLATZ_CONJECTURE)
            var embed = new Discord.MessageEmbed()
                .setTitle(`Collatz Conjecture of ${args[1]}`)
                .setDescription(`\`${COLLATZ_CONJECTURE.join('\`** - **\`')}\``)
                .setColor('#FD3D26')
            message.channel.send({embeds: [embed]})
            break;
        case 'kaprekar':
            var KAPREKAR_REOUTINE = await KaprekarRoutine(args[1])
            console.log(KAPREKAR_REOUTINE)
            var embed = new Discord.MessageEmbed()
                .setTitle(`Kaprekar's Routine of ${args[1]}`)
                .setDescription(`\`${KAPREKAR_REOUTINE.join('\`** - **\`')}\``)
                .setColor('#FD3D26')
            message.channel.send({embeds: [embed]})
            break;
    }
}