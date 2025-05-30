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


const toggleBtn = document.getElementById('togglePostForm');
const blogForm = document.getElementById('blogForm');

if (toggleBtn && blogForm) {
    toggleBtn.addEventListener('click', () => {
        blogForm.classList.toggle('hidden');
    });
}


const blogPosts = document.querySelector('.blog__posts');

if (blogForm && blogPosts) {
    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const img = document.getElementById('postImage').value;
        const date = document.getElementById('postDate').value;
        const title = document.getElementById('postTitle').value;
        const description = document.getElementById('postDescription').value;

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
        blogForm.classList.add('hidden');
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
