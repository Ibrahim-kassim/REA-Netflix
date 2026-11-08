// Player-only icons: pause, back/forward 10 s, full screen.
const base = { width: '1em', height: '1em', viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true } as const;

export const PauseIcon = () => <svg {...base}><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>;
export const Back10Icon = () => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" strokeLinecap="round" />
    <text x="12" y="15.5" fontSize="8" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="700">10</text>
  </svg>
);
export const Forward10Icon = () => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 12a8 8 0 1 1-2.4-5.7M20 4v4h-4" strokeLinecap="round" />
    <text x="12" y="15.5" fontSize="8" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="700">10</text>
  </svg>
);
export const FullscreenIcon = () => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
);
