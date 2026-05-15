export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">43v3rScale Switchboard</h1>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Agent Layer Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-medium">AI-Drafted Tasks</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">1,240</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-medium">Human-Reviewed</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">842</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-medium">Avg. Consensus</h3>
          <p className="text-3xl font-bold mt-2">99.4%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-medium">Experts Active</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Real-time Task Feed</h2>
          <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Auto-updating</span>
        </div>
        <div className="p-0">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">Task ID</th>
                <th className="px-6 py-4 font-semibold">Modal</th>
                <th className="px-6 py-4 font-semibold">AI Pre-label</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Worker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              <tr>
                <td className="px-6 py-4 font-mono">#TSK-8821</td>
                <td className="px-6 py-4">Image (CVAT)</td>
                <td className="px-6 py-4"><span className="text-blue-600">SAM 3 Mask</span></td>
                <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">AI-Drafted</span></td>
                <td className="px-6 py-4">-</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-mono">#TSK-8820</td>
                <td className="px-6 py-4">Text (RLHF)</td>
                <td className="px-6 py-4"><span className="text-purple-600">Gemini 3 Flash</span></td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Human-Reviewed</span></td>
                <td className="px-6 py-4">Jordan (Expert)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
