document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    function performFilter() {
        const query = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value.toLowerCase();
        const cards = document.querySelectorAll('.fav-card');

        cards.forEach(card => {
            const title = card.querySelector('h2').innerText.toLowerCase();
            const cardCat = (card.getAttribute('data-category') || "").toLowerCase();

            const matchesSearch = title.includes(query);
            const matchesCat = (selectedCategory === 'all' || cardCat === selectedCategory);

            if (matchesSearch && matchesCat) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    if (searchInput) searchInput.addEventListener('input', performFilter);
    if (categoryFilter) categoryFilter.addEventListener('change', performFilter);
});