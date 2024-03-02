import DatePicker from "@/app/components/DatePicker"

export default function page(){
    return (
        <div className="container pt-28">
            <div className="header-section mb-8">
                <h1 className="text-center font-bold text-2xl">My Planning</h1>
                <p className="text-center">Select your plan for edit</p>
            </div>
            <div className="section">
                <DatePicker />
            </div>
        </div>
    )
}