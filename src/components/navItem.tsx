// 2. Sub-component for Navbar Items
const NavItemComponent = ({icon, label, active = false}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean
}) => (
    <div
        className={`flex flex-1 flex-col items-center justify-center border-r border-[#1A3150] py-2 transition-colors last:border-r-0 hover:bg-white/5 ${active ? 'bg-cyan-500/10' : ''}`}>
        <div className={`${active ? 'text-cyan-400' : 'text-white/70'}`}>{icon}</div>
        <span className={`mt-1 text-[10px] font-bold tracking-widest ${active ? 'text-cyan-400' : 'text-white/70'}`}>
      {label}
    </span>
    </div>
);

export default NavItemComponent