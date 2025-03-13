module.exports = {
    name: 'meme',
    description: 'Get a random meme',
    execute(message, args) {
        // You can use an API to fetch memes, for now, just an example
        const memes = [
            'https://i.imgur.com/1EjXfjs.jpg',
            'https://i.imgur.com/2E5txex.jpg',
            'https://i.imgur.com/Kjz5kwr.jpg'
        ];
        
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        message.reply(randomMeme);
    }
};
