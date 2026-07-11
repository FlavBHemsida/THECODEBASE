import { ReactNode } from 'react';

interface OffsetImageProps {
  src: string;
  alt: string;
  children?: ReactNode;
  className?: string;
  accentColor?: string;
}

const OffsetImage = ({ src, alt, className = '', accentColor }: OffsetImageProps) => (
  <div className={`relative inline-block ${className}`}>
    <div className={`absolute -bottom-4 -left-4 w-24 h-24 ${accentColor || 'bg-primary'} z-0 rounded-lg rotate-3`} />
    <div className={`absolute -top-3 -right-3 w-16 h-16 ${accentColor === 'bg-accent' ? 'bg-secondary' : 'bg-accent'} z-0 rounded-full opacity-60`} />
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="relative z-10 rounded-xl w-full h-auto object-cover shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
    />
  </div>
);

export default OffsetImage;
