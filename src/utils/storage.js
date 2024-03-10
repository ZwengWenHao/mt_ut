const STORAGE_PREFIX = 'comp';
const setStorageKey = (key) => `${STORAGE_PREFIX}:${key}`;
// 永久储存
export const Local = {
  setKey(key) {
    return `${STORAGE_PREFIX}:${key}`;
  },
  set(key, val) {
    try {
      localStorage.setItem(setStorageKey(key), JSON.stringify(val));
    } catch (error) {
      console.error('Local storage set error:', error);
    }
  },
  get(key) {
    try {
      const item = localStorage.getItem(setStorageKey(key));
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Local storage get error:', error);
      return null;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(setStorageKey(key));
    } catch (error) {
      console.error('Local storage remove error:', error);
    }
  },
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Local storage clear error:', error);
    }
  },
};
// 临时储存
export const Session = {
  set(key, val) {
    try {
      sessionStorage.setItem(setStorageKey(key), JSON.stringify(val));
    } catch (error) {
      console.error('Session storage set error:', error);
    }
  },
  get(key) {
    try {
      const item = sessionStorage.getItem(setStorageKey(key));
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Session storage get error:', error);
      return null;
    }
  },
  remove(key) {
    try {
      sessionStorage.removeItem(setStorageKey(key));
    } catch (error) {
      console.error('Session storage remove error:', error);
    }
  },
  clear() {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Session storage clear error:', error);
    }
  },
};
