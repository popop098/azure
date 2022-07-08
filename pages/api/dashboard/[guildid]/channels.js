import {DISCORD_END_POINTS} from "../../../../utils/Constants";

export default async function handler(req, res) {
    const resp = await fetch(DISCORD_END_POINTS.GUILD_CHANNELS.replace('{guildid}',req.query.guildid), {
        headers: {
            Authorization: `Bot ${process.env.BOT_TOKEN}`,
        }
    })
    if(!resp.ok){
        return res.status(500).json({error:true,message:resp.statusText})
    }
    const guild = await resp.json()
    return res.status(200).json({error:false,data:guild})
}
