import { SaveCommand } from '../commands/SaveCommand.js';

class SaveButton extends HTMLElement {
    connectedCallback() {
        const id = this.getAttribute('data-id');
        const title = this.getAttribute('data-title');

        this.innerHTML = `<button>Guardar</button>`;

        this.querySelector('button').addEventListener('click', () => {
            const cmd = new SaveCommand({ id, title });
            cmd.execute();
            alert(`"${title}" guardado.`);
        });
    }
}

customElements.define('save-button', SaveButton);
