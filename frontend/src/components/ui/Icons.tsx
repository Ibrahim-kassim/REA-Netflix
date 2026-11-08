// Small inline icons (no icon font): play, plus, check, thumbs, chevron, sound.
const base = { width: '1em', height: '1em', viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true } as const;

export const PlayIcon = () => <svg {...base}><path d="M6 4l15 8-15 8z" /></svg>;
export const PlusIcon = () => <svg {...base}><path d="M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7z" /></svg>;
export const CheckIcon = () => <svg {...base}><path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" /></svg>;
export const ThumbIcon = ({ down = false }: { down?: boolean }) => (
  <svg {...base} style={down ? { transform: 'rotate(180deg)' } : undefined}>
    <path d="M2 21h4V9H2v12zm20-11a2 2 0 0 0-2-2h-6.3l1-4.6v-.3c0-.4-.2-.8-.4-1.1L13.2 1 6.6 7.6C6.2 8 6 8.5 6 9v10a2 2 0 0 0 2 2h9c.8 0 1.5-.5 1.8-1.2l3-7.1c.1-.2.2-.5.2-.7z" />
  </svg>
);
export const ChevronDownIcon = () => <svg {...base}><path d="M7.4 8.6L12 13.2l4.6-4.6L18 10l-6 6-6-6z" /></svg>;
export const SoundIcon = ({ muted }: { muted: boolean }) => (
  <svg {...base}>
    <path d="M3 9v6h4l5 5V4L7 9H3z" />
    {muted ? <path d="M16 9l5 6m0-6l-5 6" stroke="currentColor" strokeWidth="2" /> : <path d="M16.5 12a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" />}
  </svg>
);
export const SearchIcon = () => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
);
