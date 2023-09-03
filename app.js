const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = process.env;

const client = new Discord.Client();
setCommands();

client.once('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    // Not command
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    console.log(message.author.id);
    const args = message.content.slice(prefix.length+1).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Command does not exist
    if(!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    if(command.expectsArgs && !args.length)
        return message.channel.send(`${message.author}! ${command.needsArg}\n\nTry: ${prefix}${command.name} ${command.usage}`);

    try{
        command.execute(message, args);
    }catch(err){
        console.error(err);
        message.reply(`I couldn't run your command!`);
    }

    

});

client.login(process.env.APP_TOKEN);


// ----
function setCommands() {
    client.commands = new Discord.Collection();
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    commandFiles.forEach(file => {
        const command = require(`./commands/${file}`);

        client.commands.set(command.name, command);
    });
}