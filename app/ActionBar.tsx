'use client';

type Tone = 'primary' | 'success' | 'ghost';
type Action = { label: string; href: string; tone: Tone; onClick?: () => void };

export default function ActionBar() {
  const actions: Action[] = [
    { label: 'Go Live (TrendScout)', href: 'https://t.me/mal3000bot?start=go_live_trendscout', tone: 'primary' },
    { label: 'Approve Final (Phone)', href: 'https://t.me/mal3000bot?start=approve_final_phone_app', tone: 'success' },
    { label: 'Open RunnitBack Mobile', href: 'https://runnitback-mobile.vercel.app', tone: 'ghost' },
    { label: 'Refresh Dashboard', href: '#', tone: 'ghost', onClick: () => window.location.reload() },
  ];

  return (
    <div className="action-grid">
      {actions.map((a, i) => (
        <a
          key={i}
          className={`btn ${a.tone}`}
          href={a.href}
          onClick={(e) => {
            if (a.onClick) {
              e.preventDefault();
              a.onClick();
            }
          }}
        >
          {a.label}
        </a>
      ))}
    </div>
  );
}
