export default function Projects() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Owner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-6 py-4">Image Classification</td>
              <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">Active</span></td>
              <td className="px-6 py-4">Admin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
