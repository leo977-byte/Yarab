
function checkRole() {
    const role = localStorage.getItem("role");
    const adminElements = document.querySelectorAll(".admin-only");
    const userElements = document.querySelectorAll(".user-only");

    if (role === "admin") {
        userElements.forEach(el => el.classList.add("hidden"));
        adminElements.forEach(el => el.classList.remove("hidden"));
    } else {
        adminElements.forEach(el => el.classList.add("hidden"));
        userElements.forEach(el => el.classList.remove("hidden"));
    }
}

document.addEventListener("click", function(e) {
    if (e.target.closest("#addToFavBtn")) {
        const btn = document.getElementById("addToFavBtn");
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

window.onload = checkRole;