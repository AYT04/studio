'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import TVGuide from '@/components/TVGuide';

export default function Home() {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <Header
        showFavoritesOnly={showFavoritesOnly}
        onShowFavoritesOnlyChange={setShowFavoritesOnly}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TVGuide showFavoritesOnly={showFavoritesOnly} />
      </main>
    </div>
  );
}
