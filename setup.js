const fs = require('fs');
const path = require('path');

const botFiles = {
    '.env': 'TOKEN=YOUR_BOT_TOKEN_HERE',
    'package.json': JSON.stringify({
        name: "all-in-one-discord-bot",
        version: "1.0.0",
        description: "A powerful Discord bot with multiple features.",
        main: "index.js",
        dependencies: {
            "discord.js": "^14.9.0",
            "dotenv": "^16.3.1",
            "axios": "^1.4.0"
        }
    }, null, 2),
    'index.js': `const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');

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
    const commandFiles = fs.readdirSync(\`./commands/\${folder}\`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(\`./commands/\${folder}/\${file}\`);
        client.commands.set(command.name, command);
    }
}

client.on('ready', () => console.log(\`✅ Logged in as \${client.user.tag}\`));

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/\\s+/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) return;
    try { await command.execute(message, args); } 
    catch (error) { console.error(error); message.reply('❌ An error occurred!'); }
});

client.login(process.env.TOKEN);`
};

// Command Templates
const commands = {
    'moderation/kick.js': `module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server',
    execute(message, args) {
        if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply('❌ You don’t have permission!');
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a user to kick!');
        member.kick();
        message.reply(\`✅ Kicked \${member.user.tag}\`);
    }
};`,
    'moderation/ban.js': `module.exports = {
    name: 'ban',
    description: 'Bans a user from the server',
    execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply('❌ You don’t have permission!');
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a user to ban!');
        member.ban();
        message.reply(\`✅ Banned \${member.user.tag}\`);
    }
};`,
    'fun/joke.js': `const axios = require('axios');
module.exports = {
    name: 'joke',
    description: 'Get a random joke',
    async execute(message) {
        try {
            const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            message.reply(\`\${response.data.setup} - \${response.data.punchline}\`);
        } catch (error) {
            message.reply('⚠️ Failed to fetch a joke.');
        }
    }
};`,
    'fun/8ball.js': `module.exports = {
    name: '8ball',
    description: 'Ask the magic 8-ball a question',
    execute(message, args) {
        if (!args.length) return message.reply('🎱 Ask a question!');
        const replies = ['Yes', 'No', 'Maybe', 'Definitely', 'Ask again later'];
        const response = replies[Math.floor(Math.random() * replies.length)];
        message.reply(\`🎱 \${response}\`);
    }
};`,
    'utilities/weather.js': `const axios = require('axios');
module.exports = {
    name: 'weather',
    description: 'Get the weather for a location',
    async execute(message, args) {
        if (!args.length) return message.reply('🌤️ Provide a city name!');
        try {
            const response = await axios.get(\`https://wttr.in/\${args.join(' ')}?format=%C+%t\`);
            message.reply(\`🌤️ Weather in \${args.join(' ')}: \${response.data}\`);
        } catch (error) {
            message.reply('⚠️ Failed to get weather.');
        }
    }
};`,
    'utilities/avatar.js': `module.exports = {
    name: 'avatar',
    description: 'Get a user’s avatar',
    execute(message) {
        const user = message.mentions.users.first() || message.author;
        message.reply(user.displayAvatarURL({ dynamic: true, size: 512 }));
    }
};`,
    'info/userinfo.js': `module.exports = {
    name: 'userinfo',
    description: 'Displays information about a user',
    execute(message) {
        const user = message.mentions.users.first() || message.author;
        message.reply(\`👤 Username: \${user.tag}\\n🆔 ID: \${user.id}\\n📅 Created At: \${user.createdAt}\`);
    }
};`,
    'info/serverinfo.js': `module.exports = {
    name: 'serverinfo',
    description: 'Displays information about the server',
    execute(message) {
        message.reply(\`🌍 Server: \${message.guild.name}\\n👥 Members: \${message.guild.memberCount}\\n📅 Created: \${message.guild.createdAt}\`);
    }
};`,
    'info/help.js': `module.exports = {
    name: 'help',
    description: 'Displays a list of all commands',
    execute(message) {
        const commandsList = message.client.commands.map(command => \`\${command.name}: \${command.description}\`).join('\\n');
        message.reply(\`Here are all the available commands:\\n\\n\${commandsList}\`);
    }
};`
};

// Function to create files & folders
const createFiles = () => {
    for (const filePath in botFiles) {
        const fullPath = path.join(__dirname, filePath);
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, botFiles[filePath]);
    }

    for (const filePath in commands) {
        const fullPath = path.join(__dirname, 'commands', filePath);
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, commands[filePath]);
    }

    console.log('✅ Bot setup complete! Now run:');
    console.log('   npm install');
    console.log('   node index.js');
};

// Run the function
createFiles();
