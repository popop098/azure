import useSWR from "swr";
import {fetcher} from "../../utils/Fetch";

export const Statistic = ({gid}) => {
    const {data:member, error:memberErr} = useSWR(`/api/dashboard/${gid}/members`, fetcher);
    const {data:channel, error:channelErr} = useSWR(`/api/dashboard/${gid}/channels`, fetcher);
    const {data:role, error:roleErr} = useSWR(`/api/dashboard/${gid}/roles`, fetcher);
    const getMembers = (data) => {
        console.log(data);
        let memberData = data
        let memberCount = 0;
        if(member){
            memberData.filter(function (ele){
                if(!ele.user.hasOwnProperty('bot')){
                    memberCount++;
                }
            })
            return memberCount
        }
    }
    const getBots = (data) => {
        console.log(data);
        let memberBot = data
        let memberCount = 0;
        if(member){
            memberBot.filter(function(element){
                if(element.user.bot){
                    memberCount++
                }
            })
            return memberCount
        }
    }
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
            <div className="grid grid-cols-2 row-gap-8 md:grid-cols-4">
                <div className="text-center md:border-r">
                    <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">{member ? getMembers(member.data) : '로딩중..'}</h6>
                    <p className="text-sm font-medium tracking-widest text-white uppercase lg:text-base">
                        전체 멤버
                    </p>
                </div>
                <div className="text-center md:border-r">
                    <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">{member? getBots(member.data) : '로딩중..'}</h6>
                    <p className="text-sm font-medium tracking-widest text-white uppercase lg:text-base">
                        전체 봇
                    </p>
                </div>
                <div className="text-center md:border-r">
                    <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">{channel ? channel.data.length : '로딩중..'}</h6>
                    <p className="text-sm font-medium tracking-widest text-white uppercase lg:text-base">
                        전체 채널
                    </p>
                </div>
                <div className="text-center">
                    <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">{role ? role.data.length : '로딩중..'}</h6>
                    <p className="text-sm font-medium tracking-widest text-white uppercase lg:text-base">
                        전체 역할
                    </p>
                </div>
            </div>
        </div>
    );
};
