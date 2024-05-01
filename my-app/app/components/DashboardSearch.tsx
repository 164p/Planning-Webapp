import { MdSearch } from "react-icons/md";

export default function DashboardSearch({placeholder}) {
    return (
        <div className="flex items-center gap-1 rounded-xl p-1 bg-gray-300 w-max">
            <MdSearch/>
            <input type="text" placeholder={placeholder} className=" bg-transparent outline-none"/>
        </div>
    )
}