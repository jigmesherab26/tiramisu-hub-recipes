/* =========================================================
   Tiramisu Hub - JavaScript Interactivity
   Author: Tiramisu Hub
   Description:
   - Enables horizontal scrolling for featured recipes
   - Shows recipe detail section on "View Recipe" click
   - Vanilla JavaScript only
========================================================= */

/* =========================
   DOM ELEMENT REFERENCES
========================= */

// Carousel elements
const carousel = document.querySelector('.recipe-carousel');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Recipe detail section
const recipeDetailSection = document.getElementById('recipe-detail');

// View Recipe buttons
const viewRecipeButtons = document.querySelectorAll('.view-recipe-btn');

/* =========================
   INITIAL STATE
========================= */

// Hide recipe detail section on page load
if (recipeDetailSection) {
    recipeDetailSection.style.display = 'none';
}

/* =========================
   HORIZONTAL SCROLL LOGIC
========================= */

// Amount to scroll per arrow click (desktop-friendly)
const scrollAmount = 320;

// Scroll left
if (leftArrow) {
    leftArrow.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Scroll right
if (rightArrow) {
    rightArrow.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

/* =========================
   VIEW RECIPE INTERACTION
========================= */

viewRecipeButtons.forEach(button => {
    button.addEventListener('click', () => {

        // Reveal recipe detail section
        recipeDetailSection.style.display = 'block';

        // Smooth scroll to recipe detail section
        recipeDetailSection.scrollIntoView({
            behavior: 'smooth'
        });

        /*
         NOTE:
         This is where dynamic recipe loading logic
         could be added in the future, such as:
         - Updating title
         - Updating ingredients
         - Updating instructions
         based on the selected card
        */
    });
});

/* =========================
   OPTIONAL UX IMPROVEMENT
========================= */

// Hide arrows when scrolling is not possible
function updateArrowVisibility() {
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

    leftArrow.style.display = carousel.scrollLeft > 0 ? 'block' : 'none';
    rightArrow.style.display = carousel.scrollLeft < maxScrollLeft ? 'block' : 'none';
}

// Update arrows on scroll
carousel.addEventListener('scroll', updateArrowVisibility);

// Initial arrow visibility check
updateArrowVisibility();

/* ================= CLOSE RECIPE DETAIL ================= */

const closeRecipeButton = document.getElementById('close-recipe-detail');

if (closeRecipeButton) {
    closeRecipeButton.addEventListener('click', () => {
        recipeDetailSection.style.display = 'none';

        // Optional: Scroll back to featured recipes section
        document.getElementById('featured-recipes').scrollIntoView({
            behavior: 'smooth'
        });
    });
}