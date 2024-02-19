import ConstructionSign from "@/app/components/Construction/ConstructionSign"

export default function page() {
    return (
        <div className="pb-12 pt-36">
            <div className="container">
                <div className="max-w-md mx-auto">
                    <ConstructionSign message={'ขออภัยหน้านี่ยังไม่พร้อมให้บริการ'} /> 
                </div>
            </div>
        </div>
    )
}