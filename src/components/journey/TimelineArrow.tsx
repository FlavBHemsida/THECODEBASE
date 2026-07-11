import { motion } from 'framer-motion';

interface TimelineArrowProps {
  yearIndex: number;
  totalYears: number;
  year: string;
}

const TimelineArrow = ({ yearIndex, totalYears, year }: TimelineArrowProps) => {
  // Generate a squiggly path for the timeline
  const width = 600;
  const height = 120;
  const pinX = 80 + (yearIndex / Math.max(totalYears - 1, 1)) * (width - 160);

  // Create squiggly path that straightens at pin points
  const generatePath = () => {
    const segments: string[] = [];
    segments.push(`M 20 ${height / 2}`);

    const steps = 20;
    for (let i = 1; i <= steps; i++) {
      const x = 20 + (i / steps) * (width - 40);
      const progress = i / steps;

      // Determine distance from any pin point
      const pinProgress = (pinX - 20) / (width - 40);
      const distFromPin = Math.abs(progress - pinProgress);
      const straightZone = 0.08;

      // Amplitude: 0 near pins, wavy between
      const amplitude = distFromPin < straightZone
        ? 0
        : Math.sin(distFromPin * Math.PI) * 18;

      const y = height / 2 + Math.sin(progress * Math.PI * 4) * amplitude;
      segments.push(`L ${x} ${y}`);
    }

    return segments.join(' ');
  };

  const path = generatePath();

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ overflow: 'visible' }}>
      {/* Squiggly line */}
      <motion.path
        d={path}
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* Glow line */}
      <motion.path
        d={path}
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="8"
        strokeLinecap="round"
        style={{ filter: 'blur(4px)' }}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* Pin point */}
      <motion.circle
        cx={pinX}
        cy={height / 2}
        r="10"
        fill="#ff612b"
        stroke="white"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.4, type: 'spring' }}
        style={{ filter: 'drop-shadow(0 0 10px rgba(255,97,43,0.6))' }}
      />

      {/* Inner dot */}
      <motion.circle
        cx={pinX}
        cy={height / 2}
        r="4"
        fill="white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, duration: 0.3, type: 'spring' }}
      />

      {/* Year label above pin */}
      <motion.text
        x={pinX}
        y={height / 2 - 22}
        textAnchor="middle"
        fill="white"
        fontSize="18"
        fontWeight="800"
        fontFamily="'Barlow Condensed', sans-serif"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        {year}
      </motion.text>

      {/* Arrow tip at end */}
      <motion.polygon
        points={`${width - 10},${height / 2 - 8} ${width + 5},${height / 2} ${width - 10},${height / 2 + 8}`}
        fill="rgba(255,255,255,0.4)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      />
    </svg>
  );
};

export default TimelineArrow;
