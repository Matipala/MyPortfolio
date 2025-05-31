import { savedItemsInstance } from './savedItems.js';

class SavedList extends HTMLElement {
  connectedCallback() {
    this.render();
    savedItemsInstance.subscribe(() => this.update());
  }

  update() {
    this.render();
  }

  render() {
    const savedBlogs = savedItemsInstance.getAll();
    this.innerHTML = `
    <h2>Guardados</h2>
    <ul>
      ${savedBlogs.map(blog => `
        <li>
          <img src="${blog.image}" alt="${blog.alt}" style="width:100px; height:auto; border-radius:5px; margin-right:10px; vertical-align:middle;">
          <div style="display:inline-block; vertical-align:middle;">
            <h3>${blog.title}</h3>
            <p><small>${blog.date}</small></p>
            <p>${blog.description}</p>
            <button class="delete-btn" data-id="${blog.id}">Eliminar</button>
          </div>
        </li>
      `).join('')}
    </ul>
  `;

    this.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        savedItemsInstance.remove(id);
      });
    });
  }
}

customElements.define("saved-list", SavedList);
