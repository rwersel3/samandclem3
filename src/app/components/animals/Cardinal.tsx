interface CardinalProps {
  x?: number;
  y?: number;
  scale?: number;
  facing?: 'left' | 'right';
}

export function Cardinal({ x = 0, y = 0, scale = 1, facing = 'right' }: CardinalProps) {
  const flip = facing === 'left' ? -1 : 1;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale * flip}, ${scale})`}>
      {/* Body */}
      <ellipse cx="0" cy="5" rx="12" ry="10" fill="#d84848" />

      {/* Head */}
      <ellipse cx="-8" cy="-5" rx="10" ry="9" fill="#d84848" />

      {/* Crest - distinctive cardinal feature */}
      <path d="M-10 -12 Q-8 -18 -6 -14 Q-4 -17 -2 -13 Q0 -16 2 -12" fill="#d84848" />

      {/* Wing */}
      <ellipse cx="3" cy="8" rx="10" ry="7" fill="#b83838" opacity="0.8" />

      {/* Tail */}
      <path d="M10 8 Q18 10 22 8 Q18 6 10 5 Z" fill="#b83838" />

      {/* Eye */}
      <circle cx="-12" cy="-6" r="2.5" fill="black" />
      <circle cx="-11" cy="-7" r="1" fill="white" opacity="0.7" />

      {/* Beak - cone shaped */}
      <path d="M-18 -5 L-12 -3 L-18 -1 Z" fill="#e89f71" />

      {/* Black mask around eye */}
      <path d="M-15 -8 Q-10 -9 -8 -7" fill="black" opacity="0.4" />

      {/* Legs */}
      <line x1="-3" y1="14" x2="-3" y2="20" stroke="#6a5a3a" strokeWidth="1.5" />
      <line x1="3" y1="14" x2="3" y2="20" stroke="#6a5a3a" strokeWidth="1.5" />

      {/* Feet - three toes */}
      <line x1="-3" y1="20" x2="-6" y2="23" stroke="#6a5a3a" strokeWidth="1.5" />
      <line x1="-3" y1="20" x2="-3" y2="23" stroke="#6a5a3a" strokeWidth="1.5" />
      <line x1="-3" y1="20" x2="0" y2="23" stroke="#6a5a3a" strokeWidth="1.5" />

      <line x1="3" y1="20" x2="0" y2="23" stroke="#6a5a3a" strokeWidth="1.5" />
      <line x1="3" y1="20" x2="3" y2="23" stroke="#6a5a3a" strokeWidth="1.5" />
      <line x1="3" y1="20" x2="6" y2="23" stroke="#6a5a3a" strokeWidth="1.5" />
    </g>
  );
}
