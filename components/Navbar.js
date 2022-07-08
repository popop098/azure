import {useState, useEffect} from "react"
import Image from "next/image"
import Link from "next/link"
import { DISCORD_END_POINTS,OAUTH } from "../utils/Constants"
// Profile Dropdown
const ProfileDropDown = (props) => {

    const [state, setState] = useState(false)

    const navigation = [
        {
            title: "Dashboard",
            path: "/dashboard"
        },  {
            title: "Log out",
            path: "/discord/logout"
        }
    ]


    return (
        <div className={`relative ${props.class}`}>
            <div className="flex items-center space-x-4 mx-28">
                {
                    props.Data ? (
                        <button
                            className="ml-2 w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600 flex items-center space-x-2"
                            onClick={() => setState(!state)}>
                            <img
                                src={props.Data.avatar}
                                className="w-full h-full rounded-full"/>
                            <p className="text-xl"><strong>{props.Data.username}</strong>#{props.Data.discriminator}</p>
                        </button>
                    ) : (
                        <Link href={OAUTH.discord()} passHref>
                            <button className="btn btn-primary">
                                    <p className="text-white">🔐 로그인</p>
                            </button>
                        </Link>
                    )
                }

            </div>
            <ul
                className={`bg-gray-600 border-none top-12 right-1 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state
                    ? ''
                    : 'lg:hidden'}`}>
                {
                    navigation.map((item, idx) => (
                        <li key={idx}>
                            <Link href={item.path} passHref>
                            <a
                                className="block text-white lg:hover:bg-gray-700 lg:p-2.5"
                                >
                                {item.title}
                            </a>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default function Navbar({userData}){
    console.log(userData)
    const [menuState, setMenuState] = useState(false)

    // Replace javascript:void(0) path with your path
    const navigation = [
        {
            title: "Customers",
            path: "javascript:void(0)"
        }, {
            title: "Careers",
            path: "javascript:void(0)"
        }, {
            title: "Guides",
            path: "javascript:void(0)"
        }, {
            title: "Partners",
            path: "javascript:void(0)"
        }
    ]
    return (
        <nav className="border-b sticky z-50 top-0 bg-gray-600 border-none">
            <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto">
                <div className="flex-none lg:flex-initial">
                    <Link href="/" passHref>
                        <a className="hover:cursur-pointer">
                        <Image
                            src="/image/Azurenav.png"
                            width={'100%'}
                            height={20}
                            alt="logo"/></a>
                    </Link>
                </div>
                <div className="flex-1 flex items-center justify-between">
                    <div
                        className={`bg-gray-600 absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuState
                            ? ''
                            : 'hidden'}`}>
                        <ul className=" mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx} className="text-gray-600 hover:text-gray-900">
                                        <Link href={item.path}>
                                            <p className="text-white hover:cursor-pointer">{item.title}</p>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <ProfileDropDown class="mt-5 pt-5 border-t lg:hidden" Data={userData}/>
                    </div>
                    <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
                        <ProfileDropDown class="hidden lg:block" Data={userData}/>
                        <button
                            className="outline-none text-gray-400 block lg:hidden"
                            onClick={() => setMenuState(!menuState)}>
                            {
                                menuState
                                    ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    )
                                    : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 6h16M4 12h16m-7 6h7"/>
                                        </svg>
                                    )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
