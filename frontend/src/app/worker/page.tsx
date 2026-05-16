"use client";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { CheckCircle, Clock, ShieldCheck, Zap, GraduationCap, Award } from 'lucide-react';
import { useState } from 'react';

export default function WorkerPortal() {
  const { connected } = useWallet();
  const [mode, setMode] = useState('production'); // 'training' or 'production'

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
              Worker Portal <Zap className="ml-2 text-yellow-500" fill="currentColor" />
            </h1>
            <p className="text-slate-500 mt-2 text-lg">Weighted Consensus & Reputation System</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
             <button
                onClick={() => setMode('production')}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'production' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                Paid Tasks
             </button>
             <button
                onClick={() => setMode('training')}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'training' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                Training (Gold)
             </button>
          </div>
        </div>
        <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700 !rounded-2xl !px-8 !py-4 !h-auto !font-bold" />
      </div>

      {!connected ? (
        <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 p-20 text-center rounded-[3rem]">
           <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <ShieldCheck size={40} className="text-indigo-600" />
           </div>
           <h2 className="text-2xl font-bold text-slate-900 mb-4">Connect Your Wallet</h2>
           <p className="text-slate-600 max-w-md mx-auto mb-10 text-lg">
             Connect to access your reputation dashboard and qualify for high-priority production tasks.
           </p>
           <WalletMultiButton className="!mx-auto !bg-indigo-600" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Verification Score</p>
                <p className="text-3xl font-black text-indigo-600">98.2%</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-100">
                   <div className="h-full bg-indigo-600 w-[98%]"></div>
                </div>
             </div>
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Tasks Settled</p>
                <p className="text-3xl font-black text-slate-900">142</p>
                <Award size={48} className="absolute -right-4 -bottom-4 text-slate-50 rotate-12" />
             </div>
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Qualification</p>
                <p className="text-2xl font-black text-green-600 flex items-center">
                  <CheckCircle className="mr-2" size={20} /> Verified
                </p>
             </div>
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">SBT Status</p>
                <p className="text-2xl font-black text-slate-900 flex items-center">
                   <Award className="mr-2 text-purple-600" size={20} /> Expert
                </p>
             </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                  {mode === 'production' ? 'Production Stream' : 'Qualification Lab (Gold Standard)'}
                  {mode === 'training' && <GraduationCap className="ml-3 text-indigo-600" />}
                </h2>
                <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                  {mode === 'production' ? '3 Paid' : '5 Required'}
                </span>
             </div>
             <div className="p-0">
                <table className="w-full text-left">
                  <thead className="bg-white text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-6">Task ID</th>
                      <th className="px-8 py-6">{mode === 'production' ? 'Weighted Consensus' : 'Ground Truth Match'}</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6">Reputation Gain</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-8 font-mono font-bold text-slate-600">#TSK-GOLD-01</td>
                      <td className="px-8 py-8 text-slate-500 font-medium text-lg">99.1% Match</td>
                      <td className="px-8 py-8">
                         <span className="bg-green-50 text-green-700 px-4 py-2 rounded-2xl text-sm font-bold flex items-center w-fit">
                            <CheckCircle size={16} className="mr-2" /> PASSED
                         </span>
                      </td>
                      <td className="px-8 py-8 font-bold text-indigo-600">+0.2 Rep</td>
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
