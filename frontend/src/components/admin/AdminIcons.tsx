// Sidebar icons for the admin area (stroke icons, sized to the text).
const base = {
  width: '1.15em', height: '1.15em', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
} as const;

export const ChartIcon = () => <svg {...base}><path d="M4 20V11M10 20V5M16 20v-7M21 20H3" /></svg>;
export const FilmIcon = () => (
  <svg {...base}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4" /></svg>
);
export const UsersIcon = () => (
  <svg {...base}><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0M16 4.2a4 4 0 0 1 0 7.6M22 21a7 7 0 0 0-4-6.3" /></svg>
);
export const BackIcon = () => <svg {...base}><path d="M15 18l-6-6 6-6" /></svg>;
