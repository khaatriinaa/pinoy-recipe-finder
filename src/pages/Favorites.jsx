import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom"; 

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="container py-4">
      <h2>My Favorite Recipes</h2>
      <div className="row">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <div className="text-center mt-5">
            <p className="text-muted">No favorites yet. Add some delicious recipes!</p>
            <Link to="/" className="btn btn-warning mt-3 px-4 py-2">
                Explore Recipes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
