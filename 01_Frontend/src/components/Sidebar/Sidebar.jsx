import { MdHome } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { IoIosVideocam } from "react-icons/io";
import { VscNewCollection } from "react-icons/vsc";
import { BiSupport } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { MdUnsubscribe } from "react-icons/md";
import { NavLink } from "react-router-dom";

const NavOptions = [
    {
        icon:<MdHome />,
        label:"Home"
    },
    {
        icon:<LuHistory />,
        label:"History"
    },
    {
        icon:<IoIosVideocam />,
        label:"My Content"
    },
    {
        icon:<MdUnsubscribe/>,
        label:"Subscribers"
    },
    {
        icon:<VscNewCollection />,
        label:"Collection"
    },
    {
        icon:<AiFillLike />,
        label:"Liked Videos"
    },
    {
        icon:<BiSupport />,
        label:"Support"
    },
    {
        icon:<IoIosSettings />,
        label:"Settings"
    }
]

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-2 bg-gray-800 min-h-screen px-2 pt-8 border border-white">
        {
            NavOptions.map((option, idx) => 
                <NavLink key={idx} className=" text-xl flex items-center border border-white gap-2 rounded py-1 px-2 hover:bg-gray-600 text-white">
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                </NavLink>
            )
        }
        
    </div>
  )
}

export default Sidebar