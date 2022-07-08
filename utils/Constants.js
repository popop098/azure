


export const API_BASE_URL = {
    discord : 'https://discord.com/api/v10'
}

export const DISCORD_END_POINTS = {
    USER_ME : API_BASE_URL.discord + '/users/@me',
    USER_GUILDS : API_BASE_URL.discord + '/users/@me/guilds',
    GUILD : API_BASE_URL.discord + '/guilds/{guildid}',
    GUILD_MEMBERS : API_BASE_URL.discord + '/guilds/{guildid}/members?limit=1000',
    GUILD_BANS : API_BASE_URL.discord + '/guilds/{guildid}/bans',
    GUILD_CHANNELS : API_BASE_URL.discord + '/guilds/{guildid}/channels',
    GUILD_ROLES : API_BASE_URL.discord + '/guilds/{guildid}/roles',
    TOKEN : API_BASE_URL.discord + '/oauth2/token',
}

export const OAUTH = {
    discord : (clientId, scope) => { return `https://discordapp.com/oauth2/authorize?client_id=${clientId||'989324139775000576'}&scope=${scope||'identify%20email%20guilds%20guilds.join'}&response_type=code&redirect_uri=${process.env.BASE_URL|| 'http://localhost:3000'}/discord/callback` }
}

