'use client';
import Image from 'next/image';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { channels as initialChannels, type Channel, type Program } from '@/data/mock-youtube-data';
import { timeToMinutes } from '@/lib/utils';
import { GUIDE_START_HOUR, GUIDE_END_HOUR, PIXELS_PER_MINUTE } from '@/data/constants';
import TimeBar from '@/components/TimeBar';
import ProgramItem from '@/components/ProgramItem';
import VideoPlayer from '@/components/VideoPlayer';
import CurrentTimeIndicator from '@/components/CurrentTimeIndicator';

interface TVGuideProps {
  showFavoritesOnly: boolean;
  searchQuery: string;
}

export default function TVGuide({ showFavoritesOnly, searchQuery }: TVGuideProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const favoriteChannels = useMemo(() => {
    const channelIds = new Set<string>();
    if (!showFavoritesOnly) return channelIds;

    for (const channel of initialChannels) {
      for (const program of channel.programs) {
        if (favorites.has(program.id)) {
          channelIds.add(channel.id);
          break;
        }
      }
    }
    return channelIds;
  }, [favorites, showFavoritesOnly]);

  const displayedChannels = useMemo(() => {
    let channels = initialChannels;

    if (showFavoritesOnly) {
      channels = channels.filter(c => favoriteChannels.has(c.id));
    }

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      channels = channels.filter(channel => 
        channel.name.toLowerCase().includes(lowercasedQuery) || 
        channel.programs.some(program => program.title.toLowerCase().includes(lowercasedQuery))
      ).map(channel => {
        // If the channel name matches, show all its programs
        if (channel.name.toLowerCase().includes(lowercasedQuery)) {
            return channel;
        }
        // Otherwise, filter to show only matching programs
        return {
            ...channel,
            programs: channel.programs.filter(program => program.title.toLowerCase().includes(lowercasedQuery)),
        };
      });
    }

    return channels;
  }, [initialChannels, showFavoritesOnly, favoriteChannels, searchQuery]);

  return (
    <>
      <div className="flex-1 overflow-x-auto overflow-y-auto" ref={scrollContainerRef}>
        <div className="relative" style={{ width: totalGuideWidth }}>
          <TimeBar />
          <div className="relative">
            {displayedChannels.map(channel => (
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
            ))}
             <CurrentTimeIndicator />
          </div>
        </div>
      </div>
      <VideoPlayer videoId={selectedVideoId} onClose={() => setSelectedVideoId(null)} />
    </>
  );
}
