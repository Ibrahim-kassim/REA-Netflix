// "More Reasons to Join": four reusable feature cards.
const reasons = [
  { title: 'Enjoy on your TV', text: 'Watch on smart TVs, consoles, streaming sticks and more.', icon: '📺' },
  { title: 'Watch everywhere', text: 'Stream on your phone, tablet, laptop and TV, free.', icon: '🌍' },
  { title: 'Open films, real studios', text: 'Every film is a real Blender Studio production under Creative Commons.', icon: '🎬' },
  { title: 'Profiles for families', text: 'Find family-friendly shorts in their own row.', icon: '👨‍👩‍👧' },
];

function FeatureCard({ title, text, icon }: (typeof reasons)[number]) {
  return (
    <article className="flex min-h-56 flex-col justify-between rounded-2xl bg-gradient-to-br from-surface-2 to-brand/25 p-6">
      <div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-3 text-muted">{text}</p>
      </div>
      <span className="self-end text-5xl" aria-hidden>{icon}</span>
    </article>
  );
}

export function ValueProps() {
  return (
    <section className="px-4 md:px-12" aria-labelledby="reasons">
      <h2 id="reasons" className="mb-4 text-2xl font-bold">More Reasons to Join</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason) => (
          <FeatureCard key={reason.title} {...reason} />
        ))}
      </div>
    </section>
  );
}
