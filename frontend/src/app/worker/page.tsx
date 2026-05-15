"use client";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { CheckCircle, Clock, ShieldCheck, Zap } from 'lucide-react';

export default function WorkerPortal() {
  const { connected } = useWallet();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
            Worker Portal <Zap className="ml-2 text-yellow-500" fill="currentColor" />
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Consolidated accuracy and real-time Web3 settlements.</p>
        </div>
        <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700 !rounded-2xl !px-8 !py-4 !h-auto !font-bold" />
      </div>

      {!connected ? (
        <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 p-20 text-center rounded-[3rem]">
           <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <ShieldCheck size={40} className="text-indigo-600" />
           </div>
           <h2 className="text-2xl font-bold text-slate-900 mb-4">Secure Authentication Required</h2>
           <p className="text-slate-600 max-w-md mx-auto mb-10 text-lg">
             Connect your Solana wallet to access high-yield tasks, view your accuracy trajectory, and claim settled earnings.
           </p>
           <WalletMultiButton className="!mx-auto !bg-indigo-600" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Wallet Balance</p>
                <p className="text-3xl font-black text-slate-900">12.04 <span className="text-sm font-medium text-slate-400">SOL</span></p>
             </div>
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Total Settled</p>
                <p className="text-3xl font-black text-green-600">842.50 <span className="text-sm font-medium text-slate-400">USDC</span></p>
             </div>
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Avg. Accuracy</p>
                <p className="text-3xl font-black text-indigo-600">98.2%</p>
             </div>
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Rank</p>
                <p className="text-3xl font-black text-slate-900">Expert</p>
             </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-2xl font-bold text-slate-900">Assigned Work-Stream</h2>
                <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">3 Active</span>
             </div>
             <div className="p-0">
                <table className="w-full text-left">
                  <thead className="bg-white text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-6">Task ID</th>
                      <th className="px-8 py-6">Redundancy</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6">Settlement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-8 font-mono font-bold text-slate-600">#TSK-XM22</td>
                      <td className="px-8 py-8 text-slate-500 font-medium text-lg">2 / 3 labels</td>
                      <td className="px-8 py-8">
                         <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl text-sm font-bold flex items-center w-fit">
                            <Clock size={16} className="mr-2" /> IN_PROGRESS
                         </span>
                      </td>
                      <td className="px-8 py-8 font-bold text-slate-400">Pending</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-8 font-mono font-bold text-slate-600">#TSK-XM21</td>
                      <td className="px-8 py-8 text-slate-500 font-medium text-lg">3 / 3 labels</td>
                      <td className="px-8 py-8">
                         <span className="bg-green-50 text-green-700 px-4 py-2 rounded-2xl text-sm font-bold flex items-center w-fit">
                            <CheckCircle size={16} className="mr-2" /> COMPLETED
                         </span>
                      </td>
                      <td className="px-8 py-8 font-mono text-xs text-indigo-500 font-bold bg-indigo-50/30">
                        5S1v...mock_hash
                      </td>
                    </tr>
                  </tbody>
                </table>
             </div>
          </div>
        </>
      )}
    </div>
  );
}
