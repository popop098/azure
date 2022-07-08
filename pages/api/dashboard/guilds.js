import {DISCORD_END_POINTS, OAUTH} from "../../../utils/Constants";
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    const botresp = await fetch(DISCORD_END_POINTS.USER_GUILDS, {
        headers: {
            Authorization: `Bot ${process.env.BOT_TOKEN}`,
        }
    })
    if(!botresp.ok){
        return res.status(500).json({error:true,message:botresp.statusText})
    }
    const bot_guilds = await botresp.json()
    const token = req.cookies.token
    if(!token){
        // return res.redirect(OAUTH.discord())
        return res.status(401).json({error:true,message:'로그인이 필요합니다.'})
    }
    const decode_jwt = jwt.decode(token, process.env.JWT_SECRET)
    const userresp = await fetch(DISCORD_END_POINTS.USER_GUILDS, {
        headers: {
            Authorization: `Bearer ${decode_jwt.access_token}`,
        }
    })
    if(!userresp.ok){
        return res.status(500).json({error:true,message:userresp.statusText})
    }
    const user_guilds = await userresp.json()
    for (let i = 0; i < user_guilds.length; i++) {
        if (user_guilds[i].permissions !== '4398046511103') {
            if (user_guilds[i].owner !== true) {
                user_guilds.splice(i, 1)
                i--
            }
        }
    }
    for (let i = 0; i < user_guilds.length; i++) {
        bot_guilds.find(function(element){
            if(element.id == user_guilds[i].id){
                user_guilds[i].joined = true
            } else {
                user_guilds[i].joined = false
            }
        })
        if (user_guilds[i].icon == null) {
            user_guilds[i].icon = '/api/img?url=https://cdn.discordapp.com/embed/avatars/0.png?size=64'
        } else {
            user_guilds[i].icon = `/api/img?url=https://cdn.discordapp.com/icons/${user_guilds[i].id}/${user_guilds[i].icon}.png?size=64`
        }
    }
    user_guilds.sort(function(a,b){
        return b.joined-a.joined
    })
    return res.status(200).json({error:false,data:user_guilds})

}
