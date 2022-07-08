import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/router";

export const SideNav = ({data}) => {
    const router = useRouter();
    const [Open,setOpen] = useState(false);
    const guild = data;
    const current_path=router.asPath.split("/").at(-1)
    return(
        <>
            <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
                <Link href={`/dashboard/${router.query.guildid}`} passHref>
                    <p className="block p-4 text-white font-bold">
                        {
                            current_path===router.query.guildid && "메인"
                        }
                        {
                            current_path==="general" && "일반설정"
                        }
                        {
                            current_path==="secureinvite" && "보안초대"
                        }
                    </p>
                </Link>
                <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700" onClick={()=>setOpen(!Open)}>
                    {
                        Open===false ? <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg> : <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                      stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    }

                </button>
            </div>
            {
                Open &&
                <div className="w-full h-full bg-gray-800 p-4 md:hidden">
                    <div className="flex flex-col space-y-2">
                        <Link href={`/dashboard/${router.query.guildid}`} passHref><div className="flex gap-x-3 w-full hover:bg-gray-700 hover:cursor-pointer">
                            <Image src="/svg/home.svg" height={20} width={20} />
                            <p className="text-xl text-white font-bold">
                                메인
                            </p>
                        </div></Link>
                        <Link href={`/dashboard/${router.query.guildid}/general`} passHref><div className="flex gap-x-3 w-full hover:bg-gray-700 hover:cursor-pointer">
                            <Image src="/svg/gear.svg" height={20} width={20} />
                            <p className="text-xl text-white font-bold">
                                일반설정
                            </p>
                        </div></Link>
                        <Link href={`/dashboard/${router.query.guildid}/secureinvite`} passHref><div className="flex gap-x-3 w-full hover:bg-gray-700 hover:cursor-pointer">
                            <Image src="/svg/shield.svg" height={20} width={20} />
                            <p className="text-xl text-white font-bold">
                                보안초대
                            </p>
                        </div></Link>
                    </div>
                </div>
            }
            <div
                className="sidebar bg-base-300 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">

                <div className="text-white flex items-center space-x-2 px-4">
                    <Image src={guild?.icon || "/api/image?url=https://cdn.discordapp.com/embed/avatars/0.png"} alt={guild?.name + "_icon"} loading='lazy' width={50} height={50}/>
                    <span className="text-2xl font-extrabold">{guild?.name}</span>
                </div>

                <nav>
                    <Link href={`/dashboard/${router.query.guildid}`} passHref><section className={`flex block py-1 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${current_path===router.query.guildid&&'bg-sky-600 text-white'}`}>
                        <Image src="/svg/home.svg" height={20} width={20} />
                        <p className="block py-2.5 px-4 rounded transition duration-200 hover:text-white">
                            메인
                        </p>
                    </section></Link>
                    <Link href={`/dashboard/${router.query.guildid}/general`} passHref><section className={`flex block py-1 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${current_path==="general"&&'bg-sky-600 text-white'}`}>
                        <Image src="/svg/gear.svg" height={20} width={20} />
                        <p className="block py-2.5 px-4 rounded transition duration-200 hover:text-white">
                            일반설정
                        </p>
                    </section></Link>
                    <Link href={`/dashboard/${router.query.guildid}/secureinvite`} passHref><section className={`flex block py-1 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${current_path==="secureinvite"&&'bg-sky-600 text-white'}`}>
                        <Image src="/svg/shield.svg" height={20} width={20} />
                        <p className="block py-2.5 px-4 rounded transition duration-200 hover:text-white">
                            보안초대
                        </p>
                    </section></Link>
                </nav>
            </div>
        </>
    )
}
