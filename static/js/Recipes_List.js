
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function () {
    const value = searchInput.value.toLowerCase();
    const recipes = document.querySelectorAll(".recipe-card");

    recipes.forEach(recipe => {
        const title = recipe.dataset.title.toLowerCase();
        const category = recipe.dataset.category.toLowerCase();

        if (title.includes(value) || category.includes(value)) {
            recipe.style.display = "block";
        } else {
            recipe.style.display = "none";
        }
    });
});


document.addEventListener("click", function(e) {
    if (e.target.closest(".btn-favorite")) {
        const btn = e.target.closest(".btn-favorite");
        const recipeId = btn.dataset.id;
        addToFavorites(recipeId);
    }
});

function addToFavorites(recipeId) {
    fetch(`/favorites/add/${recipeId}/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(err => console.error('Error:', err));
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(cookie => {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            }
        });
    }
    return cookieValue;
}


function checkRole() {
    const role = localStorage.getItem("role");
    const adminElements = document.querySelectorAll(".admin-only");
    const userElements = document.querySelectorAll(".user-only");

    if (role === "admin") {
        userElements.forEach(el => el.style.display = "none");
        adminElements.forEach(el => el.style.display = "inline-block");
    } else {
        adminElements.forEach(el => el.style.display = "none");
        userElements.forEach(el => el.style.display = "inline-block");
    }
}

window.onload = checkRole;