interface SalamanderProps {
  x?: number;
  y?: number;
  scale?: number;
}

export function Salamander({ x = 0, y = 0, scale = 1 }: SalamanderProps) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Body - elongated */}
      <ellipse cx="0" cy="0" rx="20" ry="7" fill="#e89f71" />

      {/* Head */}
      <ellipse cx="-16" cy="0" rx="8" ry="7" fill="#e89f71" />

      {/* Spots */}
      <circle cx="-12" cy="-2" r="2" fill="#d17c4a" opacity="0.6" />
      <circle cx="-5" cy="2" r="2.5" fill="#d17c4a" opacity="0.6" />
      <circle cx="5" cy="-1" r="2" fill="#d17c4a" opacity="0.6" />
      <circle cx="12" cy="1" r="2.5" fill="#d17c4a" opacity="0.6" />

      {/* Eye */}
      <circle cx="-18" cy="-2" r="2" fill="black" />
      <circle cx="-17.5" cy="-2.5" r="0.8" fill="white" opacity="0.7" />

      {/* Legs - splayed out */}
      <ellipse cx="-10" cy="6" rx="3" ry="5" fill="#d17c4a" transform="rotate(30 -10 6)" />
      <ellipse cx="-3" cy="7" rx="3" ry="5" fill="#d17c4a" transform="rotate(40 -3 7)" />
      <ellipse cx="6" cy="7" rx="3" ry="5" fill="#d17c4a" transform="rotate(-40 6 7)" />
      <ellipse cx="13" cy="6" rx="3" ry="5" fill="#d17c4a" transform="rotate(-30 13 6)" />

      {/* Toes */}
      <line x1="-13" y1="10" x2="-14" y2="13" stroke="#c86845" strokeWidth="1" />
      <line x1="-11" y1="10" x2="-11" y2="13" stroke="#c86845" strokeWidth="1" />
      <line x1="-9" y1="10" x2="-8" y2="13" stroke="#c86845" strokeWidth="1" />

      <line x1="-6" y1="11" x2="-7" y2="14" stroke="#c86845" strokeWidth="1" />
      <line x1="-3" y1="11" x2="-3" y2="14" stroke="#c86845" strokeWidth="1" />
      <line x1="0" y1="11" x2="1" y2="14" stroke="#c86845" strokeWidth="1" />

      <line x1="3" y1="11" x2="2" y2="14" stroke="#c86845" strokeWidth="1" />
      <line x1="6" y1="11" x2="6" y2="14" stroke="#c86845" strokeWidth="1" />
      <line x1="9" y1="11" x2="10" y2="14" stroke="#c86845" strokeWidth="1" />

      <line x1="10" y1="10" x2="9" y2="13" stroke="#c86845" strokeWidth="1" />
      <line x1="13" y1="10" x2="13" y2="13" stroke="#c86845" strokeWidth="1" />
      <line x1="16" y1="10" x2="17" y2="13" stroke="#c86845" strokeWidth="1" />

      {/* Tail - tapered */}
      <path d="M18 0 Q25 -2 30 0 Q25 2 18 1 Z" fill="#e89f71" />
    </g>
  );
}
