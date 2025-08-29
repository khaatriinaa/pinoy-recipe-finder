import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext";

export default function Header() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <nav className="navbar navbar-expand-lg shadow-sm fixed-top" style={{ backgroundColor: "#f5a623", zIndex: 1000 }}>
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">
          Filipino Cookbook
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link fw-bold text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold text-white" to="/favorites">
                Favorites {" "}
                <span className="badge bg-light text-dark">
                  {favorites.length}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
