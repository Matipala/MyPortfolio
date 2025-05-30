const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.observe-section').forEach(section => {
    observer.observe(section);
});

const toggleBtn = document.getElementById('toggle-form-btn');
const blogForm = document.getElementById('blog-form');

if (toggleBtn && blogForm) {
    toggleBtn.addEventListener('click', () => {
        blogForm.classList.toggle('hidden');
    });
}

const blogPosts = document.querySelector('.blog__posts');

if (blogForm) {
    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const img = document.getElementById('blog-img').value;
        const date = document.getElementById('blog-date').value;
        const title = document.getElementById('blog-title').value;
        const description = document.getElementById('blog-description').value;

        const post = document.createElement('div');
        post.className = 'blogs__item';
        post.innerHTML = `
            <div class="blogs-item__image">
                <img class="blogs-item__img" src="${img}" alt="Imagen del blog">
            </div>
            <div class="blogs-item__content">
                <p class="blogs-item__date">${date}</p>
                <h3 class="blogs-item__title">${title}</h3>
                <p class="blogs-item__description">${description}</p>
            </div>
        `;
        blogPosts.appendChild(post);

        blogForm.reset();
    });
}

if (blogPosts) {
    const mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                alert('¡Se agregó una nueva entrada al blog personal!');
            }
        });
    });

    mutationObserver.observe(blogPosts, { childList: true });
}