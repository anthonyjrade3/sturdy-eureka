module.exports = {
    name: "ping",
    description: "Shows the bot's latency.",
    execute(message, args) {
        const ping = Math.round(message.client.ws.ping); // Get bot's latency
        message.reply(`🏓 Pong! Latency is **${ping}ms**.`);
    }
};
