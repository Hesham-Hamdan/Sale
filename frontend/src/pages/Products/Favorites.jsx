import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="container mx-auto p-4 pt-24 lg:ml-24 lg:pt-6">
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <h1 className="text-2xl font-bold mb-4">
            You have no favorite items.
          </h1>
          <Link
            to="/shop"
            className="bg-pink-500 text-white py-2 px-6 rounded-full"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">
            FAVORITE PRODUCTS ({favorites.length})
          </h1>

          {/* RESPONSIVE GRID for displaying products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favorites.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
