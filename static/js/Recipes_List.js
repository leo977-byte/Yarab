const searchInput = document.getElementById("search");
const recipeList = document.querySelector('.recipes-list');


document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
});


searchInput.addEventListener("input", function () {
    const value = searchInput.value.toLowerCase();
    
    const recipes = document.querySelectorAll(".recipe"); 

    recipes.forEach(recipe => {
        const text = recipe.textContent.toLowerCase();
        if (text.includes(value)) {
            recipe.style.display = "block";
        } else {
            recipe.style.display = "none";
        }
    });
});

function loadRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    
    
    recipeList.innerHTML = "";

    savedRecipes.forEach(recipe => {
        const recipeHTML = `
            <li class="recipe recipe-card">
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name || recipe.title}</h3> 
                <p class="category">${recipe.category}</p>
                <p><a href="recipe-details.html?id=${recipe.id}" class="details-btn">View Recipe details</a></p>
                
                <button class="fav-btn user-only" onclick="addToFavorites(${recipe.id}, '${recipe.title}', '${recipe.image}', '${recipe.category}')">
                     Add to Favorites 
                </button>

                <a href="Edit_recipe.html?id=${recipe.id}"><button class="edit-recipe-btn admin-only">Edit Recipe</button></a>
            </li>
        `;
        recipeList.innerHTML += recipeHTML;
    });

    checkRole();
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

window.onload = loadRecipes;