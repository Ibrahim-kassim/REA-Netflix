export function Spinner({ label = 'Loading' }: { label?: string }) {
  return (
    <div role="status" className="grid min-h-[40vh] place-items-center">
      <span className="size-10 animate-spin rounded-full border-4 border-line border-t-brand" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
