interface ChipmunkProps {
  x?: number;
  y?: number;
  scale?: number;
}

export function Chipmunk({ x = 0, y = 0, scale = 1 }: ChipmunkProps) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Body */}
      <ellipse cx="0" cy="12" rx="15" ry="12" fill="#c9a66b" />

      {/* Stripes on body */}
      <line x1="-8" y1="8" x2="-8" y2="16" stroke="#8a6845" strokeWidth="2" opacity="0.6" />
      <line x1="0" y1="6" x2="0" y2="18" stroke="#8a6845" strokeWidth="2" opacity="0.6" />
      <line x1="8" y1="8" x2="8" y2="16" stroke="#8a6845" strokeWidth="2" opacity="0.6" />

      {/* Head */}
      <ellipse cx="0" cy="-4" rx="11" ry="10" fill="#c9a66b" />

      {/* Ears - pointed */}
      <ellipse cx="-8" cy="-12" rx="4" ry="6" fill="#c9a66b" />
      <ellipse cx="8" cy="-12" rx="4" ry="6" fill="#c9a66b" />

      {/* Cheek pouches - full */}
      <ellipse cx="-9" cy="-2" rx="6" ry="5" fill="#d4b67b" />
      <ellipse cx="9" cy="-2" rx="6" ry="5" fill="#d4b67b" />

      {/* Eyes */}
      <circle cx="-4" cy="-6" r="2.5" fill="black" />
      <circle cx="4" cy="-6" r="2.5" fill="black" />
      <circle cx="-3" cy="-7" r="1" fill="white" opacity="0.7" />
      <circle cx="5" cy="-7" r="1" fill="white" opacity="0.7" />

      {/* Nose */}
      <ellipse cx="0" cy="-1" rx="2" ry="1.5" fill="#8a6845" />

      {/* Whiskers */}
      <line x1="-15" y1="-3" x2="-10" y2="-2" stroke="#6a5a3a" strokeWidth="0.8" />
      <line x1="-15" y1="0" x2="-10" y2="0" stroke="#6a5a3a" strokeWidth="0.8" />
      <line x1="15" y1="-3" x2="10" y2="-2" stroke="#6a5a3a" strokeWidth="0.8" />
      <line x1="15" y1="0" x2="10" y2="0" stroke="#6a5a3a" strokeWidth="0.8" />

      {/* Front paws */}
      <ellipse cx="-7" cy="22" rx="4" ry="5" fill="#b89670" />
      <ellipse cx="7" cy="22" rx="4" ry="5" fill="#b89670" />

      {/* Bushy tail - upright */}
      <ellipse cx="0" cy="-8" rx="8" ry="16" fill="#a08855" opacity="0.7" transform="rotate(-30 0 -8)" />
      <ellipse cx="2" cy="-18" rx="6" ry="14" fill="#c9a66b" opacity="0.8" transform="rotate(-25 2 -18)" />
    </g>
  );
}
