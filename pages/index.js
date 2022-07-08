import {useState, useEffect} from "react";
import {fetch,fetcher} from '../utils/Fetch'
import {DISCORD_END_POINTS, OAUTH} from '../utils/Constants'
import Loading from "../components/Loading";
import useSWR from 'swr'
import useSocket from '../utils/Socket'
import Link from "next/link";
import Image from "next/image";
export default function Home() {
    const [Uptime, setUptime] = useState("")
    const [Token, setToken] = useState("")
    const socket = useSocket('http://127.0.0.1:3000')
    const {data:Botme,error:BotmeErr} = useSWR('/api/bot/@me', fetcher)
    const {data:Botguilds,error:BotguildsErr} = useSWR('/api/bot/guilds', fetcher)
    useEffect(async () => {
        setToken(localStorage.getItem('token'))
        if (socket) {
            socket.on("uptime", (data) => {
                setUptime(data.uptime)
            })
        }
    }, [socket])
    return (
        <>
            <section className="max-w-screen-xl h-screen mx-auto py-4 px-4 sm:px-8 flex justify-center items-center">
                <div className="max-w-4xl">
                    <div className="py-4">
                        <h3 className="text-3xl text-white font-semibold md:text-4xl">
                            유저친화적인 다기능 봇,<span className="text-indigo-500"> Azure</span>
                        </h3>
                        <p className="text-gray-300 leading-relaxed mt-3 text-xl">
                            굳이 명령어로 사용할 필요없이 웹에서 컨트롤 해보세요.<br/>또한, 모든 데이터를 한눈에 볼 수 있습니다.
                        </p>
                    </div>
                    <div className="space-x-5">
                      <Link href="/invite">
                            <p className="hover:cursor-pointer cta-pr-btn px-4 py-2 text-indigo-600 font-medium bg-indigo-50 rounded-full inline-flex items-center">
                                사용해보기
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </p>
                        </Link>
                        <Link href="/dashboard">
                            <p className="hover:cursor-pointer cta-pr-btn px-4 py-2 text-indigo-600 font-medium bg-indigo-50 rounded-full inline-flex items-center">
                                대시보드
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </p>
                        </Link>
                    </div>

                </div>

                <style jsx>{`
                    .cta-pr-btn:hover svg {
                        transform: translateX(5px)
                    }
                `}</style>
            </section>
            <section className="w-screen h-screen mx-auto py-4 px-4 sm:px-8 flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
                <div className="max-w-6xl">
                    <div className="py-4">
                        <h5 className="text-white font-semibold text-center">
                            <span className="text-indigo-700"> Azure</span>는 다음과 같은 기술로 개발되었습니다.
                        </h5>
                        <div className="w-full space-y-5 text-center mt-2">
                            <div className="flex items-center justify-center">
                                <Image src='/image/nextjs.png'
                                        width={150}
                                        height={100}
                                        loading='lazy'/>

                            </div>
                            <h6 className="text-white">+</h6>
                            <div className="flex items-center justify-center">
                                <Image src='/image/mongodb.png'
                                        width={250}
                                        height={100}
                                        loading='lazy'/>
                            </div>
                            <h6 className="text-white">+</h6>
                            <div className="flex items-center justify-center">
                                <Image src='/image/discordjs.svg'
                                        width={150}
                                        height={100}
                                        loading='lazy'/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-screen h-screen mx-auto py-4 px-4 sm:px-8 flex justify-center items-center">
                <div className="max-w-4xl">
                    <div className="py-4">
                        <h3 className="text-white font-semibold text-center">
                            지금<span className="text-indigo-700"> Azure</span>는
                        </h3>
                        <div className="w-full space-y-5 text-center mt-2">
                            <h5 className="text-white">
                                {
                                    Botguilds ? Botguilds?.data?.length + "개의 서버": <h2>Loading...</h2>
                                }
                            </h5>
                            <h5 className="text-white">
                                {
                                    Uptime ? Uptime : "Loading..."
                                }
                            </h5>
                            <h5 className="text-white">동안 작동중입니다.</h5>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
