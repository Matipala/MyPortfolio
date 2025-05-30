import { savedItemsInstance } from './savedItems.js';

class SavedList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render(savedItemsInstance.getAll());

        savedItemsInstance.subscribe(items => this.render(items));
    }

    render(items) {
        this.shadowRoot.innerHTML = `
            <style>
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    padding: 4px 0;
                    border-bottom: 1px solid #ccc;
                }
            </style>
            <h3>Guardados</h3>
            <ul>
                ${items.map(item => `<li>${item.title}</li>`).join('')}
            </ul>
        `;
    }
}

customElements.define('saved-list', SavedList);
