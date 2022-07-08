import DiscordOauth2 from "discord-oauth2";

export const getUser = (token)=>{
    const oauth = new DiscordOauth2()
    return oauth.getUser(token).then((data)=>{return data})
}