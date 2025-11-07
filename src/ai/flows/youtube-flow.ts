
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
import { channels as mockChannels, type Channel, type Program } from '@/data/mock-youtube-data';

const YoutubeSearchInputSchema = z.object({
  query: z.string().describe('The search query for channels or keywords.'),
});
export type YoutubeSearchInput = z.infer<typeof YoutubeSearchInputSchema>;

const ProgramSchema = z.object({
    id: z.string().describe('A unique identifier for the program, e.g., "p-1-1".'),
    title: z.string().describe('The title of the video.'),
    startTime: z.string().describe('The start time in HH:MM format.'),
    endTime: z.string().describe('The end time in HH:MM format.'),
    videoId: z.string().describe('The YouTube video ID.'),
    description: z.string().describe('A brief description of the video content.'),
});

const ChannelSchema = z.object({
    id: z.string().describe('A unique identifier for the channel, e.g., "ch-1".'),
    name: z.string().describe('The name of the YouTube channel.'),
    logoUrl: z.string().describe('A URL to an Unsplash image for the channel logo.'),
    programs: z.array(ProgramSchema).describe("A list of the channel's 5 newest videos as programs."),
});

const YoutubeSearchOutputSchema = z.array(ChannelSchema);
export type YoutubeSearchOutput = z.infer<typeof YoutubeSearchOutputSchema>;


const youtubeSearchFlow = ai.defineFlow(
  {
    name: 'youtubeSearchFlow',
    inputSchema: YoutubeSearchInputSchema,
    outputSchema: YoutubeSearchOutputSchema,
  },
  async ({query}): Promise<YoutubeSearchOutput> => {
    
    const lowerCaseQuery = query.toLowerCase();

    if (!lowerCaseQuery) {
      return mockChannels.map(channel => ({
        ...channel,
        programs: channel.programs.slice(0, 5)
      }));
    }

    const filteredChannels = mockChannels.filter(channel => {
        const channelMatch = channel.name.toLowerCase().includes(lowerCaseQuery);
        const programMatch = channel.programs.some(program => 
            program.title.toLowerCase().includes(lowerCaseQuery) || 
            program.description.toLowerCase().includes(lowerCaseQuery)
        );
        return channelMatch || programMatch;
    });
    
    return filteredChannels.map(channel => ({
        ...channel,
        programs: channel.programs.slice(0, 5)
    }));
  }
);

export async function searchYoutube(input: YoutubeSearchInput): Promise<YoutubeSearchOutput> {
  const flowResult = await youtubeSearchFlow(input);
  return flowResult;
}
