import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const handleRecipeClick = () => {
    // Save current scroll position before navigating
    const currentScrollPos = window.scrollY || window.pageYOffset;
    console.log('Saving scroll position:', currentScrollPos); // Debug log
    sessionStorage.setItem('recipeListScrollPosition', currentScrollPos.toString());
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="recipe-card bg-white rounded shadow-sm p-2 h-100 d-flex flex-column">
        <div className="image-wrapper">
          <img src={recipe.image} alt={recipe.name} className="recipe-img" />
          <div className="overlay">
            <Link 
              to={`/recipe/${recipe.id}`} 
              className="btn btn-light btn-sm"
              onClick={handleRecipeClick}
            >
              View Recipe
            </Link>
          </div>
        </div>
        <div className="dish-name-tag">{recipe.name}</div>
        <div className="recipe-info text-center mt-3 px-3">
          <p className="recipe-description text-muted">{recipe.description}</p>
        </div>
      </div>
    </div>
  );
}