document.addEventListener("DOMContentLoaded", () => {
    const likeButtons = document.querySelectorAll(".like-button");

    likeButtons.forEach((button) => {
        const blogElement = button.closest(".blogs__item");
        const blogId = blogElement.dataset.id;

        const likes = JSON.parse(localStorage.getItem("likes")) || {};
        const blogLikes = likes[blogId] || { count: 0, liked: false };

        button.textContent = `${blogLikes.liked ? "❤️" : "🤍"} ${blogLikes.count}`;
        if (blogLikes.liked) button.classList.add("liked");

        button.addEventListener("click", () => {
            let updatedLikes = JSON.parse(localStorage.getItem("likes")) || {};
            if (!updatedLikes[blogId]) {
                updatedLikes[blogId] = { count: 0, liked: false };
            }

            const current = updatedLikes[blogId];

            if (current.liked) {
                current.count--;
                current.liked = false;
                button.classList.remove("liked");
            } else {
                current.count++;
                current.liked = true;
                button.classList.add("liked");
            }

            button.textContent = `${current.liked ? "❤️" : "🤍"} ${current.count}`;
            updatedLikes[blogId] = current;
            localStorage.setItem("likes", JSON.stringify(updatedLikes));
        });
    });
});
