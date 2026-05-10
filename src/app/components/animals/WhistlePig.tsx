interface WhistlePigProps {
  x?: number;
  y?: number;
  scale?: number;
  baby?: boolean;
}

export function WhistlePig({ x = 0, y = 0, scale = 1, baby = false }: WhistlePigProps) {
  const size = baby ? 0.5 : 1;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale * size})`}>
      {/* Body - chunky groundhog */}
      <ellipse cx="0" cy="25" rx="40" ry="35" fill="#8a6845" />

      {/* Head */}
      <ellipse cx="0" cy="-10" rx="28" ry="30" fill="#8a6845" />

      {/* Lighter belly patch */}
      <ellipse cx="0" cy="30" rx="25" ry="22" fill="#a08855" opacity="0.7" />

      {/* Ears - small rounded */}
      <ellipse cx="-18" cy="-22" rx="8" ry="10" fill="#8a6845" />
      <ellipse cx="-18" cy="-22" rx="4" ry="6" fill="#6a5a3a" />
      <ellipse cx="18" cy="-22" rx="8" ry="10" fill="#8a6845" />
      <ellipse cx="18" cy="-22" rx="4" ry="6" fill="#6a5a3a" />

      {/* Eyes */}
      <ellipse cx="-9" cy="-12" rx="4" ry="5" fill="black" />
      <ellipse cx="9" cy="-12" rx="4" ry="5" fill="black" />
      <circle cx="-8" cy="-14" r="2" fill="white" opacity="0.6" />
      <circle cx="10" cy="-14" r="2" fill="white" opacity="0.6" />

      {/* Nose - prominent */}
      <ellipse cx="0" cy="-2" rx="5" ry="4" fill="#6a5a3a" />

      {/* Mouth */}
      <path d="M-6 2 Q0 5 6 2" stroke="#6a5a3a" strokeWidth="1.5" fill="none" />

      {/* Front teeth */}
      <rect x="-4" y="3" width="3" height="5" fill="#f5f5e8" rx="0.5" />
      <rect x="1" y="3" width="3" height="5" fill="#f5f5e8" rx="0.5" />

      {/* Whiskers */}
      <line x1="-28" y1="-5" x2="-16" y2="-4" stroke="#6a5a3a" strokeWidth="1.2" />
      <line x1="-28" y1="0" x2="-16" y2="0" stroke="#6a5a3a" strokeWidth="1.2" />
      <line x1="28" y1="-5" x2="16" y2="-4" stroke="#6a5a3a" strokeWidth="1.2" />
      <line x1="28" y1="0" x2="16" y2="0" stroke="#6a5a3a" strokeWidth="1.2" />

      {/* Front paws - chunky */}
      <ellipse cx="-15" cy="55" rx="9" ry="10" fill="#6a5a3a" />
      <ellipse cx="15" cy="55" rx="9" ry="10" fill="#6a5a3a" />

      {/* Claws */}
      <line x1="-18" y1="58" x2="-20" y2="63" stroke="#4a3a2a" strokeWidth="2" />
      <line x1="-15" y1="60" x2="-16" y2="65" stroke="#4a3a2a" strokeWidth="2" />
      <line x1="-12" y1="58" x2="-12" y2="63" stroke="#4a3a2a" strokeWidth="2" />

      <line x1="18" y1="58" x2="20" y2="63" stroke="#4a3a2a" strokeWidth="2" />
      <line x1="15" y1="60" x2="16" y2="65" stroke="#4a3a2a" strokeWidth="2" />
      <line x1="12" y1="58" x2="12" y2="63" stroke="#4a3a2a" strokeWidth="2" />

      {/* Tail - bushy */}
      <ellipse cx="-35" cy="20" rx="10" ry="14" fill="#6a5a3a" />
    </g>
  );
}
