import React from 'react';
import styles from './toggle.module.scss';

const Toggle = ({enabled, setEnabled}: { enabled: boolean, setEnabled: (v: boolean) => void }) => {
    return (
        <div className="flex flex-col gap-3 ">
            <span className="text-white text-base text-xs">Auto roll</span>
            <button
                onClick={() => setEnabled(!enabled)}
                className={`relative w-[50px] h-[26px] rounded-[4px] cursor-pointer transition-colors ${enabled ? 'bg-[#3182ce]' : 'bg-[#1c2638]'}`}
            >
                <div
                    className={`absolute top-[2px] left-[2px] w-[22px] h-[22px] bg-white rounded-[3px] transition-transform duration-200 ease-out ${enabled ? 'translate-x-[24px]' : 'translate-x-0'}`}/>
            </button>
        </div>
    );
};

export default Toggle;