import { SearchCommand } from '../commands/SearchCommand.js';
import { FocusSearchCommand } from '../commands/FocusSearchCommand.js';

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
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                const focusCmd = new FocusSearchCommand(input);
                focusCmd.execute();
            }
        });

        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                const id = new URLSearchParams(window.location.search).get('id');
                if (id) {
                    console.log(`(Simulado) Alternar favorito para ID: ${id}`);
                }
            }
        });
    }
}

customElements.define('search-bar', SearchBar);
