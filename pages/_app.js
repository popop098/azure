import '../styles/globals.css'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {OAUTH} from '../utils/Constants'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import jwt from 'jsonwebtoken'
import {useDetectAdBlock} from "adblock-detect-react";
import {toast, ToastContainer, Slide} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function MyApp({Component, pageProps}) {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false);
    const [userData, setuserData] = useState({});
    const adBlockDetected = useDetectAdBlock();
    useEffect(() => {
        // on initial load - run auth check
        console.log(
            '%cAzure Bot',
            'color: #4117ff; -webkit-text-stroke: 2px black; font-size: 60px; font-weight: ' +
            'bold;'
        )
        console.log(
            '%c로그인 여부를 확인합니다.',
            'color: #ebbc02; -webkit-text-stroke: 2px black; font-size: 60px; font-weight: ' +
            'bold;'
        )
        console.log(
            '%c이곳에 함부로 토큰같은 중요한 정보를 입력하지마세요.',
            'color: #c21d04; -webkit-text-stroke: 2px black; font-size: 60px; font-weight: ' +
            'bold;'
        )
        console.log(
            '%c만일 이런 시스템을 잘 안다면 지원해보세요!',
            'color: #c21d04; -webkit-text-stroke: 2px black; font-size: 60px; font-weight: ' +
            'bold;'
        )
        if (adBlockDetected) {
            console.log('detected adblock')
            toast.warn('에드블럭이 감지되었어요! 개발자가 힘낼 수 있게 사용을 해제해주시면 감사하겠습니다! :)', {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Slide,
                theme:"colored"
            });
        }
        authCheck(router.asPath);
        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false);
        router
            .events
            .on('routeChangeStart', hideContent);

        // on route change complete - run auth check
        router
            .events
            .on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router
                .events
                .off('routeChangeStart', hideContent);
            router
                .events
                .off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        const publicPaths = ['/tos', '/about', '/', '/discord/logout', '/discord/callback'];
        const path = url.split('?')[0];
        if (!localStorage.getItem('token') && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push(
                OAUTH.discord('989324139775000576', 'identify%20email%20guilds%20guilds.join')
            );
        } else {
            setAuthorized(true);
            const token = localStorage.getItem('token');
            const decoded = jwt.decode(token, process.env.JWT_SECRET);
            setuserData(decoded);
            console.log(
                '%c로그인 성공!',
                'color: #04c273; -webkit-text-stroke: 2px black; font-size: 60px; font-weight: ' +
                'bold;'
            )
        }
    }

    return (
        <>

            <Navbar userData={userData}/>

            {
                authorized
                    ? <Component {...pageProps}/>
                    : <Loading>
                        <Component {...pageProps}/>
                    </Loading>
            }
            <ToastContainer style={{width:"30em"}} limit={3}/>
            <Footer/>
        </>
    )
}

export default MyApp
