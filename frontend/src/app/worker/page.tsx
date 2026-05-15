"use client";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LayoutDashboard, CheckCircle, Database, TrendingUp, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WorkerPortal() {
  const { publicKey, connected } = useWallet();
  const [earnings, setEarnings] = useState(0);

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Worker Portal</h1>
          <p className="text-slate-500 mt-1">Proof-of-Quality enabled data labeling engine.</p>
        </div>
        <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !transition-all" />
      </div>

      {!connected ? (
        <div className="bg-indigo-50 border border-indigo-100 p-12 text-center rounded-3xl">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
             <AlertCircle className="text-indigo-600" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Connect Your Wallet</h2>
          <p className="text-slate-600 max-w-sm mx-auto mb-8">
            Access your active tasks and track your on-chain USDC payouts by connecting your Solana wallet.
          </p>
          <WalletMultiButton className="!mx-auto !bg-indigo-600" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-indigo-500 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-50 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors"><TrendingUp size={20} /></div>
                <h3 className="font-semibold text-slate-700">On-chain Earnings</h3>
              </div>
              <p className="text-3xl font-bold text-slate-900">42.85 <span className="text-sm font-medium text-slate-400">USDC</span></p>
              <p className="text-xs text-slate-400 mt-2 flex items-center">
                <CheckCircle size={12} className="mr-1 text-green-500" /> Verified & Released
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-indigo-500 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors"><Database size={20} /></div>
                <h3 className="font-semibold text-slate-700">Available Tasks</h3>
              </div>
              <p className="text-3xl font-bold text-slate-900">12</p>
              <p className="text-xs text-slate-400 mt-2">Level: Expert (Reputation > 90)</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-indigo-500 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors"><LayoutDashboard size={20} /></div>
                <h3 className="font-semibold text-slate-700">Pending Payouts</h3>
              </div>
              <p className="text-3xl font-bold text-slate-900">1.25 <span className="text-sm font-medium text-slate-400">USDC</span></p>
              <p className="text-xs text-slate-400 mt-2">3 tasks awaiting consensus</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Task Performance Feed</h2>
                <button className="text-indigo-600 text-sm font-semibold hover:underline">View History</button>
             </div>
             <div className="p-0 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Task ID</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Consensus</th>
                      <th className="px-6 py-4">Reward</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                    <tr>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">#TSK-10292</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">VERIFIED</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">98.4%</td>
                      <td className="px-6 py-4 font-bold text-slate-900">0.05 USDC</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">#TSK-10291</td>
                      <td className="px-6 py-4">
                        <span className="bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full text-xs font-medium">AWAITING</span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">2/3 subs</td>
                      <td className="px-6 py-4 text-slate-400">0.05 USDC</td>
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
