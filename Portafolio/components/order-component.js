class OrderSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        document.addEventListener('blogs-updated', () => {
            this.render();
        });
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
        }
        this.render();
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
        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .blog-item {
          display: flex;
          background: white;
          margin-bottom: 1rem;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .blog-image {
          flex: 0 0 150px;
          height: 100px;
          object-fit: cover;
        }
        .blog-content {
          padding: 0.8rem 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .blog-title {
          font-size: 1.1rem;
          margin: 0 0 0.5rem 0;
          font-weight: bold;
          color: #222;
        }
        .blog-date {
          font-size: 0.8rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        .remove-btn {
          align-self: flex-start;
          background: #e74c3c;
          border: none;
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.2s ease;
        }
        .remove-btn:hover {
          background: #c0392b;
        }
        .empty-message {
          text-align: center;
          color: #555;
          font-style: italic;
          margin-top: 3rem;
        }
      </style>

      <section class="order-section">
        <h2>Blogs Guardados</h2>

        ${blogs.length > 0
                ? blogs
                    .map(
                        (blog) => `
          <div class="blog-item" data-id="${blog.id}">
            <img src="${blog.image || 'img/placeholder.png'}" alt="Blog image" class="blog-image" />
            <div class="blog-content">
              <div>
                <p class="blog-date">${blog.date || ''}</p>
                <h3 class="blog-title">${blog.title || blog.id}</h3>
              </div>
              <button class="remove-btn" data-id="${blog.id}">Quitar</button>
            </div>
          </div>
          `
                    )
                    .join("")
                : `<p class="empty-message">No tienes blogs guardados.</p>`
            }
      </section>
    `;

        this.shadowRoot.querySelectorAll(".remove-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = e.target.getAttribute("data-id");
                this.removeBlog(id);
            });
        });
    }
}

customElements.define("order-section", OrderSection);
