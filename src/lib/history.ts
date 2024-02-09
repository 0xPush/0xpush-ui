export interface HistoryItem {
  secret: string;
  type: "created" | "viewed";
  date?: Date | unknown;
  onboardingCompleted?: boolean;
}

const KEY = "push-history";

export class PushHistory {
  public static getHistory(): HistoryItem[] {
    try {
      const items = JSON.parse(localStorage.getItem(KEY) as string);
      if (!items || !Array.isArray(items)) {
        return [];
      }
      return items as HistoryItem[];
    } catch (e) {
      return [];
    }
  }

  public static addToHistory(item: HistoryItem): void {
    try {
      const items = this.getHistory();
      const existIndex = items.findIndex((h) => h.secret === item.secret);

      if (items.length > 50) {
        items.unshift(item);
        items.splice(items.length - 1, 1);
        localStorage.setItem(KEY, JSON.stringify(items));
        return;
      }

      if (existIndex !== -1) {
        items.unshift(items.splice(existIndex, 1)[0]);
      } else {
        items.unshift(item);
      }
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch (e) {
      // console.log(e);
    }
  }

  public static setOnboardingCompleted(secret: string): void {
    try {
      const items = this.getHistory().map((item) =>
        item.secret === secret ? { ...item, onboardingCompleted: true } : item
      );

      localStorage.setItem(KEY, JSON.stringify(items));
    } catch (e) {
      // console.log(e);
    }
  }

  public static isOnboardingCompleted(secret: string): boolean {
    try {
      const item = this.getHistory().find((item) => item.secret === secret);

      return item ? !!item.onboardingCompleted : false;
    } catch (e) {
      // console.log(e);
    }
    return false;
  }

  public static clear(): void {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {
      // empty
    }
  }
}
