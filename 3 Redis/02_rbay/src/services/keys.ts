// Users
export const pageCacheKey = (id: string): string => `pagecache#${id}`;

export const usersKey = (userId: string): string => `users#${userId}`;

export const sessionsKey = (sessionId: string): string => `sessions#${sessionId}`;

export const usernamesUniqueKey = (): string => "usernames:unique";

export const userLikesKey = (userId: string): string => `users:likes#${userId}`;

export const usernamesKey = (): string => "usernames";

// Items
export const itemsKey = (itemId: string): string => `items#${itemId}`;

export const itemsByViewsKey = (): string => "items:views";

export const itemsByEndingAtKey = (): string => "items:endingAt";

export const itemsViewsKey = (itemId: string): string => `items:views#${itemId}`;

export const bidHistoryKey = (itemId: string): string => `history#${itemId}`;

export const itemsByPriceKey = (): string => "items:price";

export const itemsIndexKey = (): string => "idx:items";
