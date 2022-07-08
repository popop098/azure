const {Client, Intents} = require('discord.js');
const allIntents = new Intents(32767);
const client = new Client({intents: allIntents});
const dokdo = require('dokdo')

const DokdoHandler = new dokdo(client, { prefix: '!', noPerm: (message) => message.reply('🚫 You have no permission to use dokdo.'),owners:['281566165699002379'] })

async function cachingData(client){
    console.log('fetch guilds members started!')
    client.guilds.cache.map(async (guild) => {
        await client.guilds.cache.get(guild.id).members.fetch()
        console.log(`Successed Fetched (${guild.name}) ${client.guilds.cache.get(guild.id).memberCount} members`)
    })
    console.log('fetch guilds members finished!')
}

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await cachingData(client)
    client.user.setActivity('!help', {type: 'PLAYING'});
});

client.on('message', async message => {
    await DokdoHandler.run(message)
})

module.exports.discord = client
