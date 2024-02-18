import ConstructionLine from "./ConstructionLine"

export default function ConstructionSign( {message}: any){
    return (
        <div className="card overflow-hidden bg-slate-500 rounded-md max-w-xl">
            <ConstructionLine />
            <div className="card-body p-5 text-slate-200">
                <div className="flex justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="m17.85 19.95l-4.425-4.425l2.1-2.1l4.425 4.425q.425.425.425 1.05t-.425 1.05q-.425.425-1.05.425t-1.05-.425Zm-13.8 0q-.425-.425-.425-1.05t.425-1.05L9.9 12l-1.7-1.7q-.325.325-.725.3t-.675-.3l-.575-.575v2.05l-.175.175q-.225.225-.525.225T5 11.95L3.025 9.975Q2.8 9.75 2.8 9.45t.225-.525L3.2 8.75h2.05L4.7 8.2q-.3-.3-.3-.7t.3-.7l2.85-2.85q.5-.5 1.075-.725T9.8 3q.6 0 1.175.225t1.075.725l-2.3 2.3l.55.55q.275.275.3.675t-.3.725L12 9.9l2.25-2.25q-.1-.275-.162-.575t-.063-.6q0-1.475 1.013-2.487t2.487-1.013q.375 0 .713.075t.687.225L16.45 5.75l1.8 1.8l2.475-2.475q.175.35.238.687t.062.713q0 1.475-1.012 2.488t-2.488 1.012q-.3 0-.6-.05t-.575-.175l-10.2 10.2q-.425.425-1.05.425t-1.05-.425Z"></path></svg>
                </div>
                <p className="text-center font-semibold text-lg">{message}</p>
            </div>
            <ConstructionLine />
        </div>
    )
}