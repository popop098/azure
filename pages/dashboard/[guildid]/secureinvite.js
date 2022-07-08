import useSWR from "swr";
import {useRouter} from "next/router";
import {fetcher} from "../../../utils/Fetch";
import Image from "next/image";
import {useEffect, useState} from "react";
import Link from "next/link";
import {SideNav} from "../../../components/Guild/SideNav";
import moment from "moment";
import "moment/locale/ko";
export default function GuildIndex() {
    const router = useRouter();
    const {data:guilddata, error:guilderr} = useSWR(`/api/dashboard/${router.query.guildid}`, fetcher);
    const {data:securedata, error:secureerr,mutate:securerelo} = useSWR(`/api/dashboard/${router.query.guildid}/secureinvite`, fetcher);
    if (guilderr||secureerr) return <div>failed to load</div>;
    if (!guilddata) return <div>loading...</div>;
    const guild = guilddata.data;
    const secure = securedata.data;
    const submit = async () => {
        const code = document.getElementById('code').value || Math.random().toString(36).substring(2, 8)
        const count = document.getElementById('count').value
        const expire = document.getElementById('expire').value
        const body = JSON.stringify({
            code: code,
            count: count,
            expire: expire
        })
        const res = await fetch(`/api/dashboard/${router.query.guildid}/secureinvite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body
        });
        if (!res.ok) {
            return alert(res.statusText)
        }
        const data = await res.json()
        if (data.success) {
            document.getElementById("my-modal").checked = false
            document.getElementById('code').value = ''
            document.getElementById('count').value = 'infinite'
            document.getElementById('expire').value = 'infinite'
            securerelo()
        } else {
            alert("저장에 실패하였습니다.");
        }
    }
    const deleteData = async (code) => {
        const body = JSON.stringify({
            code: code,
        })
        const res = await fetch(`/api/dashboard/${router.query.guildid}/secureinvite`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: body
        });
        if (!res.ok) {
            return alert(res.statusText)
        }
        const data = await res.json()
        if (!data.success) {
            return alert("에러가 발생하였습니다.");
        } else {
            securerelo()
        }
    }
    return (
        <div className="relative min-h-screen md:flex">
            <input type="checkbox" id="my-modal" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box max-w-2xl">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">초대 코드</span>
                        </label>
                        <label className="input-group">
                            <span>https://azure.xyz/invite/</span>
                            <input type="text" placeholder="Custom Name" id="code" className="input input-bordered" max={6} min={1}/>
                            <span className="btn btn-outline btn-success" id="gencode" onClick={()=>{
                                document.getElementById("code").value=Math.random().toString(36).substring(2, 8);
                                document.getElementById("gencode").innerText="생성됨"
                                document.getElementById("code").classList.add('input-success')
                                setTimeout(()=>{
                                    document.getElementById("code").classList.remove('input-success')
                                    document.getElementById("gencode").innerText="랜덤코드 생성"
                                },2000)
                            }}>랜덤코드 생성</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">유효횟수</span>
                        </label>
                        <select placeholder="Custom Name" id="count" className="select select-bordered">
                            <option value="infinite" selected>무제한</option>
                            <option value="1">1회</option>
                            <option value="5">5회</option>
                            <option value="10">10회</option>
                            <option value="25">25회</option>
                            <option value="50">50회</option>
                            <option value="100">100회</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">유효기간</span>
                        </label>
                        <select placeholder="Custom Name" id="expire" className="select select-bordered">
                            <option value="infinite" selected>무제한</option>
                            <option value="1">1일</option>
                            <option value="5">5일</option>
                            <option value="7">7일</option>
                            <option value="14">14일</option>
                        </select>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn btn-primary w-fit gap-2" onClick={async ()=>await submit()}>
                            <Image src="/svg/check.svg" alt="check" width={20} height={20}/>
                            저장
                        </label>
                        <label htmlFor="my-modal" className="btn btn-ghost" onClick={()=> {
                            document.getElementById('code').value = ''
                        }}>닫기</label>
                    </div>
                </div>
            </div>
            {/*사이드 메뉴 시작*/}
            <SideNav data={guild}/>
            {/*사이드 메뉴 끝*/}
            <div className="flex-1 p-10">
                <div className="w-full mt-8 space-y-3">
                    <p className="text-3xl text-white font-bold">보안 초대</p>
                    <p className="text-lg text-white">
                        보안초대란?<br/>추가적인 보안요소를 통해 (셀프봇, 토큰 등등)의 접속을 사전에 방지합니다.
                    </p>
                </div>
                <div className="w-full mt-8 space-y-3">
                    <p className="text-3xl text-white font-bold">보안 초대 링크 목록</p>
                    <label className="btn btn-primary w-fit flex items-center gap-2 modal-button"
                           htmlFor="my-modal">
                        <Image src="/svg/add.svg" width={20} height={20} loading="lazy"/>
                        <p className="text-white">새로운 링크 생성</p>
                    </label>
                    <div className="overflow-y-scroll overflow-x-hidden p-5 grid sm:grid-cols-1 grid-rows-1 lg:grid-cols-2 md:grid-cols-1 gap-4">
                        {
                            !secure ? <div className="text-center">
                                <div className="lds-ellipsis">
                                    <div/>
                                    <div/>
                                    <div/>
                                    <div/>
                                </div>
                                <p className="text-white">로딩중...</p>
                            </div> : secure.length!==0&&secure.map((data, index) => {
                                const maxcount = data.countinfinite ? '∞' : data.maxcount
                                const expire = data.expireinfinite ? '∞' : moment(Number(data.expire)).fromNow()
                                return (
                                    <>
                                        <div key={index} className="h-fit rounded-box shadow-2xl bg-gray-700 p-3 col-span-1">
                                            <div className="md:flex gap-2">
                                                <input disabled className="input input-disabled md:w-2/3 w-full" defaultValue={`https://azure.xyz/invite/${data.code}`}/>
                                                <div className="md:flex-none flex items-center gap-2 md:mt-0 mt-2">
                                                    <button className="btn btn-primary gap-1">
                                                        <Image src="/svg/copy.svg" width={20} height={20}/>복사하기
                                                    </button>
                                                    <button className="btn btn-ghost rounded-full" onClick={async ()=> await deleteData(data.code)}>
                                                        <Image src="/svg/delete.svg" width={30} height={40} loading="lazy"/>
                                                    </button>
                                                </div>
                                            </div>
                                            <p>남은 횟수: {data.count}/{maxcount}</p>
                                            <p>남은 기한: {expire}</p>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}
