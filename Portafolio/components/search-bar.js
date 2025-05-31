import { SearchCommand } from '../command/searchCommand.js';
import { FocusSearchCommand } from '../command/focusSearchCommand.js';
import { savedItemsInstance } from '../components/savedItems.js';
import { ToggleFavoriteCommand } from '../command/ToggleFavoriteCommand.js';


class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
      <style>
        input {
          padding: 6px;
          font-size: 1rem;
          width: 100%;
        }
        ul {
          list-style: none;
          padding: 0;
          margin-top: 8px;
        }
        li {
          padding: 4px 0;
          border-bottom: 1px solid #ccc;
        }
      </style>
      <input type="text" placeholder="Buscar..." id="searchInput">
      <ul id="searchResults"></ul>
    `;

        const input = this.shadowRoot.querySelector('#searchInput');
        const results = this.shadowRoot.querySelector('#searchResults');

        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                const cmd = new SearchCommand(input.value);
                const found = cmd.execute();
                results.innerHTML = found.map(item => `<li>${item.title}</li>`).join('');
            }
        });

        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                const focusCmd = new FocusSearchCommand(input);
                focusCmd.execute();
            }
        });


        document.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
                e.preventDefault();
                const id = new URLSearchParams(window.location.search).get('id');
                if (id) {
                    const items = savedItemsInstance.getAll();
                    const blogItem = items.find(item => item.id === id);
                    if (blogItem) {
                        const updateCallback = () => {
                            savedItemsInstance.updateAll(items);
                            console.log(`Favorito alternado para ID: ${id}, estado liked: ${blogItem.liked}`);
                        };

                        const toggleCmd = new ToggleFavoriteCommand(blogItem, updateCallback);
                        toggleCmd.execute();
                    } else {
                        console.log(`No se encontró el item con ID: ${id}`);
                    }
                }
            }
        });
    }
}

customElements.define('search-bar', SearchBar);
