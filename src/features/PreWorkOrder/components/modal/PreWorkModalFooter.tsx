export default function PreWorkModalFooter({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="border-t px-6 py-4 flex justify-end gap-3">
      <button className="border px-4 py-2 rounded" onClick={onClose}>
        Close
      </button>
      <button className="bg-teal-700 text-white px-4 py-2 rounded">
        Save change
      </button>
    </div>
  );
}
