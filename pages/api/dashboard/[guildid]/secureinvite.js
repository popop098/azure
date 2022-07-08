import Secureinv from "../../../../models/Secureinv";
export default async function handler(req, res) {
    const {query:{guildid},method,body} = req;
    switch (method) {
        case 'POST':
            console.log(body)
            const data = {}
            if(body.count==="infinite"){
                data.countinfinite = true
            } else {
                data.countinfinite = false
                data.maxcount = body.count
            }
            if(body.expire==="infinite"){
                data.expireinfinite = true
            } else {
                data.expireinfinite = false
                const date = new Date()
                //data.expire = ((date.setTime(date.getTime() + (body.expire * 24 * 60 * 60 * 1000))/1000).toString()).split('.')[0]
                data.expire = ((date.setTime(date.getTime() + (body.expire * 24 * 60 * 60 * 1000))).toString())
            }
            data.code = body.code
            data.guildid = guildid
            const dbData = await Secureinv.create(data)
            return res.status(200).json({success: true, data: dbData})
        case 'GET':
            const dbData2 = await Secureinv.find({guildid:guildid})
            return res.status(200).json({success: true, data: dbData2})
        case 'DELETE':
            const dbData3 = await Secureinv.findOneAndDelete({code:body.code})
            return res.status(200).json({success: true, data: dbData3})
        default:
            return res.status(500).json({success: false, data: {}})
    }
}
