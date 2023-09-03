module.exports = {
    name: 'prune',
    description: 'Delete last 1-99 messages (must be <2 weeks old)',
    expectsArgs: true,
    usage: '<# to prune>',
    execute(message, args) {
        const count = parseInt(args[0]);

        if(isNaN(count))
            return message.reply('Please enter a valid number');
        else if(count < 1 || count > 99)
            return message.reply('You can only delete 1-99 messages');
        
        // Can only delete messages < 2 weeks old
        message.channel.bulkDelete(count + 1, true).catch(err => {
            console.error(err);
            message.channel.send('There was a problem pruning messages');
        });
    }
}