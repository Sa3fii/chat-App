import { useState } from "react";

const useNotification = (key, defaultValue = null) => {

    const [storedValue, setStoredValue] = useState(
        () => {
            try {
                const value = window.localStorage.getItem(key);
                if (value) return JSON.parse(value);
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
        let notifList = []
        try {
            const value = JSON.parse(window.localStorage.getItem(key))

            if (value && value.length !== 0) {
                const idx = value.findIndex((elmnt) => elmnt.id == newValue);

                if (idx !== -1) {
                    const newNotif = { id: newValue, count: value[idx].count + 1 }
                    notifList = value

                    notifList.splice(idx, 1)
                    notifList.push(newNotif)
                    window.localStorage.setItem(key, JSON.stringify(notifList));
                } else if (!idx) {
                    notifList.push({ id: newValue, count: 1 })
                    window.localStorage.setItem(key, JSON.stringify(notifList));
                }


            } else if (!value) {

                notifList.push({ id: newValue, count: 1 })
                window.localStorage.setItem(key, JSON.stringify(notifList));
            }

        } catch (err) { }

        setStoredValue(notifList);
    };

    const setReadValue = (friendID) => {
        let notifList = []
        try {

            const value = JSON.parse(window.localStorage.getItem(key))

            if (value && value.length !== 0) {
                const idx = value.findIndex((elmnt) => elmnt.id == friendID);

                if (idx !== -1) {
                    notifList = value;
                    notifList.splice(idx, 1);
                    notifList.length !== 0 ? window.localStorage.setItem(key, JSON.stringify(notifList)) : window.localStorage.removeItem(key);
                }
            }

        } catch (error) {

        }
        setStoredValue(notifList);
    }

    return [storedValue, setValue, setReadValue];
};

export default useNotification;