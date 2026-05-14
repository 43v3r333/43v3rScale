export default function Annotators() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Annotators</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Solana Address</th>
              <th className="px-6 py-4 font-semibold">Milestone (100 High-Acc)</th>
              <th className="px-6 py-4 font-semibold">SBT Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-6 py-4">Alex Worker</td>
              <td className="px-6 py-4 font-mono text-sm text-slate-500">HN7c...6v9p</td>
              <td className="px-6 py-4">
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full w-[45%]"></div>
                </div>
                <span className="text-xs text-slate-500 mt-1">45 / 100</span>
              </td>
              <td className="px-6 py-4">
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-sm">Not Minted</span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">Jordan Expert</td>
              <td className="px-6 py-4 font-mono text-sm text-slate-500">8dK2...1mQx</td>
              <td className="px-6 py-4">
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full w-full"></div>
                </div>
                <span className="text-xs text-slate-500 mt-1">100 / 100</span>
              </td>
              <td className="px-6 py-4">
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm font-medium">SBT Minted</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
