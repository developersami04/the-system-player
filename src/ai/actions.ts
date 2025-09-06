'use server';

import {
  personalizedTaskRecommendations,
  type PersonalizedTaskRecommendationsInput,
  type PersonalizedTaskRecommendationsOutput,
} from './flows/personalized-task-recommendations';

export async function getPersonalizedRecommendations(
  input: PersonalizedTaskRecommendationsInput
): Promise<PersonalizedTaskRecommendationsOutput | { error: string }> {
  try {
    const output = await personalizedTaskRecommendations(input);
    return output;
  } catch (error) {
    console.error('Error getting personalized recommendations:', error);
    return { error: 'Failed to get recommendations. Please try again later.' };
  }
}
