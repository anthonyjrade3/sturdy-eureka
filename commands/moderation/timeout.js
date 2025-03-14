module.exports = {
    name: 'timeout',
    description: 'Timeouts a user for a specified duration (10s, 1m, 2h, etc.)',
    async execute(message, args) {
        // Check if the user has permission to timeout members
        if (!message.member.permissions.has('timeout_MEMBERS')) {
            return message.reply('❌ You don’t have permission to timeout members!');
        }

        // Check if a user was mentioned or if username is provided
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply('❌ Please mention a valid user or provide a username!');

        // Check if a valid duration was provided
        const duration = args[1];
        if (!duration) return message.reply('❌ You must specify a duration! For example: 10s, 1m, 2h, etc.');

        // Regular expression to match time formats (10s, 1m, 2h, 1d)
        const timeRegex = /^(\d+)(s|m|h|d)$/;
        const match = duration.match(timeRegex);

        if (!match) return message.reply('❌ Invalid duration format! Use something like: 10s, 1m, 2h, etc.');

        // Parse the duration and convert to milliseconds
        const amount = parseInt(match[1], 10);
        const unit = match[2];

        let timeoutDuration;

        switch (unit) {
            case 's': // Seconds
                timeoutDuration = amount * 1000;
                break;
            case 'm': // Minutes
                timeoutDuration = amount * 60 * 1000;
                break;
            case 'h': // Hours
                timeoutDuration = amount * 60 * 60 * 1000;
                break;
            case 'd': // Days
                timeoutDuration = amount * 24 * 60 * 60 * 1000;
                break;
            default:
                return message.reply('❌ Invalid time unit! Use s, m, h, or d.');
        }

        // Check if the timeout duration is within the allowed range (10 seconds to 2 weeks)
        if (timeoutDuration < 10000) {
            timeoutDuration = 10000; // Set minimum to 10 seconds
        } else if (timeoutDuration > 1209600000) {
            timeoutDuration = 1209600000; // Set maximum to 2 weeks
        }

        // timeout the user
        try {
            await member.timeout(timeoutDuration, `timeoutd for ${timeoutDuration / 1000} seconds by bot`);
            message.reply(`✅ timeoutd ${member.user.tag} for ${timeoutDuration / 1000} seconds.`);
        } catch (error) {
            console.error(error);
            message.reply('❌ An error occurred while trying to timeout the user!');
        }
    }
};
