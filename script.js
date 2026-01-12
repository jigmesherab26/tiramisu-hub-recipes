/* =========================================================
   Tiramisu Hub – JSON Data Population Script
   Rules enforced:
   - No class creation or modification
   - HTML defines all structure & classes
   - JS only injects content
========================================================= */

/* =========================
   DOM REFERENCES
========================= */
const carousel = document.querySelector('.recipe-carousel');
const recipeTemplate = carousel.querySelector('.recipe-card');
const recipeDetailSection = document.getElementById('recipe-detail');
const closeRecipeButton = document.getElementById('close-recipe-detail');

/* =========================
   INITIAL STATE
========================= */
recipeDetailSection.style.display = 'none';

/* =========================
   FETCH JSON DATA
========================= */
fetch('tiramisu-recipes.json')
    .then(response => response.json())
    .then(recipes => populateRecipeCards(recipes))
    .catch(error => console.error('Error loading recipes:', error));

/* =========================
   POPULATE RECIPE CARDS
========================= */
function populateRecipeCards(recipes) {

    // Remove template card from display
    recipeTemplate.style.display = 'none';

    recipes.forEach((recipe, index) => {

        // Clone template
        const cardClone = recipeTemplate.cloneNode(true);
        cardClone.style.display = 'block';

        // Populate content (NO class changes)
        const image = cardClone.querySelector('img');
        const title = cardClone.querySelector('h3');
        const rating = cardClone.querySelector('.rating');
        const prepTime = cardClone.querySelector('.prep-time');
        const viewButton = cardClone.querySelector('.view-recipe-btn');

        image.src = recipe.image;
        image.alt = recipe.title;
        title.textContent = recipe.title;
        rating.textContent = formatRating(recipe.rating);
        prepTime.textContent = `Prep Time: ${recipe.prepTime}`;

        // Store index using dataset (allowed, no class change)
        viewButton.dataset.index = index;

        viewButton.addEventListener('click', () => {
            showRecipeDetail(recipe);
        });

        carousel.appendChild(cardClone);
    });
}

/* =========================
   SHOW RECIPE DETAIL
========================= */
/* =========================
   VIEW RECIPE HANDLER
========================= */
function showRecipeDetail(recipe) {
    const detailSection = document.getElementById('recipe-detail');

    // Header
    const image = detailSection.querySelector('.recipe-detail-body img');
    const title = detailSection.querySelector('.recipe-detail-meta h2');
    const rating = detailSection.querySelector('.detail-rating');
    const servings = detailSection.querySelector('.detail-servings');
    const prepTime = detailSection.querySelector('.detail-prep-time');

    image.src = recipe.image;
    image.alt = recipe.title;
    title.textContent = recipe.title;
    rating.textContent = formatRating(recipe.rating);
    servings.textContent = `Servings: ${recipe.servings}`;
    prepTime.textContent = `Prep Time: ${recipe.prepTime}`;

    // Ingredients
    const ingredientsList = detailSection.querySelector('.ingredients ul');
    ingredientsList.innerHTML = '';

    recipe.ingredients.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}: ${item.quantity}`;
        ingredientsList.appendChild(li);
    });

    // Instructions
    const instructionsList = detailSection.querySelector('.instructions ol');
    instructionsList.innerHTML = '';

    recipe.instructions.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        instructionsList.appendChild(li);
    });

    // Notes
    const notes = detailSection.querySelector('.notes p');
    notes.textContent = recipe.notes;

    // Show section
    detailSection.style.display = 'block';
    detailSection.scrollIntoView({ behavior: 'smooth' });
}


/* =========================
   CLOSE RECIPE DETAIL
========================= */
closeRecipeButton.addEventListener('click', () => {
    recipeDetailSection.style.display = 'none';

    document.getElementById('featured-recipes').scrollIntoView({
        behavior: 'smooth'
    });
});

/* =========================
   UTILITIES
========================= */
function formatRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? '½' : '';
    return '★'.repeat(fullStars) + halfStar;
}
