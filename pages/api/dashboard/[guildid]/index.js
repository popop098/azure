import {DISCORD_END_POINTS} from "../../../../utils/Constants";

export default async function handler(req, res) {
    const resp = await fetch(DISCORD_END_POINTS.GUILD.replace('{guildid}',req.query.guildid), {
        headers: {
            Authorization: `Bot ${process.env.BOT_TOKEN}`,
        }
    })
    if(!resp.ok){
        return res.status(500).json({error:true,message:resp.statusText})
    }
    const guild = await resp.json()
    if(guild.icon === null){
        guild.icon = '/api/img?url=https://cdn.discordapp.com/embed/avatars/0.png?size=64'
    } else {
        guild.icon = `/api/img?url=https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=64`
    }
    return res.status(200).json({error:false,data:guild})
}
