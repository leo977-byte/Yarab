document.addEventListener('DOMContentLoaded', function () {
    let role = localStorage.getItem("role");
    let storedRecipes = JSON.parse(localStorage.getItem("myRecipes"));
    storedRecipes = storedRecipes.map(recipe => {
        if (recipe.ingredients) {
            recipe.ingredients = recipe.ingredients.map(item => {
                if (typeof item === "string") {
                    return { name: item, qty: "" };
                }
                return item;
            });
        }
        return recipe;
    });
    function getRecipeId() {
        const params = new URLSearchParams(window.location.search);
        return params.get("id");
    }
    let recipeId = getRecipeId();
    let selectedRecipe = recipeId ? storedRecipes.find(r => r.id == recipeId):null;
    if (!selectedRecipe) {
          alert("Recipe not found");
          window.location.href = "Recipes_List.html";
          return;
    }
    function renderUI() {
        document.getElementById("Title").innerText = selectedRecipe.title || selectedRecipe.name;
        document.getElementById("category").innerText = "Category: " + selectedRecipe.category;
        document.getElementById("recipeImage").src = selectedRecipe.image;
        const ul = document.getElementById("ingredientsList");
        ul.innerHTML = "";
        if (selectedRecipe.ingredients && selectedRecipe.ingredients.length > 0) {
            selectedRecipe.ingredients.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item.qty ? `${item.name} - ${item.qty}` : item.name;
                ul.appendChild(li);
            });
        } else {
            ul.innerHTML = "<li>No ingredients listed.</li>";
        }
        const ol = document.getElementById("stepsList");
        ol.innerHTML = "";
        if (selectedRecipe.steps && selectedRecipe.steps.length > 0) {
            selectedRecipe.steps.forEach(step => {
                const li = document.createElement("li");
                li.textContent = step;
                ol.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = "No steps provided.";
            ol.appendChild(li);
        }
        document.getElementById("cookingTime").innerText = selectedRecipe.cookingTime || "N/A";
        document.getElementById("servings").innerText = selectedRecipe.servings || "N/A";
    }
    const editBtn = document.getElementById("editBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    const favBtn = document.getElementById("addToFavBtn");

    if (editBtn) editBtn.classList.add("hidden");
    if (deleteBtn) deleteBtn.classList.add("hidden");
    if (favBtn) favBtn.classList.add("hidden");
    if (role === "admin") {
        if (editBtn){ editBtn.classList.remove("hidden");   
    editBtn.addEventListener("click", function () {
         if (!selectedRecipe || !selectedRecipe.id) {
        alert("Invalid recipe ");
        return;
    }
        window.location.href = `Edit_recipe.html?id=${selectedRecipe.id}`;
    });
                }
        if (deleteBtn) {
            deleteBtn.classList.remove("hidden");
            deleteBtn.addEventListener("click", function () {
                if (!confirm("Are you sure you want to delete this recipe?")) return;
                let recipes = JSON.parse(localStorage.getItem("myRecipes")) || [];
                let updatedRecipes = recipes.filter(recipe => recipe.id != selectedRecipe.id);
                localStorage.setItem("myRecipes", JSON.stringify(updatedRecipes));
                alert("Recipe deleted successfully");
                window.location.href = "Recipes_List.html";
            });
        }
    } else if (role === "user" || !role) {
        if (favBtn) {
            favBtn.classList.remove("hidden");
            favBtn.onclick = function () {
                    addToFavorites(selectedRecipe.id, selectedRecipe.title,selectedRecipe.image,selectedRecipe.category);
            }
        }
    }
    renderUI();
});