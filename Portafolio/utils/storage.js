export const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromStorage = (key) => {
    const json = localStorage.getItem(key);
    if (!json) return null;
    try {
        return JSON.parse(json);
    } catch (error) {
        console.error('Error parsing JSON from localStorage for key', key);
        return null;
    }
};

export const removeFromStorage = (key) => {
    localStorage.removeItem(key);
};
