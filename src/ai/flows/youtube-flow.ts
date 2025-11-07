
'use server';
/**
 * @fileOverview A flow to simulate fetching YouTube channel and video data.
 *
 * - searchYoutube - A function that simulates a search on YouTube.
 * - YoutubeSearchInput - The input type for the searchYoutube function.
 * - YoutubeSearchOutput - The return type for the searchYoutube function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { channels as mockChannels, type Channel } from '@/data/mock-youtube-data';

const YoutubeSearchInputSchema = z.object({
  query: z.string().describe('The search query for channels or keywords.'),
});
export type YoutubeSearchInput = z.infer<typeof YoutubeSearchInputSchema>;

// We can't define a recursive schema with Zod easily, so we define types manually
// and use z.any() for the schema.
export type YoutubeSearchOutput = Channel[];

const youtubeSearchFlow = ai.defineFlow(
  {
    name: 'youtubeSearchFlow',
    inputSchema: YoutubeSearchInputSchema,
    outputSchema: z.any(),
  },
  async (input): Promise<YoutubeSearchOutput> => {
    // This is a simulation. In a real scenario, you'd call the YouTube Data API here.
    // We'll filter the mock data based on the query.
    console.log(`Simulating YouTube API search for: ${input.query}`);
    if (!input.query) {
      return mockChannels.map(channel => ({
        ...channel,
        programs: channel.programs.slice(0, 5)
      }));
    }

    const lowercasedQuery = input.query.toLowerCase();
    
    const results = mockChannels.filter(channel => 
        channel.name.toLowerCase().includes(lowercasedQuery) || 
        channel.programs.some(program => program.title.toLowerCase().includes(lowercasedQuery))
      ).map(channel => {
        // If the channel name matches, show its latest 5 videos.
        if (channel.name.toLowerCase().includes(lowercasedQuery)) {
            return {
                ...channel,
                programs: channel.programs.slice(0, 5),
            };
        }
        // Otherwise, filter to show only matching programs (up to 5)
        const matchingPrograms = channel.programs.filter(program => program.title.toLowerCase().includes(lowercasedQuery));
        return {
            ...channel,
            programs: matchingPrograms.slice(0, 5),
        };
      });

    return results;
  }
);

export async function searchYoutube(input: YoutubeSearchInput): Promise<YoutubeSearchOutput> {
  const flowResult = await youtubeSearchFlow(input);
  return flowResult;
}
