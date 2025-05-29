class OrderSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.onBlogsUpdated = this.onBlogsUpdated.bind(this);
    }

    connectedCallback() {
        this.render();
        window.addEventListener("blogs-updated", this.onBlogsUpdated);
    }

    disconnectedCallback() {
        window.removeEventListener("blogs-updated", this.onBlogsUpdated);
    }

    onBlogsUpdated() {
        this.render();
    }

    getStoredBlogs() {
        const storedData = JSON.parse(localStorage.getItem("blogsData")) || {};
        return Object.entries(storedData)
            .filter(([id, data]) => data.saved)
            .map(([id, data]) => ({ id, ...data }));
    }

    removeBlog(id) {
        const storedData = JSON.parse(localStorage.getItem("blogsData")) || {};
        if (storedData[id]) {
            storedData[id].saved = false;
            localStorage.setItem("blogsData", JSON.stringify(storedData));
            this.render();
        }
    }

    render() {
        const blogs = this.getStoredBlogs();

        this.shadowRoot.innerHTML = `
      <style>
        .order-section {
          max-width: 700px;
          margin: 0 auto;
          padding: 1rem;
          font-family: Arial, sans-serif;
          background: #f9f9f9;
          border-radius: 10px;
        }
        .blogs-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
        .blog-item {
          display: flex;
          gap: 1rem;
          background: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgb(0 0 0 / 0.1);
          align-items: center;
        }
        .blog-image {
          width: 100px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          flex-shrink: 0;
        }
        .blog-content {
          flex-grow: 1;
        }
        .blog-title {
          font-weight: bold;
          font-size: 1rem;
          margin: 0 0 0.5rem 0;
        }
        .blog-date {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 0.5rem;
        }
        .remove-btn {
          background: #e74c3c;
          border: none;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease;
          font-size: 0.9rem;
          flex-shrink: 0;
        }
        .remove-btn:hover {
          background: #c0392b;
        }
        .no-blogs {
          text-align: center;
          font-size: 1.2rem;
          color: #555;
          padding: 2rem 0;
        }
      </style>
      <section class="order-section">
        <h2>Blogs Guardados</h2>
        ${blogs.length === 0
                ? `<p class="no-blogs">No tienes blogs guardados.</p>`
                : `<div class="blogs-list">
              ${blogs
                    .map(
                        (blog) => `
                <article class="blog-item" data-id="${blog.id}">
                  <img src="img/${blog.id}.jpeg" alt="Imagen del blog ${blog.id}" class="blog-image" />
                  <div class="blog-content">
                    <h3 class="blog-title">${blog.id}</h3>
                    <p class="blog-date">Guardado</p>
                    <button class="remove-btn">Eliminar</button>
                  </div>
                </article>
              `
                    )
                    .join("")}
            </div>`
            }
      </section>
    `;

        this.shadowRoot.querySelectorAll(".remove-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const blogId = e.target.closest(".blog-item").dataset.id;
                this.removeBlog(blogId);
                window.dispatchEvent(new CustomEvent("blogs-updated"));
            });
        });
    }
}

customElements.define("order-section", OrderSection);
