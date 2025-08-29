import { useState, useEffect } from "react";
import recipes from "../data/recipes.json";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [search, setSearch] = useState("");

  // Add scroll restoration effect
  useEffect(() => {
    // Only restore scroll position if coming from a recipe detail page
    const savedScrollPosition = sessionStorage.getItem('recipeListScrollPosition');
    const shouldRestore = sessionStorage.getItem('shouldRestoreScroll');
    
    console.log('Saved scroll position:', savedScrollPosition); // Debug log
    console.log('Should restore:', shouldRestore); // Debug log
    
    if (savedScrollPosition && shouldRestore === 'true') {
      // Use setTimeout to ensure the DOM is fully rendered
      setTimeout(() => {
        console.log('Restoring scroll to:', savedScrollPosition); // Debug log
        window.scrollTo({
          top: parseInt(savedScrollPosition, 10),
          behavior: 'auto' // Use 'auto' for instant scroll
        });
        // Clear the saved position after restoring
        sessionStorage.removeItem('recipeListScrollPosition');
        sessionStorage.removeItem('shouldRestoreScroll');
      }, 100);
    } else {
      // Clear any leftover data if we're not supposed to restore
      sessionStorage.removeItem('recipeListScrollPosition');
      sessionStorage.removeItem('shouldRestoreScroll');
    }
  }, []);

  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="d-flex align-items-center justify-content-center gap-4 px-5 py-5 hero-section">
        <div className="col-md-6">
          <h6 className="text-yellow fw-bold">WELCOME</h6>
          <h1 className="fw-bold display-5">
            Easy Filipino Recipes <br /> for Any Occasion
          </h1>
          <p className="text-muted">
            Discover delicious Filipino dishes—from timeless classics to modern
            twists. Perfect for family meals, celebrations, or just everyday
            cooking.
          </p>
          <div className="mt-3">
            <a href="#recipes-section" className="back-button btn shadow-sm">
              <i className="bi bi-arrow-left me-2"></i>
              Browse Recipes
            </a>
          </div>
        </div>
        <div className="col-md-5 text-center hero-img">
          <img
            src="/icon.png"
            alt="Filipino Dish"
            className="hero-image"
          />
        </div>
      </section>

      {/* Search Section */}
      <div id="recipes-section" className="container py-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">What's New on Our Table</h2>
          <p className="text-muted"></p>
        </div>

        <input
          type="text"
          placeholder="Search recipe..."
          className="form-control mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Recipes */}
        <div className="row">
          {filtered.length > 0 ? (
            filtered.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p className="text-muted text-center">No recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}