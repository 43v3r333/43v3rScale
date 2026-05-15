import { Box, FileText, CheckCircle, Activity, Brain } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">43v3rScale Switchboard</h1>
        <div className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
          <Brain size={18} />
          <span>Agent Layer Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-medium">AI-Drafted</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">1,240</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-medium">Consensus Reached</h3>
          <p className="text-3xl font-bold mt-2 text-indigo-600">412</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-medium">Finalized (Paid)</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">388</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-medium">Avg. Consensus</h3>
          <p className="text-3xl font-bold mt-2 font-mono">99.4%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold">Global Task Feed</h2>
          </div>
          <div className="flex items-center space-x-4">
             <span className="flex items-center text-xs text-slate-500">
               <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
               Live Updates
             </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Task ID</th>
                <th className="px-6 py-4 font-semibold">Modal</th>
                <th className="px-6 py-4 font-semibold">AI Pre-label</th>
                <th className="px-6 py-4 font-semibold">Current Status</th>
                <th className="px-6 py-4 font-semibold">Consensus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">#TSK-8821</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Box size={14} className="text-slate-400" />
                    <span>CVAT (.mp4)</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-blue-600 font-medium">SAM 3 Poly</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    AI_DRAFTED
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400">0/2</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">#TSK-8820</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <FileText size={14} className="text-slate-400" />
                    <span>LS (.json)</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-purple-600 font-medium">Gemini 3 Rank</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    CONSENSUS_REACHED
                  </span>
                </td>
                <td className="px-6 py-4 text-indigo-600 font-medium">2/2</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">#TSK-8819</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Box size={14} className="text-slate-400" />
                    <span>CVAT (.png)</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-blue-600 font-medium">SAM 3 Mask</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-50 text-green-700 border border-green-100 px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center w-fit">
                    <CheckCircle size={12} className="mr-1" />
                    FINALIZED
                  </span>
                </td>
                <td className="px-6 py-4 text-green-600 font-medium">2/2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
