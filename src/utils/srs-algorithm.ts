import { ReviewStatus, SRSRating } from '../types';

// Intervals in minutes
const INTERVALS = [
    0,      // Level 0: New
    1,      // Level 1: 1 min
    10,     // Level 2: 10 min
    60 * 12, // Level 3: 12 hours
    24 * 60, // Level 4: 1 day
    2 * 24 * 60, // Level 5: 2 days
    4 * 24 * 60, // Level 6: 4 days
    7 * 24 * 60, // Level 7: 7 days
    15 * 24 * 60, // Level 8: 15 days
    30 * 24 * 60, // Level 9: 30 days
];

export const calculateNextReview = (currentStatus: ReviewStatus, rating: SRSRating): ReviewStatus => {
    let newLevel = currentStatus.level;
    const now = Date.now();

    switch (rating) {
        case 'again':
            newLevel = 1; // Reset to first step
            break;
        case 'hard':
            // If it was already high, maybe drop it a bit? Or just keep it.
            // Let's keep it but maybe reduce slightly if > 2
            newLevel = Math.max(1, Math.floor(newLevel * 0.8));
            break;
        case 'good':
            newLevel = Math.min(INTERVALS.length - 1, newLevel + 1);
            break;
        case 'easy':
            newLevel = Math.min(INTERVALS.length - 1, newLevel + 2);
            break;
    }

    // Calculate next review time
    const intervalMinutes = INTERVALS[newLevel];
    const nextReview = now + intervalMinutes * 60 * 1000;

    return {
        ...currentStatus,
        level: newLevel,
        nextReview,
        lastReview: now,
        history: [...currentStatus.history, now]
    };
};

export const getInitialReviewStatus = (symbol: string): ReviewStatus => ({
    symbol,
    level: 0,
    nextReview: 0, // 0 means "due immediately" or "new"
    lastReview: 0,
    history: []
});

export const getDueItems = (items: ReviewStatus[]): { due: ReviewStatus[], newItems: ReviewStatus[] } => {
    const now = Date.now();
    const due: ReviewStatus[] = [];
    const newItems: ReviewStatus[] = [];

    items.forEach(item => {
        if (item.level === 0) {
            newItems.push(item);
        } else if (item.nextReview <= now) {
            due.push(item);
        }
    });

    return { due, newItems };
};
