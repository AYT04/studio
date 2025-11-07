'use client';
import { Star } from 'lucide-react';
import { type Program } from '@/data/mock-youtube-data';
import { timeToMinutes } from '@/lib/utils';
import { GUIDE_START_HOUR, PIXELS_PER_MINUTE } from '@/data/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProgramItemProps {
  program: Program;
  onProgramClick: (videoId: string) => void;
  isFavorite: boolean;
  onFavoriteToggle: (programId: string) => void;
}

export default function ProgramItem({ program, onProgramClick, isFavorite, onFavoriteToggle }: ProgramItemProps) {
  const startMinutes = timeToMinutes(program.startTime) - GUIDE_START_HOUR * 60;
  const durationMinutes = timeToMinutes(program.endTime) - timeToMinutes(program.startTime);

  const style = {
    left: `${startMinutes * PIXELS_PER_MINUTE}px`,
    width: `${Math.max(0, durationMinutes * PIXELS_PER_MINUTE - 2)}px`,
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(program.id);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="absolute top-2 bottom-2 group cursor-pointer rounded-lg bg-card hover:bg-primary/20 transition-all duration-200 ease-in-out shadow-sm border border-border overflow-hidden flex flex-col justify-between p-2"
            style={style}
            onClick={() => onProgramClick(program.videoId)}
            tabIndex={0}
            role="button"
            aria-label={`Play ${program.title}`}
          >
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-foreground truncate">{program.title}</h3>
              <p className="text-xs text-muted-foreground">{program.startTime} - {program.endTime}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={cn('h-4 w-4 text-muted-foreground', isFavorite && 'fill-primary text-primary')} />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="font-bold">{program.title}</p>
          <p>{program.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
