import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import recipes from "../data/recipes.json";
import { FavoritesContext } from "../contexts/FavoritesContext";

function IngredientItem({ ingredient, index }) {
  return (
    <div className="ingredient-item mb-2 d-flex align-items-center">
      <input
        className="form-check-input me-2"
        type="checkbox"
        id={`ingredient-${index}`}
      />
      <label
        className="form-check-label ingredient-text"
        htmlFor={`ingredient-${index}`}
      >
        {ingredient}
      </label>
    </div>
  );
}

function InstructionStep({ step, index }) {
  return (
    <div className="instruction-step d-flex mb-4">
      <div className="step-number me-3">
        <span className="step-badge rounded-circle px-3 py-2">
          {index + 1}
        </span>
      </div>
      <div className="step-content">
        <p className="step-text mb-0">{step}</p>
      </div>
    </div>
  );
}

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const recipe = recipes.find((r) => r.id.toString() === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!recipe) {
    return <div className="container py-4">Recipe not found</div>;
  }

  const isFavorite = favorites.some((f) => f.id === recipe.id);

  const handleBackClick = () => {
    // Set flag to indicate we should restore scroll position
    sessionStorage.setItem('shouldRestoreScroll', 'true');
    navigate('/');
  };

  return (
    <div className="recipe-detail-container">
      <div className="container py-5">
        {/* Hero Section */}
        <div className="row mb-5 align-items-center">
          {/* Image */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="img-fluid rounded-4 shadow-lg"
            />
          </div>

          {/* Header */}
          <div className="col-lg-6">
            <header className="recipe-header">
              <div className="recipe-category mb-3">
                <span className="badge recipe-badge px-3 py-2 rounded-pill">
                  {recipe.category}
                </span>
              </div>

              <h1 className="recipe-title mb-3">{recipe.name}</h1>

              <p className="recipe-description lead text-muted mb-4">
                {recipe.description}
              </p>

              {/* ✅ Action Buttons (Back + Favorite side by side) */}
              <div className="d-flex gap-3 mb-4">
                <button
                  className="back-button btn shadow-sm"
                  onClick={handleBackClick}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Recipes
                </button>

                <button
                  className={`btn rounded-pill favorite-btn ${
                    isFavorite ? "btn-remove" : "btn-add"
                  }`}
                  onClick={() =>
                    isFavorite
                      ? removeFavorite(recipe.id)
                      : addFavorite(recipe)
                  }
                >
                  <i
                    className={`bi ${
                      isFavorite ? "bi-heart-fill" : "bi-heart"
                    } me-2`}
                  ></i>
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            </header>
          </div>
        </div>

        {/* Main Content */}
        <div className="row">
          {/* Ingredients Section */}
          <section className="col-lg-4 mb-4">
            <div className="card recipe-card shadow-sm h-100">
              <div className="card-header recipe-section-header">
                <h3 className="section-title mb-0 fs-5">Ingredients</h3>
              </div>
              <div className="card-body p-3">
                {recipe.ingredients?.length ? (
                  recipe.ingredients.map((ingredient, i) => (
                    <IngredientItem
                      key={i}
                      ingredient={ingredient}
                      index={i}
                    />
                  ))
                ) : (
                  <p className="text-muted mb-0">No ingredients listed.</p>
                )}
              </div>
            </div>
          </section>

          {/* Instructions Section */}
          <section className="col-lg-8 mb-4">
            <div className="card recipe-card shadow-sm h-100">
              <div className="card-header recipe-section-header">
                <h3 className="section-title mb-0 fs-5">Instructions</h3>
              </div>
              <div className="card-body p-3">
                {recipe.instructions?.length ? (
                  recipe.instructions.map((step, i) => (
                    <InstructionStep key={i} step={step} index={i} />
                  ))
                ) : (
                  <p className="text-muted mb-0">No instructions available.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}