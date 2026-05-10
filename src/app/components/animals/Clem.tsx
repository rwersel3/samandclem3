interface ClemProps {
  x?: number;
  y?: number;
  scale?: number;
  expression?: 'happy' | 'neutral' | 'curious';
}

export function Clem({ x = 0, y = 0, scale = 1, expression = 'happy' }: ClemProps) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Body */}
      <ellipse cx="0" cy="30" rx="45" ry="40" fill="#f5f5f0" />

      {/* Calico patch on body left */}
      <ellipse cx="-25" cy="25" rx="18" ry="22" fill="#c9a66b" opacity="0.8" />

      {/* Calico patch on body right */}
      <ellipse cx="30" cy="40" rx="22" ry="18" fill="#e89f71" opacity="0.8" />

      {/* Head */}
      <ellipse cx="0" cy="-5" rx="32" ry="35" fill="#f5f5f0" />

      {/* Calico patch on head */}
      <ellipse cx="12" cy="-15" rx="12" ry="16" fill="#c9a66b" opacity="0.8" />

      {/* Ears - triangular */}
      <path d="M-22 -28 L-28 -45 L-14 -32 Z" fill="#f5f5f0" stroke="#d0d0c8" strokeWidth="1" />
      <path d="M-22 -28 L-26 -38 L-18 -32 Z" fill="#e8c8d8" />

      <path d="M22 -28 L28 -45 L14 -32 Z" fill="#f5f5f0" stroke="#d0d0c8" strokeWidth="1" />
      <path d="M22 -28 L26 -38 L18 -32 Z" fill="#e8c8d8" />

      {/* Eyes */}
      <ellipse cx="-10" cy="-8" rx="4" ry="6" fill="#4a6f82" />
      <ellipse cx="-10" cy="-8" rx="1.5" ry="3" fill="black" />
      <ellipse cx="10" cy="-8" rx="4" ry="6" fill="#4a6f82" />
      <ellipse cx="10" cy="-8" rx="1.5" ry="3" fill="black" />
      <circle cx="-9" cy="-10" r="1.5" fill="white" opacity="0.7" />
      <circle cx="11" cy="-10" r="1.5" fill="white" opacity="0.7" />

      {/* Nose */}
      <path d="M-2 2 L0 5 L2 2 L0 3.5 Z" fill="#e89f71" />

      {/* Mouth */}
      {expression === 'happy' && (
        <>
          <path d="M-8 5 Q0 12 8 5" stroke="#c8a8a8" strokeWidth="2" fill="none" />
          <line x1="0" y1="5" x2="0" y2="9" stroke="#c8a8a8" strokeWidth="2" />
        </>
      )}
      {expression === 'neutral' && (
        <>
          <path d="M-6 5 Q0 8 6 5" stroke="#c8a8a8" strokeWidth="2" fill="none" />
          <line x1="0" y1="5" x2="0" y2="7" stroke="#c8a8a8" strokeWidth="2" />
        </>
      )}
      {expression === 'curious' && (
        <>
          <ellipse cx="0" cy="8" rx="4" ry="5" fill="none" stroke="#c8a8a8" strokeWidth="2" />
          <line x1="0" y1="5" x2="0" y2="7" stroke="#c8a8a8" strokeWidth="2" />
        </>
      )}

      {/* Whiskers */}
      <line x1="-32" y1="-2" x2="-18" y2="-1" stroke="#8a8a7a" strokeWidth="1.5" />
      <line x1="-32" y1="2" x2="-18" y2="2" stroke="#8a8a7a" strokeWidth="1.5" />
      <line x1="-32" y1="6" x2="-18" y2="5" stroke="#8a8a7a" strokeWidth="1.5" />
      <line x1="32" y1="-2" x2="18" y2="-1" stroke="#8a8a7a" strokeWidth="1.5" />
      <line x1="32" y1="2" x2="18" y2="2" stroke="#8a8a7a" strokeWidth="1.5" />
      <line x1="32" y1="6" x2="18" y2="5" stroke="#8a8a7a" strokeWidth="1.5" />

      {/* Front paws */}
      <ellipse cx="-18" cy="65" rx="10" ry="12" fill="#f5f5f0" />
      <ellipse cx="18" cy="65" rx="10" ry="12" fill="#f5f5f0" />

      {/* Paw pads */}
      <circle cx="-18" cy="70" r="3" fill="#e8c8d8" opacity="0.6" />
      <circle cx="18" cy="70" r="3" fill="#e8c8d8" opacity="0.6" />

      {/* Tail - curved and fluffy */}
      <path d="M45 35 Q65 20 68 0 Q70 -10 65 -15" stroke="#f5f5f0" strokeWidth="14" fill="none" strokeLinecap="round" />
      <ellipse cx="62" cy="-12" rx="8" ry="10" fill="#e89f71" opacity="0.6" />
    </g>
  );
}
