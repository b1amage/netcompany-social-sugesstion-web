import { useCallback, useState, useEffect } from "react";

export const useLocalStorage = (key, value) =>
  useStorage(key, value, window.localStorage);

export const useSessionStorage = (key, value) => {
  return useStorage(key, value, window.sessionStorage);
};

const useStorage = (key, value, storageObject) => {
  const [storageValue, setStorageValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof value === "function") {
      return value();
    }
    return value;
  });

  useEffect(() => {
    if (storageValue === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(storageValue));
  }, [key, storageValue, storageObject]);

  const remove = useCallback(() => {
    setStorageValue(undefined);
  }, []);

  return [storageValue, setStorageValue, remove];
};
