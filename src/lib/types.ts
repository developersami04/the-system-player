export interface Task {
    id: string;
    title: string;
    category: 'Growth' | 'Skills' | 'Health' | 'Creative' | 'Chores';
    completed: boolean;
    dueDate: Date;
}

export interface Mission {
    id: string;
    title: string;
    description: string;
    xp: number;
    progress: number;
}

export interface UserRank {
    rank: number;
    name: string;
    level: number;
    xp: number;
    avatarUrl: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    unlocked: boolean;
}

export interface Reward {
    id: string;
    title: string;
    milestone: string;
    unlocked: boolean;
}
