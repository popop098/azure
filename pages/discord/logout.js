import jwt from 'jsonwebtoken'
import { DISCORD_END_POINTS } from '../../utils/Constants';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
//import { client } from '../../bot';
export default function Callback({token}){
    const router = useRouter()
    useEffect(()=>{
        localStorage.removeItem('token',token)
        router.push('/')
    },[])
    const ManualRedirect = () => {
        localStorage.removeItem('token',token)
        router.push('/')
    }
    return (
        <h3>리다이렉트 중입니다.. 자동으로 이동되지않는다면 <p onClick={()=>ManualRedirect()}>직접이동하기</p></h3>
    )
}

export async function getServerSideProps({req,res}){
    res.clearCookie('token')
    return {
        props : {
            data : 'null'
        }
    }
}