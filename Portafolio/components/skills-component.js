class SkillsSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .skills {
          padding: 80px 0;
          background-color: #f9f9f9;
        }

        .skills__container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .skills__grid {
        display: grid;
        grid-template-columns: repeat(3, 350px);
        gap: 30px;
        }

        .skills__category {
        background-color: #fff;
        border-radius: 8px;
        padding: 20px;
        max-width: 200px;
        min-height: 200px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease;
        }

        .skills__category:hover {
          transform: translateY(-5px);
        }

        .skills__category-title {
          font-size: 1.2rem;
          margin-bottom: 15px;
          color: #333;
          border-bottom: 2px solid #eaeaea;
          padding-bottom: 10px;
        }

        .skills__list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .skills__item {
          padding: 8px 0;
          color: #666;
          position: relative;
          padding-left: 20px;
        }

        .skills__item::before {
          content: "•";
          color: #333;
          position: absolute;
          left: 0;
          top: 7px;
        }
      </style>

      <section class="skills">
        <div class="skills__container">
          <div class="skills__grid">
            <div class="skills__category">
              <h3 class="skills__category-title">Lenguajes</h3>
              <ul class="skills__list">
                <li class="skills__item">TypeScript</li>
                <li class="skills__item">Python</li>
                <li class="skills__item">JavaScript</li>
              </ul>
            </div>

            <div class="skills__category">
              <h3 class="skills__category-title">Frontend</h3>
              <ul class="skills__list">
                <li class="skills__item">HTML</li>
                <li class="skills__item">CSS</li>
              </ul>
            </div>

            <div class="skills__category">
              <h3 class="skills__category-title">Herramientas y SO</h3>
              <ul class="skills__list">
                <li class="skills__item">VSCode</li>
                <li class="skills__item">Rider</li>
                <li class="skills__item">Intellij</li>
                <li class="skills__item">Figma</li>
                <li class="skills__item">Git</li>
              </ul>
            </div>

            <div class="skills__category">
              <h3 class="skills__category-title">Bases de Datos</h3>
              <ul class="skills__list">
                <li class="skills__item">SQLServer</li>
                <li class="skills__item">PostgreSQL</li>
                <li class="skills__item">MongoDB</li>
                <li class="skills__item">Docker</li>
              </ul>
            </div>

            <div class="skills__category">
              <h3 class="skills__category-title">Frameworks</h3>
              <ul class="skills__list">
                <li class="skills__item">React</li>
                <li class="skills__item">Vue</li>
                <li class="skills__item">Vanillajs</li>
                <li class="skills__item">Angular</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("skills-section", SkillsSection);
