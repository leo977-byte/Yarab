function addIngredient() {
    const tbody = document.getElementById("ingredients_table");
    if (!tbody) return;

    const rowCount = tbody.rows.length + 1;
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="text" name="ingredient_id[]" value="New" readonly size="5"></td>
        <td><input type="text" name="ingredient_name[]" value="" required placeholder="Ingredient Name"></td>
        <td><input type="text" name="ingredient_qty[]" value="" required placeholder="Quantity"></td>
        <td><button type="button" class="btn btn-remove" onclick="removeRow(this)">✕ Remove</button></td>
    `;
    tbody.appendChild(row);
}

function removeRow(button) {
    const row = button.closest("tr");
    if (row) {
        row.remove();
    }
}