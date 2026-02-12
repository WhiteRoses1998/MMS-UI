interface Props {
  onClose: () => void;
  onSave: () => void;
  onOpenJob: () => void;
}

export default function PreWorkModalFooter({ onClose, onSave, onOpenJob }: Props) {
  return (
    <div className="border-t px-6 py-4 flex justify-end gap-3">
      <button className="border px-4 py-2 rounded" onClick={onClose}>
        Close
      </button>
      <button className="bg-teal-700 text-white px-4 py-2 rounded" onClick={onSave}>
        Save change
      </button>
      <button className="bg-green-700 text-white px-4 py-2 rounded" onClick={onOpenJob}>
        Open Job
      </button>
    </div>
  );
}