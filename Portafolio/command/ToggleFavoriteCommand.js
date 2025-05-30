import { savedItemsInstance } from '../components/savedItems.js';

export class ToggleFavoriteCommand {
    constructor(blog) {
        this.blog = blog;
    }

    execute() {
        const currentItems = savedItemsInstance.getAll();
        const exists = currentItems.some(item => item.id === this.blog.id);

        if (exists) {
            savedItemsInstance.remove(this.blog.id);
        } else {
            savedItemsInstance.add(this.blog);
        }
    }
}
