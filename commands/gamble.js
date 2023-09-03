const { roundDecimal } = require('../util');

module.exports = {
    name: 'gamble',
    description: 'Gamble your money away!\nThe fun way...',
    expectsArgs: true,
    usage: `<amount to gamble> <% to lose (0-1)> <% to win (1 - inf)>`,
    execute(message, args) {
        const totalMoney = 100;
        const moneyToGamble = args[0];
        
        if(moneyToGamble > totalMoney) return message.reply(`You ain't got that kinda m0ny`);
        
        const lossPercent = args[1];
        const winPercent = args[2];


        // !gamble 100 0.99 1.01
        // !gamble 100 0.01 99

        // min = 99
        // max = 101

        // (0.99) * min = 0.01 * min
        // 1 - (1 / 1.01) * max = 1 - 0.9901 * max
        

        // (0.01) * min = 0.99 * min
        // 1 - (1 / 99) * max = 1 - 0.0101 * max

        const lossMultiplier = args[1];
        const winMultiplier = (1 / args[2]);

        console.log(lossMultiplier)
        console.log(winMultiplier)

        const min = 0;
        const mid = min + lossMultiplier * 1000;
        const max = mid + winMultiplier * 1000;

        
        console.log(min)
        console.log(mid)
        console.log(max)

        let win = 0;
        let loss = 0;
        for(let i = 0; i < 100000; i++){
        
        const rand = (Math.random() * max)
        let resultAmount;

        if(rand >= mid){
            // console.log('You won!')

            // Win a ratio
            // Remove 'loss' portion
            const winRatio = (rand - mid) / (max - mid);
            resultAmount = winRatio * (winMultiplier * moneyToGamble);
            win++;
        }else{
            // console.log('You lost...');

            // Lose a ratio
            // Only include 'loss' portion
            const lossRatio = (rand - min) / (mid - min);
            resultAmount = lossRatio * (lossMultiplier * moneyToGamble);

loss++;
        }

        // console.log(resultantAmount)
    }

    console.log(win / 100000)
    console.log(loss / 100000);
    }
}