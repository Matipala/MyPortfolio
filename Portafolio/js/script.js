document.addEventListener("DOMContentLoaded", () => {
    const blogElements = document.querySelectorAll(".blogs__item");

    const getStoredData = () => JSON.parse(localStorage.getItem("blogsData")) || {};
    const saveStoredData = (data) => localStorage.setItem("blogsData", JSON.stringify(data));

    class Command {
        execute() { }
    }
    class ToggleLikeCommand extends Command {
        constructor(blogData, updateCallback) {
            super();
            this.blogData = blogData;
            this.updateCallback = updateCallback;
        }
        execute() {
            this.blogData.liked = !this.blogData.liked;
            this.blogData.count += this.blogData.liked ? 1 : -1;
            this.updateCallback();
        }
    }

    class ToggleSaveCommand extends Command {
        constructor(blogData, updateCallback) {
            super();
            this.blogData = blogData;
            this.updateCallback = updateCallback;
        }
        execute() {
            this.blogData.saved = !this.blogData.saved;
            this.updateCallback();
        }
    }

    blogElements.forEach((blogElement) => {
        const blogId = blogElement.dataset.id;
        const likeButton = blogElement.querySelector(".like-button");
        const saveButton = blogElement.querySelector(".save-button");

        const storedData = getStoredData();
        if (!storedData[blogId]) {
            storedData[blogId] = {
                count: 0,
                liked: false,
                saved: false
            };
        }
        const blogData = storedData[blogId];

        const updateLikeButton = () => {
            likeButton.textContent = `${blogData.liked ? "❤️" : "🤍"} ${blogData.count}`;
            likeButton.classList.toggle("liked", blogData.liked);
        };

        const updateSaveButton = () => {
            saveButton.textContent = blogData.saved ? "✅ Guardado" : "Guardar";
            saveButton.classList.toggle("saved", blogData.saved);
        };

        updateLikeButton();
        updateSaveButton();

        const likeCommand = new ToggleLikeCommand(blogData, () => {
            updateLikeButton();
            storedData[blogId] = blogData;
            saveStoredData(storedData);
        });

        const saveCommand = new ToggleSaveCommand(blogData, () => {
            updateSaveButton();
            storedData[blogId] = blogData;
            saveStoredData(storedData);
        });

        likeButton.addEventListener("click", () => {
            likeCommand.execute();
        });

        saveButton.addEventListener("click", () => {
            saveCommand.execute();
        });
    });
});