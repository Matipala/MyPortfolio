export const savetoStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
};
