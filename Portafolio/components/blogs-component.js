import { savedItemsInstance } from '../components/savedItems.js';
import { ToggleFavoriteCommand } from '../command/ToggleFavoriteCommand.js';


class BlogsSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getBlogs() {
    return [
      {
        id: "blog1",
        image: "img/Blog1.jpeg",
        alt: "Blog 1",
        date: "20 de mayo de 2025",
        title: "Aplicando Metodologías Ágiles",
        description: `Algo que he aprendido en mis clases y proyectos es que desarrollar software no se trata solo de escribir código, sino de colaborar, planificar y mejorar constantemente como equipo <a href="https://www.linkedin.com/posts/matias-palacios0121_desarrolloaergil-scrum-trabajoenequipo-activity-7330286029284773888-jrib" target="_blank" rel="noopener noreferrer">Ver más...</a>`
      },
      {
        id: "blog2",
        image: "img/Blog2.jpeg",
        alt: "Blog 2",
        date: "20 de mayo de 2025",
        title: "Aplicando Metodologías Ágiles",
        description: `Algo que he aprendido en mis clases y proyectos es que desarrollar software no se trata solo de escribir código, sino de colaborar, planificar y mejorar constantemente como equipo <a href="https://www.linkedin.com/posts/matias-palacios0121_desarrolloaergil-scrum-trabajoenequipo-activity-7330286029284773888-jrib" target="_blank" rel="noopener noreferrer">Ver más...</a>`
      },
      {
        id: "blog3",
        image: "img/Blog3.jpeg",
        alt: "Blog 3",
        date: "20 de mayo de 2025",
        title: "Aplicando Metodologías Ágiles",
        description: `Algo que he aprendido en mis clases y proyectos es que desarrollar software no se trata solo de escribir código, sino de colaborar, planificar y mejorar constantemente como equipo <a href="https://www.linkedin.com/posts/matias-palacios0121_desarrolloaergil-scrum-trabajoenequipo-activity-7330286029284773888-jrib" target="_blank" rel="noopener noreferrer">Ver más...</a>`
      },
    ];
  }

  connectedCallback() {
    this.render();
    this.setupLikesAndSaves();
  }

  render() {
    const blogs = this.getBlogs();

    this.shadowRoot.innerHTML = `
      <style>
        .blogs {
          padding: 3rem 0;
          background-color: #f9f9f9;
        }
        .blogs__container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .blogs__grid {
          display: flex;
          gap: 2rem;
          flex-wrap: nowrap;
          padding-bottom: 1rem;
        }
        .blogs__item {
          flex: 0 0 350px;
          background-color: #fff;
          border: 2px solid #ddd;
          border-radius: 10px;
          padding: 0;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 1;
          transform: translateY(0);
        }
        .blogs__item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        .blogs-item__image {
          position: relative;
          height: 200px;
          overflow: hidden;
          border-radius: 10px 10px 0 0;
        }
        .blogs-item__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .blogs-item__content {
          padding: 1.5rem;
        }
        .blogs-item__date {
          font-size: 0.9rem;
          color: #888;
          margin-bottom: 0.5rem;
        }
        .blogs-item__title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .blogs-item__title a {
          text-decoration: none;
          color: #222;
        }
        .blogs-item__description {
          font-size: 0.9rem;
          color: #666;
        }
        .blogs-item__buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-top: 10px;
        }
        .like-button,
        .save-button {
          font-size: 1.1rem;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .like-button.liked {
          color: red;
        }
        .save-button.saved {
          color: green;
        }
        .save-message {
          color: green;
          font-size: 0.9rem;
          margin-top: 5px;
          display: none;
        }
      </style>
      <section class="blogs">
        <div class="blogs__container">
          <div class="blogs__grid">
            ${blogs
        .map(
          (blog) => `
              <article class="blogs__item" data-id="${blog.id}">
                <div class="blogs-item__image">
                  <img src="${blog.image}" alt="${blog.alt}" class="blogs-item__img" />
                </div>
                <div class="blogs-item__content">
                  <p class="blogs-item__date">${blog.date}</p>
                  <h3 class="blogs-item__title">${blog.title}</h3>
                  <p class="blogs-item__description">${blog.description}</p>
                  <div class="blogs-item__buttons">
                    <button class="like-button">🤍 0</button>
                    <button class="save-button">Guardar</button>
                  </div>
                  <div class="save-message"></div>
                </div>
              </article>
            `
        )
        .join("")}
          </div>
        </div>
      </section>
    `;
    this.setupAppStateFavorites();
  }
}


customElements.define("blogs-section", BlogsSection);


