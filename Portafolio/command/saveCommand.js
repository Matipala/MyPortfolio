import { saveditemsInstace } from '../components/savedItems.js';

export class SaveCommand {
    constructor(term) {
        this.term = term.toLowerCase();
    }
    execute() {
        return saveditemsInstace.getAll().filter(item =>
            item.title.toLowerCase().includes(this.term)
        );
    }
}
