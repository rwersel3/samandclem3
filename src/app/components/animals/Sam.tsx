interface SamProps {
  x?: number;
  y?: number;
  scale?: number;
  expression?: 'happy' | 'sad' | 'neutral' | 'surprised';
}

export function Sam({ x = 0, y = 0, scale = 1, expression = 'neutral' }: SamProps) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Body */}
      <ellipse cx="0" cy="15" rx="18" ry="20" fill="#8a6845" />

      {/* Head */}
      <ellipse cx="0" cy="-5" rx="16" ry="17" fill="#a07855" />

      {/* Ears */}
      <ellipse cx="-10" cy="-18" rx="6" ry="9" fill="#a07855" />
      <ellipse cx="-10" cy="-18" rx="3" ry="5" fill="#c9a696" />
      <ellipse cx="10" cy="-18" rx="6" ry="9" fill="#a07855" />
      <ellipse cx="10" cy="-18" rx="3" ry="5" fill="#c9a696" />

      {/* Eyes */}
      <ellipse cx="-5" cy="-6" rx="3" ry="4" fill="black" />
      <ellipse cx="5" cy="-6" rx="3" ry="4" fill="black" />
      <circle cx="-4" cy="-7" r="1.5" fill="white" opacity="0.6" />
      <circle cx="6" cy="-7" r="1.5" fill="white" opacity="0.6" />

      {/* Nose */}
      <ellipse cx="0" cy="-1" rx="2" ry="2.5" fill="#6a5a3a" />

      {/* Mouth */}
      {expression === 'happy' && (
        <path d="M-4 2 Q0 5 4 2" stroke="#6a5a3a" strokeWidth="1.5" fill="none" />
      )}
      {expression === 'sad' && (
        <path d="M-4 3 Q0 1 4 3" stroke="#6a5a3a" strokeWidth="1.5" fill="none" />
      )}
      {expression === 'neutral' && (
        <line x1="-3" y1="2" x2="3" y2="2" stroke="#6a5a3a" strokeWidth="1.5" />
      )}
      {expression === 'surprised' && (
        <ellipse cx="0" cy="2" rx="2" ry="3" fill="#6a5a3a" opacity="0.3" />
      )}

      {/* Whiskers */}
      <line x1="-16" y1="-3" x2="-10" y2="-2" stroke="#6a5a3a" strokeWidth="1" />
      <line x1="-16" y1="0" x2="-10" y2="0" stroke="#6a5a3a" strokeWidth="1" />
      <line x1="-16" y1="3" x2="-10" y2="2" stroke="#6a5a3a" strokeWidth="1" />
      <line x1="16" y1="-3" x2="10" y2="-2" stroke="#6a5a3a" strokeWidth="1" />
      <line x1="16" y1="0" x2="10" y2="0" stroke="#6a5a3a" strokeWidth="1" />
      <line x1="16" y1="3" x2="10" y2="2" stroke="#6a5a3a" strokeWidth="1" />

      {/* Front paws */}
      <ellipse cx="-8" cy="30" rx="5" ry="6" fill="#a07855" />
      <ellipse cx="8" cy="30" rx="5" ry="6" fill="#a07855" />

      {/* Tail */}
      <path d="M-15 20 Q-25 15 -28 8" stroke="#8a6845" strokeWidth="6" fill="none" strokeLinecap="round" />
    </g>
  );
}
