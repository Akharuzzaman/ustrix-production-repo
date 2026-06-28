type PanelArtProps = {
  variant: 'contractor' | 'customer' | 'agent';
};

export default function AudiencePanelArt({ variant }: PanelArtProps) {
  if (variant === 'contractor') {
    return (
      <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="contractorBg" x1="0" y1="0" x2="400" y2="160">
            <stop offset="0%" stopColor="#1a2332" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        <rect width="400" height="160" fill="url(#contractorBg)" />
        <rect x="28" y="28" width="344" height="104" rx="6" fill="#243044" stroke="#3d4f66" strokeWidth="1.5" />
        <g transform="translate(48, 48)">
          <circle cx="28" cy="22" r="14" fill="#374151" stroke="#6b7280" strokeWidth="1.5" />
          <path d="M10 58c2-12 10-18 18-18s16 6 18 18" fill="#374151" stroke="#6b7280" strokeWidth="1.5" />
          <rect x="70" y="14" width="120" height="8" rx="2" fill="#4b5563" />
          <rect x="70" y="30" width="90" height="6" rx="2" fill="#374151" />
          <rect x="70" y="44" width="100" height="6" rx="2" fill="#374151" />
          <rect x="220" y="10" width="90" height="50" rx="4" fill="#111827" stroke="#d71920" strokeWidth="1.5" />
          <path d="M235 45h60M235 35h45" stroke="#d71920" strokeWidth="2" strokeLinecap="round" />
          <path d="M248 22l8 8 16-16" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g transform="translate(300, 110)">
          <rect width="56" height="8" rx="2" fill="#d71920" opacity="0.8" />
        </g>
      </svg>
    );
  }

  if (variant === 'customer') {
    return (
      <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="customerBg" x1="0" y1="0" x2="400" y2="160">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>
        <rect width="400" height="160" fill="url(#customerBg)" />
        <rect x="32" y="24" width="160" height="112" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        <rect x="48" y="40" width="80" height="8" rx="2" fill="#111827" />
        <rect x="48" y="56" width="120" height="6" rx="2" fill="#94a3b8" />
        <rect x="48" y="72" width="100" height="6" rx="2" fill="#cbd5e1" />
        <rect x="48" y="96" width="60" height="24" rx="4" fill="#d71920" />
        <rect x="212" y="24" width="156" height="52" rx="6" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1.5" />
        <path d="M228 44h100M228 56h70" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="340" cy="50" r="10" fill="#fdecec" stroke="#d71920" strokeWidth="1.5" />
        <path d="M336 50l3 3 6-6" stroke="#d71920" strokeWidth="2" strokeLinecap="round" />
        <rect x="212" y="88" width="156" height="48" rx="6" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1.5" />
        <rect x="228" y="104" width="50" height="20" rx="3" fill="#f1f5f9" stroke="#d1d5db" strokeWidth="1" />
        <rect x="286" y="104" width="50" height="20" rx="3" fill="#fdecec" stroke="#d71920" strokeWidth="1" />
        <rect x="344" y="104" width="8" height="20" rx="2" fill="#d71920" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="agentBg" x1="0" y1="0" x2="400" y2="160">
          <stop offset="0%" stopColor="#111827" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      <rect width="400" height="160" fill="url(#agentBg)" />
      <circle cx="200" cy="80" r="44" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
      <circle cx="200" cy="80" r="28" fill="#1f2937" stroke="#d71920" strokeWidth="2" />
      <path d="M200 62v36M184 80h32" stroke="#d71920" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <circle cx="200" cy="28" r="10" fill="#374151" stroke="#9ca3af" strokeWidth="1.5" />
      <circle cx="128" cy="80" r="10" fill="#374151" stroke="#9ca3af" strokeWidth="1.5" />
      <circle cx="272" cy="80" r="10" fill="#374151" stroke="#9ca3af" strokeWidth="1.5" />
      <circle cx="200" cy="132" r="10" fill="#374151" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="200" y1="38" x2="200" y2="52" stroke="#d71920" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="138" y1="80" x2="172" y2="80" stroke="#d71920" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="228" y1="80" x2="262" y2="80" stroke="#d71920" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="200" y1="108" x2="200" y2="122" stroke="#d71920" strokeWidth="1.5" strokeDasharray="4 4" />
      <rect x="188" y="72" width="24" height="16" rx="3" fill="#d71920" opacity="0.25" stroke="#d71920" strokeWidth="1" />
    </svg>
  );
}
