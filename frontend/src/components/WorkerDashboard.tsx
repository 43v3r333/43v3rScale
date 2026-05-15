"use client";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LayoutDashboard, Wallet, Award, Clock } from 'lucide-react';

const WorkerDashboard = () => {
  const { publicKey, connected } = useWallet();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Worker Dashboard</h1>
          <p className="text-slate-500">Welcome back! Check your progress and earnings below.</p>
        </div>
        <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 !rounded-lg" />
      </div>

      {connected ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Wallet size={20} /></div>
              <h3 className="font-semibold text-slate-700">Total Earnings</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">142.50 USDC</p>
            <p className="text-xs text-slate-400 mt-2">Locked in Escrow: 12.00 USDC</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Clock size={20} /></div>
              <h3 className="font-semibold text-slate-700">Active Tasks</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">8</p>
            <p className="text-xs text-slate-400 mt-2">Reputation Level: Expert</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Award size={20} /></div>
              <h3 className="font-semibold text-slate-700">Reputation SBT</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full w-[85%]"></div>
              </div>
              <span className="text-sm font-medium text-slate-700">85/100</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">15 more tasks to Expert SBT</p>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-12 text-center rounded-xl">
          <p className="text-slate-500">Please connect your Solana wallet to view your earnings and tasks.</p>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;
