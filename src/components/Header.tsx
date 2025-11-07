'use client';
import { Search, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Logo } from '@/components/icons';

interface HeaderProps {
  showFavoritesOnly: boolean;
  onShowFavoritesOnlyChange: (checked: boolean) => void;
}

export default function Header({ showFavoritesOnly, onShowFavoritesOnlyChange }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border shrink-0 z-40 bg-background">
      <div className="flex items-center gap-3">
        <Logo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-headline font-bold text-foreground">TubeGuide</h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative w-48 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search channels..." className="pl-10 bg-muted border-muted-foreground/20" />
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="favorites-toggle" 
            checked={showFavoritesOnly} 
            onCheckedChange={onShowFavoritesOnlyChange} 
            aria-label="Show favorites only"
          />
          <Label htmlFor="favorites-toggle" className="flex items-center gap-2 cursor-pointer">
            <Star className={`h-5 w-5 transition-colors ${showFavoritesOnly ? 'text-primary fill-primary' : 'text-muted-foreground'}`}/>
            <span className="hidden md:inline">Favorites</span>
          </Label>
        </div>
      </div>
    </header>
  );
}
