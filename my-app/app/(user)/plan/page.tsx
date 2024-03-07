
import DatePicker from "@/app/components/DatePicker"

export default function page(){
    return (
        <div className="container pt-28">
            <div className="max-w-6xl mx-auto">
                <div className="header-section mb-10">
                    <h1 className="text-center font-bold text-2xl">My Planning</h1>
                    <p className="text-center">Select your plan for edit</p>
                </div>
                
                <div className="section">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col">
                            <div className="card rounded-md bg-[#D3BD9A] p-5">
                                
                            </div>
                        </div>
                        <div className="col md:col-span-2">
                            <div className="card rounded-md bg-[#D3BD9A] p-5">
                                
                            </div>
                        </div>
                    </div>
              </div>
            </div>
        </div>
    )
}