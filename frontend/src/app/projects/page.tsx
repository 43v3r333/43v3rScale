"use client";
import { FolderKanban, Plus, DollarSign, ShieldCheck, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function Projects() {
  const [showDeposit, setShowDeposit] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Project Management</h1>
          <p className="text-slate-500">Orchestrate datasets and manage Solana escrow vaults.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center transition-all">
          <Plus size={20} className="mr-2" /> New Project
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Project Name</th>
              <th className="px-6 py-4">Redundancy</th>
              <th className="px-6 py-4">Vault Balance</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <tr className="hover:bg-slate-50/30 transition-colors">
              <td className="px-6 py-5">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><FolderKanban size={18} /></div>
                  <span className="font-bold text-slate-700">Autonomous Driving (Lidar)</span>
                </div>
              </td>
              <td className="px-6 py-5 text-slate-500 font-medium">3 Workers / Task</td>
              <td className="px-6 py-5">
                 <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-slate-900">420.00 USDC</span>
                    <ShieldCheck size={14} className="text-green-500" />
                 </div>
              </td>
              <td className="px-6 py-5">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Active</span>
              </td>
              <td className="px-6 py-5 text-right">
                <button
                  onClick={() => setShowDeposit(true)}
                  className="text-indigo-600 hover:text-indigo-800 font-bold text-sm flex items-center justify-end ml-auto"
                >
                  <DollarSign size={16} className="mr-1" /> Deposit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {showDeposit && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Fund Project Vault</h2>
            <p className="text-slate-500">Transfer USDC to the on-chain escrow to enable task processing.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Deposit Amount (USDC)</label>
                <div className="relative">
                   <input type="number" placeholder="0.00" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono" />
                   <DollarSign className="absolute left-3 top-3.5 text-slate-400" size={18} />
                </div>
              </div>
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                 <p className="text-xs text-indigo-700 font-medium">Vault Address:</p>
                 <p className="text-sm font-mono font-bold text-indigo-900 truncate">43v3rVault...X92j</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeposit(false)}
                className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all flex items-center justify-center">
                 Confirm <ExternalLink size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
