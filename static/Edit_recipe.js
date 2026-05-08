document.addEventListener("DOMContentLoaded", function () {
    let recipes = JSON.parse(localStorage.getItem("myRecipes")) || [];
    const params = new URLSearchParams(window.location.search);
    const recipeId = Number(params.get("id"));

    let recipe = recipes.find(r => r.id === recipeId);

    if (!recipe) {
        alert("Recipe not found");
        window.location.href = "Recipes_List.html";
        return;
    }

    document.getElementById("recipe_id").value = recipe.id || "";
    document.getElementById("recipe_name").value = recipe.name || recipe.title || "";
    document.getElementById("course_name").value = recipe.category || "main_course";
    document.getElementById("description").value = recipe.steps ? recipe.steps.join('\n') : "";

    const tbody = document.getElementById("ingredients_table");
    tbody.innerHTML = "";

    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach((ing, index) => {
            renderIngredientRow(ing.name, ing.qty, index + 1);
        });
    }

    document.getElementById("edit-recipe-form").addEventListener("submit", function (e) {
        e.preventDefault();

        recipe.name = document.getElementById("recipe_name").value;
        recipe.title = recipe.name; 
        recipe.category = document.getElementById("course_name").value;
        
        const descValue = document.getElementById("description").value;
        recipe.steps = descValue.split('\n').filter(step => step.trim() !== "");

        let names = document.querySelectorAll('input[name="ingredient_name[]"]');
        let quantities = document.querySelectorAll('input[name="ingredient_qty[]"]');

        let updatedIngredients = [];
        for (let i = 0; i < names.length; i++) {
            if (names[i].value.trim() !== "") {
                updatedIngredients.push({
                    name: names[i].value,
                    qty: quantities[i].value
                });
            }
        }

        recipe.ingredients = updatedIngredients;
        let index = recipes.findIndex(r => r.id === recipeId);
        recipes[index] = recipe;

        localStorage.setItem("myRecipes", JSON.stringify(recipes));
        alert("Updated successfully ✅");
        window.location.href = `recipe-details.html?id=${recipeId}`;
    });
});

function addIngredient() {
    const tbody = document.getElementById("ingredients_table");
    const rowCount = tbody.rows.length + 1;
    renderIngredientRow("", "", rowCount);
}

function renderIngredientRow(name, qty, id) {
    const tbody = document.getElementById("ingredients_table");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><input type="text" value="${id}" readonly size="5"></td>
        <td><input type="text" name="ingredient_name[]" value="${name || ""}" required></td>
        <td><input type="text" name="ingredient_qty[]" value="${qty || ""}" required></td>
        <td><button type="button" class="btn btn-remove" onclick="removeRow(this)">✕ Remove</button></td>
    `;
    tbody.appendChild(row);
}

function removeRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}