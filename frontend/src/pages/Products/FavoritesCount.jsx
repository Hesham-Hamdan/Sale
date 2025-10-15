import { useSelector } from "react-redux";

const FavoritesCount = ({ mobile }) => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute left-4 -top-3">
      {favoriteCount > 0 && (
        <span
          className={
            mobile
              ? "absolute top-2 -right-6.5 px-1.5 py-0.5 text-xs font-bold text-white bg-pink-500 rounded-full"
              : "px-1 py-0 text-sm text-white bg-pink-500 rounded-full"
          }
        >
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
