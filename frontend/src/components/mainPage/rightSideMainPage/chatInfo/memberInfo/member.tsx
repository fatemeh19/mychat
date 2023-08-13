import { groupMemberInterface } from "@/src/models/interface";
import { FC } from "react";

interface MemberProps {
    member: groupMemberInterface
}

const Member: FC<MemberProps> = ({ member }) => {

    const profilePic = member?.profilePic ? (member.profilePic).split(`\\`) : '';
    const profilePicName = profilePic[profilePic.length - 1]
    return (
        <div key={member._id} className="flex px-5 py-2 gap-2 items-center w-full cursor-pointer hover:bg-gray-200 transition-all duration-100">
            <div className={`
                    wraper
                    overflow-hidden
                    bg-transparent
                    w-12 h-12
                    rounded-full
                    flex flex-col items-center justify-start
                    
                `}>
                <img
                    src={`/uploads/photo/${profilePicName}`}
                    alt=""
                    className="
                        w-full 
                        h-full
                        object-cover
                        rounded-full
                        "
                />
            </div>
            <p >{member.name}</p>
        </div>
    );
}

export default Member;