import {useEffect, useState} from "react";

function useLocalState(defaultValue, key) {
    const [value, setValue] = useState(() => {
        const localStorageValue = localStorage.getItem(key);
        try {
            return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue;
        } catch (e) {
            // If JSON.parse fails, return the raw value (JWT or other non-JSON string)
            return localStorageValue || defaultValue;
        }
    });

    useEffect(() => {
        // Check if the value is an object or an array, and stringify it. Otherwise, store it as it is.
        const valueToStore = typeof value === "object" ? JSON.stringify(value) : value;
        localStorage.setItem(key, valueToStore);
    }, [key, value]);

    return [value, setValue];
}

export {useLocalState}