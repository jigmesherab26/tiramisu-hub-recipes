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
function showRecipeDetail(recipe) {
    recipeDetailSection.style.display = 'block';

    recipeDetailSection.scrollIntoView({
        behavior: 'smooth'
    });

    /*
      Dynamic recipe detail population
      (ingredients, instructions, notes)
      can be safely added here later
    */
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
