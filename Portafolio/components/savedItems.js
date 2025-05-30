import { blogs } from '../data/blogs.js';
import { loadFromStorage } from '../utils/storage.js';

class SavedItems {
    static instance;
    constructor() {
        if (SavedItems.instance) return SavedItems.instance;

        const saved = loadFromStorage('savedItems');
        this.items = saved && saved.length > 0 ? saved : blogs;
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

    updateAll(newItems) {
        this.items = newItems;
        this.update();
    }
}

export const savedItemsInstance = new SavedItems();
