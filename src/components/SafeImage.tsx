import React, { useState, useEffect } from 'react';
import { Mountain, Image as ImageIcon } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  containerClassName?: string;
}

const DEFAULT_FALLBACK = 'https://upload.wikimedia.org/wikipedia/commons/7/70/BilaspurCityHimachal.jpg';

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [triedFallback, setTriedFallback] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setTriedFallback(false);
  }, [src]);

  const handleError = () => {
    if (!triedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
      setTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-tr from-stone-800 via-stone-700 to-emerald-950 flex flex-col items-center justify-center text-stone-300 p-4 text-center ${containerClassName}`}
      >
        <Mountain className="w-8 h-8 text-emerald-400/80 mb-2" />
        <span className="text-xs font-semibold text-stone-200 line-clamp-1">{alt}</span>
        <span className="text-[10px] text-stone-400 mt-0.5">Bilaspur, Himachal Pradesh</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      loading="lazy"
      className={className}
      {...props}
    />
  );
};
