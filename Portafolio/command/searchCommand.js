import { savedItemsInstance } from '../components/savedItems.js';

export class SearchCommand {
    constructor(term) {
        this.term = term.toLowerCase();
    }

    execute() {
        return savedItemsInstance.getAll().filter(item =>
            item.title.toLowerCase().includes(this.term)
        );
    }
}
