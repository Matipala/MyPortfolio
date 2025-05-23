document.addEventListener("DOMContentLoaded", () => {
    const blogElements = document.querySelectorAll(".blogs__item");

    const getStoredData = () => JSON.parse(localStorage.getItem("blogsData")) || {};
    const saveStoredData = (data) => localStorage.setItem("blogsData", JSON.stringify(data));

    blogElements.forEach((blogElement) => {
        const blogId = blogElement.dataset.id;
        const likeButton = blogElement.querySelector(".like-button");
        const saveButton = blogElement.querySelector(".save-button");

        const title = blogElement.querySelector(".blogs__item-title")?.innerText || "";
        const description = blogElement.querySelector(".blogs__item-description")?.innerText || "";
        const image = blogElement.querySelector("img")?.getAttribute("src") || "";

        const storedData = getStoredData();
        if (!storedData[blogId]) {
            storedData[blogId] = {
                title,
                description,
                image,
                count: 0,
                liked: false,
                saved: false
            };
        }
        const blogData = storedData[blogId];

        updateLikeButton(likeButton, blogData);
        updateSaveButton(saveButton, blogData);

        likeButton.addEventListener("click", () => {
            blogData.liked = !blogData.liked;
            blogData.count += blogData.liked ? 1 : -1;
            updateLikeButton(likeButton, blogData);
            storedData[blogId] = blogData;
            saveStoredData(storedData);
        });

        saveButton.addEventListener("click", () => {
            blogData.saved = !blogData.saved;
            updateSaveButton(saveButton, blogData);
            storedData[blogId] = blogData;
            saveStoredData(storedData);
        });
    });

    function updateLikeButton(button, blogData) {
        button.textContent = `${blogData.liked ? "❤️" : "🤍"} ${blogData.count}`;
        button.classList.toggle("liked", blogData.liked);
    }

    function updateSaveButton(button, blogData) {
        button.textContent = blogData.saved ? "✅ Guardado" : "Guardar";
        button.classList.toggle("saved", blogData.saved);
    }
});
