import useSWR from "swr";
import {useRouter} from "next/router";
import {fetcher} from "../../../utils/Fetch";
import Image from "next/image";
import {useEffect,useState} from "react";
import Link from "next/link";
import {Statistic} from "../../../components/Guild/Stat";
import {LoadingOption} from "../../../components/Guild/LoadingOption";
import {SideNav} from "../../../components/Guild/SideNav";

export default function GuildIndex() {
    const router = useRouter();
    const {data, error} = useSWR(`/api/dashboard/${router.query.guildid}`, fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    const guild = data.data;
    return (
        <div className="relative min-h-screen md:flex">
            {/*사이드 메유 시작*/}
            <SideNav data={guild}/>
            {/*사이드 메뉴 끝*/}
            <div className="flex-1 p-10">
                <div className="w-full flex items-center gap-x-7 h-32">
                    <Image src={guild?.icon || "/api/image?url=https://cdn.discordapp.com/embed/avatars/0.png"} alt={guild?.name + "_icon"} loading='lazy' width={120} height={120}/>
                    <div className="w-full">
                        <h4>{guild?.name}</h4>
                        <p>{guild?.id}</p>
                    </div>
                </div>
                <div className="w-full mt-8">
                    <p className="text-2xl text-white">서버 정보</p>
                    <Statistic gid={router.query.guildid}/>
                </div>
                <div className="w-full mt-8">
                    <p className="text-2xl text-white">기능 설정 상태</p>
                    {/*<div className="grid sm:grid-cols-2 grid-rows-1 lg:grid-cols-4 md:grid-cols-3 gap-4 mt-6">*/}
                    {/*    <div className="w-80 h-52 bg-gray-800 rounded-lg shadow-lg p-4">*/}
                    {/*        <div className="flex items-center justify-between animate-pulse">*/}
                    {/*            <div className="bg-slate-700 rounded-full text-slate-700">*/}
                    {/*                환영 메시지*/}
                    {/*            </div>*/}
                    {/*            <div className="btn bg-slate-700 rounded-box btn-disabled text-slate-700">*/}
                    {/*                관리하기*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="space-y-2 mt-2 animate-pulse">*/}
                    {/*            <div className="bg-slate-700 rounded-full text-slate-700">*/}
                    {/*                접속 메시지 : 사용안함*/}
                    {/*            </div>*/}
                    {/*            <div className="bg-slate-700 rounded-full text-slate-700">*/}
                    {/*                접속 메시지 : 사용안함*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="w-80 h-52 bg-gray-800 rounded-lg shadow-lg p-4">*/}
                    {/*        <div className="flex items-center justify-between">*/}
                    {/*            <p className="text-white text-lg font-bold">*/}
                    {/*                👋환영 메시지*/}
                    {/*            </p>*/}
                    {/*            <p className="btn btn-ghost text-white text-md font-bold">*/}
                    {/*                관리하기*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <p className="text-white font-bold flex">*/}
                    {/*                접속 메시지 : <p className="text-red-700">사용안함</p>*/}
                    {/*            </p>*/}
                    {/*            <p className="text-white font-bold flex">*/}
                    {/*                나가는 메시지 : <p className="text-red-700">사용안함</p>*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="w-80 h-52 bg-gray-800 rounded-lg shadow-lg p-4">*/}
                    {/*        <div className="flex items-center justify-between">*/}
                    {/*            <p className="text-white text-lg font-bold">*/}
                    {/*                👋환영 메시지*/}
                    {/*            </p>*/}
                    {/*            <p className="btn btn-ghost text-white text-md font-bold">*/}
                    {/*                관리하기*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <p className="text-white font-bold flex">*/}
                    {/*                접속 메시지 : <p className="text-red-700">사용안함</p>*/}
                    {/*            </p>*/}
                    {/*            <p className="text-white font-bold flex">*/}
                    {/*                나가는 메시지 : <p className="text-red-700">사용안함</p>*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="w-80 h-52 bg-gray-800 rounded-lg shadow-lg p-4">*/}
                    {/*        <div className="flex items-center justify-between">*/}
                    {/*            <p className="text-white text-lg font-bold">*/}
                    {/*                👋환영 메시지*/}
                    {/*            </p>*/}
                    {/*            <p className="btn btn-ghost text-white text-md font-bold">*/}
                    {/*                관리하기*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <p className="text-white font-bold flex">*/}
                    {/*                접속 메시지 : <p className="text-red-700">사용안함</p>*/}
                    {/*            </p>*/}
                    {/*            <p className="text-white font-bold flex">*/}
                    {/*                나가는 메시지 : <p className="text-red-700">사용안함</p>*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <LoadingOption/>
                </div>

            </div>

        </div>
    )
}
