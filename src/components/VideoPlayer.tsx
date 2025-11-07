'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface VideoPlayerProps {
  videoId: string | null;
  onClose: () => void;
}

export default function VideoPlayer({ videoId, onClose }: VideoPlayerProps) {
  return (
    <Dialog open={!!videoId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-auto aspect-video p-0 border-0 bg-black shadow-2xl shadow-primary/20">
        <DialogTitle className="sr-only">Video Player</DialogTitle>
        {videoId && (
          <iframe
            key={videoId}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        )}
      </DialogContent>
    </Dialog>
  );
}
