interface HoppyProps {
  x?: number;
  y?: number;
  scale?: number;
  munching?: boolean;
}

export function Hoppy({ x = 0, y = 0, scale = 1, munching = false }: HoppyProps) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Body */}
      <ellipse cx="0" cy="20" rx="28" ry="24" fill="#a07855" />

      {/* Head */}
      <ellipse cx="0" cy="-8" rx="20" ry="22" fill="#a07855" />
      <ellipse cx="0" cy="-5" rx="16" ry="18" fill="#b89070" />

      {/* Long ears */}
      <ellipse cx="-12" cy="-30" rx="6" ry="20" fill="#a07855" />
      <ellipse cx="-12" cy="-30" rx="3" ry="16" fill="#c9a696" />
      <ellipse cx="12" cy="-30" rx="6" ry="20" fill="#a07855" />
      <ellipse cx="12" cy="-30" rx="3" ry="16" fill="#c9a696" />

      {/* Eyes */}
      <ellipse cx="-7" cy="-10" rx="4" ry="5" fill="black" />
      <ellipse cx="7" cy="-10" rx="4" ry="5" fill="black" />
      <circle cx="-6" cy="-12" r="2" fill="white" opacity="0.6" />
      <circle cx="8" cy="-12" r="2" fill="white" opacity="0.6" />

      {/* Nose - moves when munching */}
      <g transform={munching ? 'translate(0, 2)' : 'translate(0, 0)'}>
        <ellipse cx="-3" cy="0" rx="3" ry="2.5" fill="#8a6845" />
        <ellipse cx="3" cy="0" rx="3" ry="2.5" fill="#8a6845" />
        <path d="M0 0 L0 3" stroke="#8a6845" strokeWidth="1.5" />
      </g>

      {/* Mouth */}
      <path d="M-5 3 Q0 5 5 3" stroke="#8a6845" strokeWidth="1.5" fill="none" />

      {/* Buck teeth */}
      <rect x="-3" y="4" width="2.5" height="4" fill="white" rx="0.5" />
      <rect x="0.5" y="4" width="2.5" height="4" fill="white" rx="0.5" />

      {/* Whiskers */}
      <line x1="-20" y1="-3" x2="-12" y2="-2" stroke="#6a5a3a" strokeWidth="1" />
      <line x1="-20" y1="1" x2="-12" y2="1" stroke="#6a5a3a" strokeWidth="1" />
      <line x1="20" y1="-3" x2="12" y2="-2" stroke="#6a5a3a" strokeWidth="1" />
      <line x1="20" y1="1" x2="12" y2="1" stroke="#6a5a3a" strokeWidth="1" />

      {/* Front paws */}
      <ellipse cx="-10" cy="38" rx="6" ry="8" fill="#a07855" />
      <ellipse cx="10" cy="38" rx="6" ry="8" fill="#a07855" />

      {/* Fluffy tail */}
      <ellipse cx="-25" cy="15" rx="12" ry="14" fill="#c9a696" />
      <ellipse cx="-30" cy="10" rx="10" ry="12" fill="#a07855" />
    </g>
  );
}
