export default function PreWorkModalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-y-auto p-6 h-[calc(100%-120px)] space-y-6">
      {children}
    </div>
  );
}
