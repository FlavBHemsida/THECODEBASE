import { motion } from 'framer-motion';

interface TimelineTransitionProps {
  fromIndex: number;
  toIndex: number;
  totalYears: number;
  fromYear: string;
  toYear: string;
  duration?: number; // seconds for the pin travel
}

/**
 * Full-screen timeline shown between year changes.
 * The pin animates from the previous year's position to the next,
 * and the year label morphs from `fromYear` to `toYear` while moving.
 */
const TimelineTransition = ({
  fromIndex,
  toIndex,
  totalYears,
  fromYear,
  toYear,
  duration = 1.6,
}: TimelineTransitionProps) => {
  const width = 600;
  const height = 120;

  const xFor = (i: number) =>
    80 + (i / Math.max(totalYears - 1, 1)) * (width - 160);

  const pinFromX = xFor(fromIndex);
  const pinToX = xFor(toIndex);

  // Squiggly path that flattens near both pin positions
  const generatePath = () => {
    const segments: string[] = [`M 20 ${height / 2}`];
    const steps = 30;
    const pinAProgress = (pinFromX - 20) / (width - 40);
    const pinBProgress = (pinToX - 20) / (width - 40);
    const straightZone = 0.06;

    for (let i = 1; i <= steps; i++) {
      const progress = i / steps;
      const x = 20 + progress * (width - 40);
      const distA = Math.abs(progress - pinAProgress);
      const distB = Math.abs(progress - pinBProgress);
      const minDist = Math.min(distA, distB);
      const amplitude =
        minDist < straightZone ? 0 : Math.sin(minDist * Math.PI) * 18;
      const y = height / 2 + Math.sin(progress * Math.PI * 4) * amplitude;
      segments.push(`L ${x} ${y}`);
    }
    return segments.join(' ');
  };

  const path = generatePath();
  const isSame = fromIndex === toIndex;

  // Compute the y-coordinate along our generated path for any x.
  // Mirrors the math in generatePath() so the pin rides the squiggle exactly.
  const yAtX = (x: number) => {
    const pinAProgress = (pinFromX - 20) / (width - 40);
    const pinBProgress = (pinToX - 20) / (width - 40);
    const straightZone = 0.06;
    const progress = (x - 20) / (width - 40);
    const distA = Math.abs(progress - pinAProgress);
    const distB = Math.abs(progress - pinBProgress);
    const minDist = Math.min(distA, distB);
    const amplitude =
      minDist < straightZone ? 0 : Math.sin(minDist * Math.PI) * 18;
    return height / 2 + Math.sin(progress * Math.PI * 4) * amplitude;
  };

  // Build keyframe arrays so the pin follows the curve, not a straight line.
  const sampleCount = 40;
  const xKeyframes: number[] = [];
  const yKeyframes: number[] = [];
  for (let i = 0; i <= sampleCount; i++) {
    const t = i / sampleCount;
    const x = pinFromX + (pinToX - pinFromX) * t;
    xKeyframes.push(x);
    yKeyframes.push(yAtX(x));
  }
  // For label: same x, but offset above the curve
  const labelYKeyframes = yKeyframes.map((y) => y - 24);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-30 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-2xl">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ overflow: 'visible' }}>
          {/* Glow underline */}
          <motion.path
            d={path}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="10"
            strokeLinecap="round"
            style={{ filter: 'blur(5px)' }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          {/* Main line */}
          <motion.path
            d={path}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />

          {/* Arrow tip */}
          <motion.polygon
            points={`${width - 10},${height / 2 - 8} ${width + 5},${height / 2} ${width - 10},${height / 2 + 8}`}
            fill="rgba(255,255,255,0.55)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          />

          {/* Animated pin riding the squiggly path from prev → next */}
          <motion.circle
            r="11"
            fill="#ff612b"
            stroke="white"
            strokeWidth="3"
            style={{ filter: 'drop-shadow(0 0 12px rgba(255,97,43,0.8))' }}
            initial={{ cx: pinFromX, cy: yAtX(pinFromX) }}
            animate={{
              cx: isSame ? pinFromX : xKeyframes,
              cy: isSame ? yAtX(pinFromX) : yKeyframes,
            }}
            transition={{ delay: 0.85, duration, ease: 'easeInOut' }}
          />
          <motion.circle
            r="4"
            fill="white"
            initial={{ cx: pinFromX, cy: yAtX(pinFromX) }}
            animate={{
              cx: isSame ? pinFromX : xKeyframes,
              cy: isSame ? yAtX(pinFromX) : yKeyframes,
            }}
            transition={{ delay: 0.85, duration, ease: 'easeInOut' }}
          />

          {/* Year label that follows the pin along the curve and crossfades from → to */}
          <motion.text
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="800"
              fontFamily="'Barlow Condensed', sans-serif"
              initial={{ opacity: 0, x: pinFromX, y: yAtX(pinFromX) - 24 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: isSame ? pinFromX : xKeyframes,
                y: isSame ? yAtX(pinFromX) - 24 : labelYKeyframes,
              }}
              transition={{
                delay: 0.6,
                duration: duration + 0.5,
                opacity: { times: [0, 0.15, 0.5, 0.7], duration: duration + 0.5 },
                x: { delay: 0.85, duration, ease: 'easeInOut' },
                y: { delay: 0.85, duration, ease: 'easeInOut' },
              }}
            >
              {fromYear}
            </motion.text>
            <motion.text
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="800"
              fontFamily="'Barlow Condensed', sans-serif"
              initial={{ opacity: 0, x: pinFromX, y: yAtX(pinFromX) - 24 }}
              animate={{
                opacity: [0, 0, 1, 1],
                x: isSame ? pinFromX : xKeyframes,
                y: isSame ? yAtX(pinFromX) - 24 : labelYKeyframes,
              }}
              transition={{
                delay: 0.6,
                duration: duration + 0.5,
                opacity: { times: [0, 0.55, 0.75, 1], duration: duration + 0.5 },
                x: { delay: 0.85, duration, ease: 'easeInOut' },
                y: { delay: 0.85, duration, ease: 'easeInOut' },
              }}
            >
              {toYear}
            </motion.text>
        </svg>
      </div>
    </motion.div>
  );
};

export default TimelineTransition;