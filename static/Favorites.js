function addToFavorites(id, name, image, category) {
    let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    const isExist = favorites.find(item => Number(item.id) === Number(id));

    if (isExist) {
        alert("This recipe is already in your favorites!❤️");
        return; 
    }

    const newRecipe = {
        id: Number(id),
        name: name,
        image: image,
        category: category,
        date: new Date().toLocaleDateString('en-GB')
    };

    favorites.push(newRecipe);
    localStorage.setItem('myFavorites', JSON.stringify(favorites));

    alert(name + " added to favorites!❤️");
}

function displayFavorites() {
    const grid = document.getElementById('recipesGrid');
    const msg = document.getElementById('emptyMessage');
    const ctrl = document.getElementById('controlsSection');

    if (!grid) return;

    let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    
    const existingCards = grid.querySelectorAll('.fav-card');
    existingCards.forEach(card => card.remove());

    if (favorites.length === 0) {
        if (msg) msg.style.display = "block";
        if (ctrl) ctrl.style.display = "none";
    } else {
        if (msg) msg.style.display = "none";
        if (ctrl) ctrl.style.display = "flex";

        favorites.forEach((recipe, index) => {
            const card = document.createElement('div');
            card.className = 'fav-card';
            card.setAttribute('data-category', recipe.category);
            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h2>${recipe.name}</h2>
                <span class="save-date">Saved on: ${recipe.date}</span>
                <div class="card-buttons">
                    <a href="recipe-details.html?id=${recipe.id}">View Details</a>
                    <button onclick="removeRecipe(${index})">Remove</button>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

function removeRecipe(index) {
    if (confirm("Remove from favorites?")) {
        let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
        favorites.splice(index, 1);
        localStorage.setItem('myFavorites', JSON.stringify(favorites));
        displayFavorites();
    }
}
function performFilter() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (!searchInput || !categoryFilter) return;

    const query = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value.toLowerCase();
    const cards = document.querySelectorAll('.fav-card');

    cards.forEach(card => {
        const title = card.querySelector('h2').innerText.toLowerCase();
        const cardCat = (card.getAttribute('data-category') || "").toLowerCase();

        const matchesSearch = title.includes(query);
        
        const matchesCat = (selectedCategory === 'all' || 
                            cardCat === selectedCategory || 
                            cardCat.includes(selectedCategory.split('-')[0])); 

        if (matchesSearch && matchesCat) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
window.addEventListener('DOMContentLoaded', () => {
    displayFavorites();

    const sInput = document.getElementById('searchInput');
    const cFilter = document.getElementById('categoryFilter');

    if (sInput) {
        sInput.addEventListener('input', performFilter);
    }
    if (cFilter) {
        cFilter.addEventListener('change', performFilter);
    }
});