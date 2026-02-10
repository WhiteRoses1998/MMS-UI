export default function PreWorkModalHeader({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="bg-teal-700 text-white px-6 py-4 flex justify-between">
      <h2 className="text-lg font-semibold">Edit Fault Report</h2>
      <button onClick={onClose}>✕</button>
    </div>
  );
}
