import {discord} from '../../bot'
export default async function handler(req, res) {
    const {method} = req
    const {now} = req.query
    if(method!=='GET'){
        return res.status(405).json({error:true,message:`${method} Method Not Allowed`})
    }
    return res.status(200).json({error:false,data: {server:`${Date.now() - now}ms`}})

}
