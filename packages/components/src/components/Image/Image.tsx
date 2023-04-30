import React, { useCallback, useEffect, useState } from 'react';

interface LazyLoadImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  className?: string;
}

function LazyLoadImage({ src, alt, className, ...props }: LazyLoadImageProps) {
  const [imgSrc, setImageSrc] = useState<string | undefined>('');

  const onLoad = useCallback(() => {
    setImageSrc(src);
  }, [src]);

  const onError = useCallback(() => {
    console.error(`failed to load image ${src}`);
  }, [src]);

  useEffect(() => {
    const img: HTMLImageElement = new Image();
    img.src = src as string;
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [src, onLoad, onError]);

  return <img src={imgSrc} alt={alt} className={className} {...props} />;
}

interface ImageProps extends LazyLoadImageProps {
  lazy?: boolean;
}

export default function ImageComponent({
  src,
  alt,
  lazy = false,
  className,
  ...props
}: ImageProps) {
  if (lazy) {
    return (
      <LazyLoadImage src={src} alt={alt} className={className} {...props} />
    );
  }

  return <img src={src} alt={alt} className={className} {...props} />;
}
