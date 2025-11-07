'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import TVGuide from '@/components/TVGuide';

export default function Home() {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <Header
        showFavoritesOnly={showFavoritesOnly}
        onShowFavoritesOnlyChange={setShowFavoritesOnly}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TVGuide showFavoritesOnly={showFavoritesOnly} searchQuery={searchQuery} />
      </main>
    </div>
  );
}
