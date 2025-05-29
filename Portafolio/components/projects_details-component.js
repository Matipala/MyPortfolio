class ProductDetail extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set product(data) {
        this._product = data;
        this.render();
    }

    render() {
        if (!this._product) return;

        this.shadowRoot.innerHTML = `
      <style>
        .detail {
          max-width: 600px;
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0,0,0,0.2);
          font-family: Arial, sans-serif;
          position: relative;
        }
        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          cursor: pointer;
          font-weight: bold;
          font-size: 1.2rem;
          border: none;
          background: transparent;
        }
        img {
          max-width: 100%;
          border-radius: 10px;
          margin-bottom: 1rem;
        }
        h2 {
          margin-top: 0;
          margin-bottom: 0.5rem;
        }
        p {
          margin-bottom: 0.5rem;
          color: #555;
        }
        a {
          color: #0077cc;
          text-decoration: none;
        }
      </style>

      <div class="detail">
        <button class="close-btn" title="Cerrar">&times;</button>
        <img src="${this._product.image}" alt="${this._product.title}">
        <h2>${this._product.title}</h2>
        <p><strong>Fecha:</strong> ${this._product.date}</p>
        <p>${this._product.description}</p>
        <p><a href="${this._product.link}" target="_blank" rel="noopener">Ver proyecto en GitHub</a></p>
      </div>
    `;

        this.shadowRoot.querySelector('.close-btn').addEventListener('click', () => {
            this.remove();
        });

        this.shadowRoot.querySelector('.overlay').addEventListener('click', () => {
            this.remove();
        });
    }
}

customElements.define('product-detail', ProductDetail);
