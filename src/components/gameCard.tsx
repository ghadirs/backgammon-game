// 1. Sub-component for Game Cards to keep the main return clean
import {ChevronRight} from "lucide-react";

const GameCardComponent = ({title, imgUrl}: { title: string; imgUrl: string }) => (
    <div className="group w-64 cursor-pointer transition-transform duration-300 hover:scale-105">
        {/* Image Container */}
        <div className="h-36 overflow-hidden rounded-t-xl border border-[#1A3150] border-b-0">
            <img src={imgUrl} alt={title} className="h-full w-full object-cover"/>
        </div>
        {/* Label Container */}
        <div
            className="flex items-center justify-between border border-[#1A3150] bg-[#1A3150]/70 p-3 backdrop-blur-md rounded-b-xl">
            <span className="text-sm font-medium text-white tracking-tight">{title}</span>
            <div
                className="rounded-md border border-[#1A3150] bg-[#09152A]/50 p-1 group-hover:bg-cyan-500 transition-colors">
                <ChevronRight size={16} className="text-white"/>
            </div>
        </div>
    </div>
);

export default GameCardComponent;