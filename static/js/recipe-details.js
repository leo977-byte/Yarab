

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
function confirmDelete(recipeId) {
    if (confirm("Are you sure you want to delete this recipe?")) {
        window.location.href = `/recipes/delete/${recipeId}/`;
    }
}
