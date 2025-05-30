class SavedItems {
    static instance;
    constructor() {
        if (SavedItems.instance) return SavedItems.instance;
        this.items = getFromLocalStorage('savedItems') || [];
        this.subscribers = [];
        SavedItems.instance = this;
    }

    subscribe(fn) {
        this.subscribers.push(fn);
    }

    notify() {
        this.subscribers.forEach(fn => fn(this.items));
    }

    add(item) {
        this.items.push(item);
        this.update();
    }

    remove(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.update();
    }

    update() {
        saveToLocalStorage('savedItems', this.items);
        this.notify();
    }

    getAll() {
        return this.items;
    }
}

export const savedItemsInstance = new SavedItems();


import { saveToLocalStorage, getFromLocalStorage } from './utils/storage.js';
