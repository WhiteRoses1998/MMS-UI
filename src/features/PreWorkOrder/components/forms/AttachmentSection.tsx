export default function AttachmentSection() {
  return (
    <section className="border rounded-md p-4 space-y-4">
      <h3 className="font-semibold text-gray-700">Attach File</h3>

      <input type="file" multiple />
    </section>
  );
}
