import DatePickers from "@/app/components/DatePickers"

export default function page(){
    return (
        <div className="container pt-28 pb-12">
            <div className="header-section mb-8">
                <h1 className="text-center font-bold text-2xl">My Planning</h1>
                <p className="text-center">Select your plan for edit</p>
            </div>
            <div className="section">
                <DatePickers />
            </div>
            <div className="section">

            </div>
        </div>
    )
}