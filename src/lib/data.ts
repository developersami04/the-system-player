import type { Task, Mission, UserRank, Achievement, Reward } from './types';

export const dailyTasks: Omit<Task, 'dueDate'>[] = [
  { id: '1', title: 'Read 30 pages of a book', category: 'Growth', completed: true },
  { id: '2', title: 'Complete a coding challenge', category: 'Skills', completed: false },
  { id: '3', title: 'Go for a 20-minute run', category: 'Health', completed: false },
  { id: '4', title: 'Practice drawing for 15 minutes', category: 'Creative', completed: true },
];

export const allTasks: Task[] = [
    { id: '1', title: 'Read 30 pages of a book', category: 'Growth', completed: true, dueDate: new Date() },
    { id: '2', title: 'Complete a coding challenge', category: 'Skills', completed: false, dueDate: new Date() },
    { id: '3', title: 'Go for a 20-minute run', category: 'Health', completed: false, dueDate: new Date(new Date().getTime() + 86400000) },
    { id: '4', title: 'Practice drawing for 15 minutes', category: 'Creative', completed: true, dueDate: new Date() },
    { id: '5', title: 'Learn a new song on an instrument', category: 'Creative', completed: false, dueDate: new Date(new Date().getTime() + 2 * 86400000) },
    { id: '6', title: 'Finish a module in an online course', category: 'Skills', completed: true, dueDate: new Date() },
    { id: '7', title: 'Meditate for 10 minutes', category: 'Health', completed: false, dueDate: new Date() },
  ];

export const currentMissions: Mission[] = [
  {
    id: 'm1',
    title: 'The Path of Knowledge',
    description: 'Read 3 books on a new subject.',
    xp: 500,
    progress: 33,
  },
  {
    id: 'm2',
    title: 'Code Warrior\'s Ascent',
    description: 'Solve 20 medium-level coding problems.',
    xp: 1000,
    progress: 75,
  },
  {
    id: 'm3',
    title: 'Fitness Challenger',
    description: 'Complete 10 workout sessions in a month.',
    xp: 750,
    progress: 50,
  },
];

export const allMissions: Omit<Mission, 'progress'>[] = [
    ...currentMissions,
    {
      id: 'm4',
      title: 'Creative Spark',
      description: 'Create 5 unique pieces of art.',
      xp: 600,
    },
    {
      id: 'm5',
      title: 'Language Novice',
      description: 'Learn 100 basic words in a new language.',
      xp: 400,
    },
    {
        id: 'm6',
        title: 'Project Finisher',
        description: 'Complete a personal project from start to finish.',
        xp: 1500,
    }
];

export const rankings: UserRank[] = [
  { rank: 1, name: 'Shadow Monarch', level: 99, xp: 999999, avatarUrl: 'https://picsum.photos/100?a=1' },
  { rank: 2, name: 'Flame Alchemist', level: 95, xp: 950123, avatarUrl: 'https://picsum.photos/100?a=2' },
  { rank: 3, name: 'Player One', level: 94, xp: 940000, avatarUrl: 'https://picsum.photos/100' },
  { rank: 4, name: 'Silent Hunter', level: 92, xp: 923456, avatarUrl: 'https://picsum.photos/100?a=4' },
  { rank: 5, name: 'Code Breaker', level: 90, xp: 901234, avatarUrl: 'https://picsum.photos/100?a=5' },
  { rank: 6, name: 'Artisan Soul', level: 88, xp: 880000, avatarUrl: 'https://picsum.photos/100?a=6' },
  { rank: 7, name: 'Agile Runner', level: 85, xp: 854321, avatarUrl: 'https://picsum.photos/100?a=7' },
  { rank: 8, name: 'Newbie Hero', level: 12, xp: 12500, avatarUrl: 'https://picsum.photos/100?a=8' },
];

export const achievements: Achievement[] = [
    { id: 'a1', title: 'First Step', description: 'Complete your first task.', unlocked: true },
    { id: 'a2', title: 'Task Slayer', description: 'Complete 10 tasks.', unlocked: true },
    { id: 'a3', title: 'Mission Accepted', description: 'Start your first mission.', unlocked: true },
    { id: 'a4', title: 'Level Up!', description: 'Reach level 5.', unlocked: true },
    { id: 'a5', title: 'Bookworm', description: 'Read 1000 pages.', unlocked: true },
    { id: 'a6', title: 'Century Mark', description: 'Complete 100 tasks.', unlocked: false },
    { id: 'a7', title: 'Mission Complete', description: 'Finish your first mission.', unlocked: false },
    { id: 'a8', title: 'Polymath', description: 'Complete a task in 5 different categories.', unlocked: false },
    { id: 'a9', title: 'Specialist', description: 'Complete 25 tasks in a single category.', unlocked: false },
    { id: 'a10', title: 'Top 10 Player', description: 'Reach the top 10 in rankings.', unlocked: false },
    { id: 'a11', title: 'Grandmaster', description: 'Reach level 50.', unlocked: false },
    { id: 'a12', title: 'System Conqueror', description: 'Complete all missions.', unlocked: false },
];

export const rewards: Reward[] = [
    { id: 'r1', title: '20% off System Ascent Pro', milestone: 'Reach Level 10', unlocked: true },
    { id: 'r2', title: 'Exclusive "Ascended" Avatar Frame', milestone: 'Reach Level 25', unlocked: false },
    { id: 'r3', title: '$5 Gift Card for Coffee', milestone: 'Complete 50 tasks', unlocked: false },
    { id: 'r4', title: '30-day trial of Skillshare Premium', milestone: 'Complete "Code Warrior\'s Ascent" mission', unlocked: false },
];
