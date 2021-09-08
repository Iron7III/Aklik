const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
    async function CollatzConjecture(x){
        var y=Number(x),a=[y];
        while(y!==1){
            y=y%2===0?y/2:3*y+1
            a.push(y)
        }
        return a;
    }
    async function KaprekarRoutine(number){
        let total = number;
        let count = 0;
        let array = [Number(total)]
        function uniqueDigitCount(number) {
            let count = number.toString().split('').sort().filter(function(el, i, a) {
              if (i == a.indexOf(el)) {
                return 1;
              } else {
                return 0;
              }
            });
            return count.length;
        }
        if (uniqueDigitCount(total) > 1) {
          while (total !== 6174) {
            let ascending = parseInt(("0000" + total).substr(-4, 4).toString().split('').sort(acendingSort).join(''));
            let descending = parseInt(("0000" + total).substr(-4, 4).toString().split('').sort(decendingSort).join(''));
            total = descending - ascending;
            count++;
            array.push(total)
          }
        }
        return array;
    }
      function acendingSort(a, b) {
        return a - b;
      }
      function decendingSort(a, b) {
        return b - a;
      }



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