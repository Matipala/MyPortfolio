import { savedItemsInstance } from '../components/savedItems.js';

export class ToggleFavoriteCommand {
    constructor(blogData, updateCallback) {
        this.blogData = blogData;
        this.updateCallback = updateCallback;
    }

    execute() {
        this.blogData.liked = !this.blogData.liked;
        this.blogData.count += this.blogData.liked ? 1 : -1;
        this.updateCallback();
    }
}
