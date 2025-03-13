const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const express = require('express');  // Import express

config(); // Load .env file

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
const PREFIX = "+";

// Load commands
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

// Command handler for bot
client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('❌ An error occurred while executing that command!');
    }
});

// Bot login
client.login(process.env.TOKEN);

// -----------------------------------
// Express HTTP server to keep bot alive
// -----------------------------------

const app = express();

// Simple route to keep bot alive
app.get('/', (req, res) => {
    res.send('Bot is running');
});

// Start HTTP server on a specific port (Railway will set the port automatically in production)
const PORT = process.env.PORT || 3000;  // Use the port provided by Railway or default to 3000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
