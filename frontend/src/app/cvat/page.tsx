export default function CVAT() {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-6">CVAT</h1>
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[700px]">
        <iframe
          src="/proxy/cvat/"
          className="w-full h-full border-none"
          title="CVAT"
        />
      </div>
    </div>
  );
}
