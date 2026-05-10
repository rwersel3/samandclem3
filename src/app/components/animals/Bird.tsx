interface BirdProps {
  x?: number;
  y?: number;
  scale?: number;
  color?: string;
  singing?: boolean;
}

export function Bird({ x = 0, y = 0, scale = 1, color = '#e8a8a8', singing = false }: BirdProps) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Body */}
      <ellipse cx="0" cy="0" rx="10" ry="8" fill={color} />

      {/* Head */}
      <circle cx="-8" cy="-6" r="6" fill={color} />

      {/* Wing */}
      <path d="M2 -2 Q10 -8 12 0 Q10 2 2 2 Z" fill={color} opacity="0.8" />

      {/* Tail */}
      <path d="M8 2 Q14 0 16 4 Q14 6 8 4 Z" fill={color} opacity="0.8" />

      {/* Eye */}
      <circle cx="-10" cy="-7" r="1.5" fill="black" />
      <circle cx="-9.5" cy="-7.5" r="0.6" fill="white" opacity="0.8" />

      {/* Beak */}
      <path d="M-14 -6 L-10 -5 L-14 -4 Z" fill="#e89f71" />

      {/* Beak open when singing */}
      {singing && (
        <path d="M-14 -6 L-10 -6 L-14 -3 Z" fill="#e89f71" />
      )}

      {/* Legs */}
      <line x1="-3" y1="7" x2="-3" y2="12" stroke="#6a5a3a" strokeWidth="1" />
      <line x1="3" y1="7" x2="3" y2="12" stroke="#6a5a3a" strokeWidth="1" />

      {/* Feet */}
      <line x1="-3" y1="12" x2="-5" y2="14" stroke="#6a5a3a" strokeWidth="1" />
      <line x1="-3" y1="12" x2="-1" y2="14" stroke="#6a5a3a" strokeWidth="1" />
      <line x1="3" y1="12" x2="1" y2="14" stroke="#6a5a3a" strokeWidth="1" />
      <line x1="3" y1="12" x2="5" y2="14" stroke="#6a5a3a" strokeWidth="1" />
    </g>
  );
}
