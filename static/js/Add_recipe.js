const addBtn = document.getElementById('addRow');
const removeBtn = document.getElementById('removeRow');
const tableBody = document.querySelector('#ingredientsTable tbody');

addBtn.onclick = function() {
    let newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" name="Ingredient ID" placeholder="ID"></td>
        <td><input type="text" name="Ingredient Name" placeholder="Name"></td>
        <td><input type="text" name="Quantity" placeholder="Qty"></td>
    `;
    tableBody.appendChild(newRow);
};

removeBtn.onclick = function() {
    let rows = tableBody.getElementsByTagName('tr');
    if (rows.length > 1) {
        tableBody.removeChild(rows[rows.length - 1]);
    }
};

const form = document.querySelector('form');

form.onsubmit = function(e) {
    e.preventDefault();

    const recipeId = Number(document.getElementById('RecipeID').value);
    let savedRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];

    if (savedRecipes.some(r => r.id === recipeId)) {
        alert("This Recipe ID already exists! Please use a unique ID.");
        return;
    }

    const recipeName = document.getElementById('RecipeName').value;
    const category = document.getElementById('namecourse').value;
    const description = document.getElementById('description').value;
    const imageInput = document.getElementById('file-upload');
    
    const imageName = imageInput.files[0] ? imageInput.files[0].name : 'pizza.jpg';

    let ingredientsArray = [];
    const rows = tableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const nameInput = row.querySelector('input[name="Ingredient Name"]');
        const qtyInput = row.querySelector('input[name="Quantity"]');
        if (nameInput && nameInput.value.trim() !== "") {
            ingredientsArray.push({ name: nameInput.value, qty: qtyInput.value });
        }
    });

    let stepsArray = description.split('\n').filter(step => step.trim() !== "");

    const newRecipe = {
        id: recipeId,
        name: recipeName,
        title: recipeName, 
        category: category,
        image: imageName,
        ingredients: ingredientsArray, 
        steps: stepsArray,             
        cookingTime: "20-30 mins", 
        servings: "4"
    };

    savedRecipes.push(newRecipe);
    localStorage.setItem('myRecipes', JSON.stringify(savedRecipes));

    alert('Recipe Added Successfully! ❤️');
    window.location.href = 'Recipes_List.html';
};