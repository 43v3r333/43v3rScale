import Link from 'next/link';
import { LayoutDashboard, Users, FolderKanban, Wallet, Briefcase, Camera } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-slate-800">
        43v3rScale
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Link href="/" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href="/projects" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800">
          <FolderKanban size={20} />
          <span>Projects</span>
        </Link>
        <Link href="/annotators" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800">
          <Users size={20} />
          <span>Annotators</span>
        </Link>
        <Link href="/wallets" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800">
          <Wallet size={20} />
          <span>Wallets</span>
        </Link>
        <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Workforce
        </div>
        <Link href="/workforce" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800">
          <Briefcase size={20} />
          <span>Label Studio</span>
        </Link>
        <Link href="/cvat" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800">
          <Camera size={20} />
          <span>CVAT</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
