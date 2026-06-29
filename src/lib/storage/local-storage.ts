export const localStorageService = {
  get<TValue>(key: string): TValue | null {
    if (typeof window === "undefined") {
      return null;
    }

    const item = window.localStorage.getItem(key);

    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item) as TValue;
    } catch {
      return null;
    }
  },

  set<TValue>(key: string, value: TValue): void {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key: string): void {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.removeItem(key);
  },
};
