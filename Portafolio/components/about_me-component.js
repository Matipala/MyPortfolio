class AboutMe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        .hero-sobre-mi {
          background-color: #f9f9f9;
          padding: 50px 0;
        }

        .hero-sobre-mi__container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .hero-sobre-mi__content {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          align-items: center;
        }

        .hero-sobre-mi__image {
          flex: 1 1 250px;
          text-align: center;
        }

        .hero-sobre-mi__text {
          flex: 2 1 500px;
        }

        .hero-sobre-mi__title {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #333;
        }

        .hero-sobre-mi__description {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 15px;
          color: #666;
        }
      </style>

      <section class="hero-sobre-mi" id="sobre-mi">
        <div class="hero-sobre-mi__container">
          <div class="hero-sobre-mi__content">
            <div class="hero-sobre-mi__image">
              <img src="img/foto.png" alt="Foto de Matías" />
            </div>
            <div class="hero-sobre-mi__text">
              <h2 class="hero-sobre-mi__title">Sobre Mí</h2>
              <p class="hero-sobre-mi__description">
                Hola, soy Matías Palacios, un apasionado desarrollador front-end con experiencia en tecnologías modernas como React, Vue.js, y TypeScript. Mi objetivo es crear experiencias web interactivas y de alto rendimiento que ayuden a los usuarios a tener una experiencia increíble.
              </p>
              <p class="hero-sobre-mi__description">
                He trabajado en una variedad de proyectos, desde aplicaciones web hasta dashboards interactivos. Me encanta enfrentar nuevos desafíos y aprender continuamente para mejorar mis habilidades como desarrollador. Cuando no estoy programando, disfruto de la fotografía y la música.
              </p>
              <p class="hero-sobre-mi__description">
                En este portafolio, podrás explorar algunos de los proyectos que he desarrollado, los cuales reflejan mi compromiso por crear soluciones eficaces y bien estructuradas.
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
    }
}

customElements.define('about-me', AboutMe);
