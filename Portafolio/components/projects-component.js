class ProjectsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  getProjects() {
    const data = localStorage.getItem('projects');
    if (data) {
      return JSON.parse(data);
    }
    const mockProjects = [
      {
        title: "OrderNow",
        description: "Plataforma de pedidos para estudiantes universitarios. Permite a los usuarios ordenar comida desde sus dispositivos móviles dentro del campus.",
        date: "10 de marzo de 2025",
        image: "img/EstaesMorado.png",
        link: "https://github.com/Matipala/OrderNow"
      },
      {
        title: "Detector de Basura",
        description: "Sistema con IA que detecta cuando un auto bota basura en la calle y captura la placa para aplicar sanciones.",
        date: "28 de abril de 2025",
        image: "img/EstaesMorado.png",
        link: "https://github.com/Matipala/Detector-Basura-Placas"
      },
      {
        title: "Reconocimiento de Gestos",
        description: "Aplicación web que reconoce gestos con la mano a través de la cámara para interactuar en tiempo real.",
        date: "6 de febrero de 2025",
        image: "img/EstaesMorado.png",
        link: "https://github.com/Matipala/Reconocimiento_Gestos.git"
      }
    ];

    localStorage.setItem('projects', JSON.stringify(mockProjects));
    return mockProjects;
  }

  render() {
    const projects = this.getProjects();

    this.shadowRoot.innerHTML = `
      <style>
        .portfolio {
          padding: 3rem 0;
          background-color: #f9f9f9;
        }

        .portfolio__container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .portfolio__grid {
          display: flex;
          gap: 2rem;
          flex-wrap: nowrap;
          padding-bottom: 1rem;
        }

        .portfolio__item {
          flex: 0 0 350px;
          background-color: #fff;
          border: 2px solid #ddd;
          border-radius: 10px;
          padding: 0;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 1;
          transform: translateY(0);
          cursor: pointer;
        }

        .portfolio__item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .portfolio-item__image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .portfolio-item__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px 10px 0 0;
        }

        .portfolio-item__content {
          padding: 1.5rem;
        }

        .portfolio-item__date {
          font-size: 0.9rem;
          color: #888;
          margin-bottom: 0.5rem;
        }

        .portfolio-item__title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .portfolio-item__title a {
          text-decoration: none;
          color: #222;
        }

        .portfolio-item__description {
          font-size: 0.9rem;
          color: #666;
        }
      </style>

      <section class="portfolio">
        <div class="portfolio__container">
          <div class="portfolio__grid">
            ${projects.map(project => `
              <article class="portfolio__item">
                <div class="portfolio-item__image">
                  <a href="${project.link}" target="_blank" rel="noopener noreferrer">
                    <img src="${project.image}" alt="${project.title}" class="portfolio-item__img">
                  </a>
                </div>
                <div class="portfolio-item__content">
                <p class="portfolio-item__date">${project.date}</p>
                  <h3 class="portfolio-item__title">
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer">${project.title}</a>
                  </h3>
                  <p class="portfolio-item__description">${project.description}</p>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('projects-section', ProjectsComponent);
