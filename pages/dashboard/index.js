import {fetcher} from '../../utils/Fetch'
import Loading from "../../components/Loading";
import useSWR from 'swr'
import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/router";
import {OAUTH} from "../../utils/Constants";
export default function Home() {
    const router = useRouter()
    const {data,error,mutate} = useSWR('/api/dashboard/guilds', fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false
    })
    const [loading,setLoading] = useState(false)
    const reload = () => {
        setLoading(true)
        mutate()
        setLoading(false)
    }
    if(data?.error){
        return router.push(OAUTH.discord())
    }
    return (
        <>
            <Loading isloading={!data}>
                <div className="max-w-screen mx-auto py-4 px-4 sm:px-8 flex justify-center items-center">
                    <div className="w-full h-full my-6">
                        <div className="py-4">
                            <h3 className="text-3xl text-white font-semibold md:text-4xl text-center">
                                서버를 선택하세요.
                            </h3>
                            <div className="text-xl text-white font-semibold flex justify-center items-center">
                                <p>혹시 서버가 안보이시나요? </p><p className={`btn btn-ghost ${loading ? 'loading':''} ml-3 text-green-500 cursur-pointer`} onClick={reload}>Refresh</p>
                            </div>
                        </div>
                        <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-rows-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-6">
                            {
                                error && <div className="text-center text-white">앗... 서버목록을 불러오는중에 에러가 발생했어요..</div>
                            }
                            {data?.data?.map((guild,index) => {
                                return (
                                    <div key={index} className="card w-96 bg-base-300 shadow-xl hover:shadow-2xl hover:shadow-green-700 transition duration-200 ease-in-out hover:-translate-y-3 hover:border-emerald-600 hover:border hover:outline hover:outline-offset-4 hover:outline-1 hover:outline-emerald-400">
                                        <figure className="m-auto mt-4 w-32 h-32 relative">
                                            <Image src={guild.icon} alt={guild.name+"_icon"} loading='lazy' layout="fill"  />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">{guild.name}</h2>
                                            <div className="card-actions w-full">
                                                {
                                                    guild.joined ? <Link href={`/dashboard/${guild.id}`} passHref><button className="btn btn-success w-full cta-pr-btn hover:shadow-2xl hover:shadow-green-700">
                                                        대시보드
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </button></Link> : <button className="btn btn-ghost w-full cta-pr-btn">
                                                        봇 초대하기
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </button>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
                <style jsx>{`
                    .cta-pr-btn:hover svg {
                        transform: translateX(5px)
                    }
                `}</style>
            </Loading>

        </>

    )
}
