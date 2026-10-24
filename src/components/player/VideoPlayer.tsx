'use client';

import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  src: string;
  poster?: string;
}

export function VideoPlayer({ src, poster }: Props) {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      <video
        ref={videoRef}
        key={src}
        src={src}
        poster={poster}
        controls
        className="h-full w-full"
        controlsList="nodownload"
        onLoadedData={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
}