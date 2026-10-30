/**
 * Privacy-conscious Recently Viewed Deliverables Store
 */

const STORAGE_KEY = 'kinetiq_recently_viewed';

export interface RecentlyViewedItem {
  id: string;
  title: string;
  startingPrice: number;
  imageUrl: string;
  category: string;
  authorName: string;
  viewedAt: number;
}

export function getRecentlyViewed(): RecentlyViewedItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(item: Omit<RecentlyViewedItem, 'viewedAt'>): RecentlyViewedItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getRecentlyViewed();
    const filtered = existing.filter((i) => i.id !== item.id);
    const updated = [{ ...item, viewedAt: Date.now() }, ...filtered].slice(0, 6);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearRecentlyViewed(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
