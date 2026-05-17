document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.getElementById('addRow');
    const removeBtn = document.getElementById('removeRow');
    const tableBody = document.querySelector('#ingredientsTable tbody');

    if (addBtn && tableBody) {
        addBtn.onclick = function() {
            let newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><input type="text" name="ing_name" placeholder="Name"></td>
                <td><input type="text" name="ing_qty" placeholder="Qty"></td>
            `;
            tableBody.appendChild(newRow);
        };
    }

    if (removeBtn && tableBody) {
        removeBtn.onclick = function() {
            let rows = tableBody.getElementsByTagName('tr');
            if (rows.length > 1) {
                tableBody.removeChild(rows[rows.length - 1]);
            }
        };
    }
});