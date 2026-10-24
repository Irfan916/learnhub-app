'use client';

export function VideoPlayer({ src, poster }: { src: string; poster?: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
      <video
        key={src}
        src={src}
        poster={poster}
        controls
        className="h-full w-full"
        controlsList="nodownload"
      />
    </div>
  );
}