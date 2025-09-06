// src/ai/flows/personalized-task-recommendations.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized task recommendations to users.
 *
 * The flow takes user goals, skill level, and interests as input and returns a list of suggested tasks,
 * missions, and resources tailored to their needs.
 *
 * @exports personalizedTaskRecommendations - The main function to trigger the personalized task recommendation flow.
 * @exports PersonalizedTaskRecommendationsInput - The input type for the personalizedTaskRecommendations function.
 * @exports PersonalizedTaskRecommendationsOutput - The output type for the personalizedTaskRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTaskRecommendationsInputSchema = z.object({
  goals: z
    .string()
    .describe('The user goals, such as career advancement, learning new skills, or improving personal habits.'),
  skillLevel: z
    .string()
    .describe(
      'The user skill level, which can be beginner, intermediate, or advanced. If unsure, select intermediate.'
    ),
  interests: z
    .string()
    .describe('The user interests, such as anime, gaming, reading, or sports.'),
});

export type PersonalizedTaskRecommendationsInput = z.infer<
  typeof PersonalizedTaskRecommendationsInputSchema
>;

const PersonalizedTaskRecommendationsOutputSchema = z.object({
  tasks: z.array(z.string()).describe('A list of personalized task recommendations.'),
  missions: z.array(z.string()).describe('A list of personalized mission recommendations.'),
  resources: z.array(z.string()).describe('A list of personalized resource recommendations.'),
});

export type PersonalizedTaskRecommendationsOutput = z.infer<
  typeof PersonalizedTaskRecommendationsOutputSchema
>;

export async function personalizedTaskRecommendations(
  input: PersonalizedTaskRecommendationsInput
): Promise<PersonalizedTaskRecommendationsOutput> {
  return personalizedTaskRecommendationsFlow(input);
}

const personalizedTaskRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedTaskRecommendationsPrompt',
  input: {schema: PersonalizedTaskRecommendationsInputSchema},
  output: {schema: PersonalizedTaskRecommendationsOutputSchema},
  prompt: `You are a personal development assistant. Your role is to suggest personalized tasks, missions, and resources to users based on their goals, skill level, and interests. Please provide a list of tasks, missions and resources tailored to the user's needs, skill level and interests.

User Goals: {{{goals}}}
User Skill Level: {{{skillLevel}}}
User Interests: {{{interests}}}

Tasks:
- 

Missions:
- 

Resources:
-`, // Added Handlebars syntax
});

const personalizedTaskRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedTaskRecommendationsFlow',
    inputSchema: PersonalizedTaskRecommendationsInputSchema,
    outputSchema: PersonalizedTaskRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedTaskRecommendationsPrompt(input);
    return output!;
  }
);
