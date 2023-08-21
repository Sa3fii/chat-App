import { useState } from "react";

const useLocalStorage = (key, defaultValue = null) => {

  const [storedValue, setStoredValue] = useState(
    () => {
      try {
        const value = window.localStorage.getItem(key);
        //if(value) return JSON.parse(value);
        if (key == 'userData') return JSON.parse(value);
        if (value) return value;
        else {
          ////window.localStorage.setItem(key, JSON.stringify(defaultValue));
          return defaultValue;
        }
      } catch (err) {
        return defaultValue;
      }
    }
  );

  const setValue = (newValue) => {
    try {

      //window.localStorage.setItem(key, JSON.stringify(newValue));
      if (newValue && key == 'userData') window.localStorage.setItem(key, JSON.stringify(newValue));
      else if (newValue) window.localStorage.setItem(key, newValue);
      else window.localStorage.removeItem(key);
    } catch (err) { }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;