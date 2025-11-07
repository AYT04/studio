import { PlaceHolderImages } from "@/lib/placeholder-images";

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl ?? `https://picsum.photos/seed/${id}/100/100`;

export interface Program {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  videoId: string;
  description: string;
}

export interface Channel {
  id: string;
  name: string;
  logoUrl: string;
  programs: Program[];
}

export const channels: Channel[] = [
  {
    id: 'ch-1',
    name: 'Lofi Girl',
    logoUrl: findImage('ch-logo-lofi'),
    programs: [
      { id: 'p-1-1', title: 'lofi hip hop radio - beats to relax/study to', startTime: '18:00', endTime: '24:00', videoId: 'jfKfPfyJRdk', description: '24/7 live stream of chill beats perfect for studying, relaxing, or focusing.' },
    ],
  },
  {
    id: 'ch-2',
    name: 'freeCodeCamp.org',
    logoUrl: findImage('ch-logo-fcc'),
    programs: [
      { id: 'p-2-1', title: 'SQL & PostgreSQL Tutorial', startTime: '18:00', endTime: '20:30', videoId: 'qw--VYLpxG4', description: 'Learn SQL and PostgreSQL in this full database course for beginners.' },
      { id: 'p-2-2', title: 'Python for Beginners', startTime: '20:30', endTime: '22:00', videoId: 'eWRfhZMgVBI', description: 'A comprehensive Python programming course for all levels.' },
      { id: 'p-2-3', title: 'AI Chatbot in Python', startTime: '22:00', endTime: '23:30', videoId: '13_fS1z2_4Y', description: 'Build your own AI chatbot using Python. A step-by-step guide.' },
    ],
  },
  {
    id: 'ch-3',
    name: 'Marques Brownlee (MKBHD)',
    logoUrl: findImage('ch-logo-mkbhd'),
    programs: [
      { id: 'p-3-1', title: 'The Problem With Foldable Phones!', startTime: '18:30', endTime: '19:00', videoId: '1r-b-Hk_rKM', description: 'Exploring the pros and cons of the latest foldable smartphones on the market.' },
      { id: 'p-3-2', title: 'Dope Tech: The Gold Edition!', startTime: '19:00', endTime: '19:30', videoId: 'Y9t13n_a4iM', description: 'Showcasing some of the most interesting and innovative tech right now.'},
      { id: 'p-3-3', title: 'iPhone 15 Pro Review: The Good & The Bad!', startTime: '20:00', endTime: '20:30', videoId: 'r46P_iSROGA', description: 'An in-depth review of Apple\'s latest flagship phone.' },
      { id: 'p-3-4', title: 'What is Mixed Reality?', startTime: '21:00', endTime: '21:45', videoId: 'qK2aGkRD2pg', description: 'An explainer on mixed reality and the Vision Pro.' },
    ],
  },
  {
    id: 'ch-4',
    name: 'NASA',
    logoUrl: findImage('ch-logo-nasa'),
    programs: [
      { id: 'p-4-1', title: 'NASA Live: Official Stream of NASA TV', startTime: '18:00', endTime: '21:00', videoId: '21X5lGlDOfg', description: 'Live coverage of missions, press conferences, and stunning views from the ISS.' },
      { id: 'p-4-2', title: 'Stunning New Images from James Webb Telescope', startTime: '21:00', endTime: '21:30', videoId: 'xP2z_O-R_sA', description: 'Exploring the latest breathtaking images from the JWST.' },
      { id: 'p-4-3', title: 'Artemis I: We Are Going', startTime: '22:00', endTime: '23:00', videoId: 'CMLD0Lp0JBg', description: 'A look at the historic Artemis I mission, paving the way for future lunar exploration.' },
    ],
  },
  {
    id: 'ch-5',
    name: 'Bon Appétit',
    logoUrl: findImage('ch-logo-ba'),
    programs: [
        { id: 'p-5-1', title: 'Pro Chefs Make Their Favorite Sandwiches', startTime: '18:00', endTime: '18:45', videoId: 'JyH0gW3eFfA', description: 'Watch professional chefs elevate the humble sandwich into a culinary masterpiece.' },
        { id: 'p-5-2', title: 'Making Perfect Fettuccine Alfredo', startTime: '18:45', endTime: '19:30', videoId: 'o-d3sPCtqgQ', description: 'Learn the secrets to a creamy, rich, and perfect Fettuccine Alfredo sauce.' },
        { id: 'p-5-3', title: 'Trying Everything on the Menu at a Michelin Restaurant', startTime: '20:30', endTime: '21:15', videoId: 'u47a4g29w1k', description: 'Join the BA team as they sample an entire menu from a world-renowned restaurant.' },
        { id: 'p-5-4', title: 'Recreating Guy Fieri\'s Trash Can Nachos', startTime: '22:30', endTime: '23:00', videoId: 'fYo2YhC4yB8', description: 'Can our chefs recreate the iconic and over-the-top Trash Can Nachos?' },
    ],
  },
];
