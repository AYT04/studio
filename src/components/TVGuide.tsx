'use client';
import Image from 'next/image';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { type Channel, type Program } from '@/data/mock-youtube-data';
import { timeToMinutes } from '@/lib/utils';
import { GUIDE_START_HOUR, GUIDE_END_HOUR, PIXELS_PER_MINUTE } from '@/data/constants';
import TimeBar from '@/components/TimeBar';
import ProgramItem from '@/components/ProgramItem';
import VideoPlayer from '@/components/VideoPlayer';
import CurrentTimeIndicator from '@/components/CurrentTimeIndicator';
import { searchYoutube } from '@/ai/flows/youtube-flow';

interface TVGuideProps {
  showFavoritesOnly: boolean;
  searchQuery: string;
}

export default function TVGuide({ showFavoritesOnly, searchQuery }: TVGuideProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('tubeGuideFavorites');
      if (storedFavorites) {
        setFavorites(new Set(JSON.parse(storedFavorites)));
      }
    } catch (error) {
      console.error("Could not load favorites from localStorage", error);
    }
  }, []);

  useEffect(() => {
    const fetchChannels = async () => {
      setIsLoading(true);
      try {
        const results = await searchYoutube({ query: searchQuery });
        setChannels(results);
      } catch (error) {
        console.error("Error fetching YouTube data:", error);
        setChannels([]); // Clear channels on error
      } finally {
        setIsLoading(false);
      }
    };

    // Use a timeout to debounce the search
    const handler = setTimeout(() => {
        fetchChannels();
    }, 300); // 300ms delay

    return () => {
        clearTimeout(handler);
    };
  }, [searchQuery]);


  useEffect(() => {
    if (scrollContainerRef.current) {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const guideStartMinutes = GUIDE_START_HOUR * 60;
      const minutesFromStart = currentMinutes - guideStartMinutes;
      const scrollOffset = 200; // to center the current time a bit
      const scrollPosition = Math.max(0, minutesFromStart * PIXELS_PER_MINUTE - scrollOffset);

      scrollContainerRef.current.scrollLeft = scrollPosition;
    }
  }, []);


  const toggleFavorite = (programId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(programId)) {
        newFavorites.delete(programId);
      } else {
        newFavorites.add(programId);
      }
      try {
        localStorage.setItem('tubeGuideFavorites', JSON.stringify(Array.from(newFavorites)));
      } catch (error) {
        console.error("Could not save favorites to localStorage", error);
      }
      return newFavorites;
    });
  };

  const handleProgramClick = (videoId: string) => {
    setSelectedVideoId(videoId);
  };
  
  const totalGuideMinutes = (GUIDE_END_HOUR - GUIDE_START_HOUR) * 60;
  const totalGuideWidth = totalGuideMinutes * PIXELS_PER_MINUTE;

  const displayedChannels = useMemo(() => {
    if (!showFavoritesOnly) {
      return channels;
    }
    
    return channels.filter(channel => 
      channel.programs.some(program => favorites.has(program.id))
    );

  }, [channels, showFavoritesOnly, favorites]);

  return (
    <>
      <div className="flex-1 overflow-x-auto overflow-y-auto" ref={scrollContainerRef}>
        <div className="relative" style={{ width: totalGuideWidth }}>
          <TimeBar />
          <div className="relative">
            {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-50">
                    <p>Loading channels...</p>
                </div>
            ) : displayedChannels.length > 0 ? (
              displayedChannels.map(channel => (
                <div key={channel.id} className="flex items-stretch h-24 border-t border-border bg-background">
                  <div className="sticky left-0 z-20 flex-shrink-0 w-48 p-2 bg-background border-r border-border flex items-center">
                    <div className="flex items-center gap-2">
                      <Image
                        src={channel.logoUrl}
                        alt={`${channel.name} logo`}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                        data-ai-hint="logo"
                      />
                      <span className="font-bold text-sm text-foreground truncate">{channel.name}</span>
                    </div>
                  </div>
                  <div className="relative flex-1 min-w-0">
                    {channel.programs.map(program => (
                      <ProgramItem
                        key={program.id}
                        program={program}
                        onProgramClick={handleProgramClick}
                        isFavorite={favorites.has(program.id)}
                        onFavoriteToggle={toggleFavorite}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <p>No channels found for your search.</p>
                </div>
            )}
            <CurrentTimeIndicator />
          </div>
        </div>
      </div>
      <VideoPlayer videoId={selectedVideoId} onClose={() => setSelectedVideoId(null)} />
    </>
  );
}
