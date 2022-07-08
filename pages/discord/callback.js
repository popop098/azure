import jwt from 'jsonwebtoken'
import { DISCORD_END_POINTS } from '../../utils/Constants';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function Callback({token}){
    const router = useRouter()
    useEffect(()=>{
        localStorage.setItem('token',token)
        router.push('/dashboard')
    },[])
    const ManualRedirect = () => {
        localStorage.setItem('token',token)
        router.push('/dashboard')
    }
    return (
        <h3>리다이렉트 중입니다.. 자동으로 이동되지않는다면 <p onClick={()=>ManualRedirect()}>직접이동하기</p></h3>
    )
}

export async function getServerSideProps({req,res}){
    const code = req.query.code;
    const params = new URLSearchParams({
        client_id: process.env.BOT_ID,
        code,
        client_secret: process.env.BOT_SECRET,
        redirect_uri: `${process.env.BASE_URL}/discord/callback`,
        grant_type: 'authorization_code',
        scope: 'identify email guilds guilds.join'
    })
    const token = (await (await fetch(DISCORD_END_POINTS.TOKEN, {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })).json());
    const userinfo = (await (await fetch(DISCORD_END_POINTS.USER_ME, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token['access_token']}`
        }
    })).json())

    if(userinfo.message==='401: Unauthorized'){
        res.writeHead(302, {
            Location: '/'
        })
        return res.end()
    }

    const GetAvatar = (userdata) => {
        if(userdata.avatar){
            const useravatar_format = userdata.avatar.startsWith("a_") ? "gif" : "webp"
            return `https://cdn.discordapp.com/avatars/${userdata.id}/${userdata.avatar}.${useravatar_format}`
        } else {
            const Img = {
                '0' : '0.png',
                '1' : '1.png',
                '2' : '2.png',
                '3' : '3.png',
                '4' : '4.png',
                '5' : '0.png',
                '6' : '1.png',
                '7' : '2.png',
                '8' : '3.png',
                '9' : '4.png',
            }
            return `https://cdn.discordapp.com/embed/avatars/${Img[userdata.discriminator.slice(-1)]}`
        }
    }
    userinfo.access_token = token['access_token']
    userinfo.refresh_token = token['refresh_token']
    userinfo.avatar = GetAvatar(userinfo)
    const JWT_TOKEN = jwt.sign(userinfo,process.env.JWT_SECRET,{ algorithm: 'HS256', expiresIn: '1y' })
    res.cookie('token',JWT_TOKEN)
    return {
        props : {
            token : JWT_TOKEN
        }
    }
}
