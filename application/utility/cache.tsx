import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const prefix = "cache";
const expiryInMinutes = 5;

interface CacheItem {
  value: any;
  timestamp: number;
}

const store = async (key: string, value: any): Promise<void> => {
  try {
    const item: CacheItem = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item: CacheItem): boolean => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return now.diff(storedTime, "minute") > expiryInMinutes;
};

const get = async (key: string): Promise<any | null> => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item: CacheItem | null = value ? JSON.parse(value) : null;

    if (!item) return null;

    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  store,
  get,
};
