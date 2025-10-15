import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full">
      {/* Tab Buttons */}
      <div className="flex flex-row md:flex-col border-b md:border-b-0 md:border-r border-gray-700">
        <button
          className={`flex-1 p-4 text-lg text-left ${
            activeTab === 1
              ? "font-bold border-b-2 md:border-b-0 md:border-r-2 border-pink-500"
              : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </button>
        <button
          className={`flex-1 p-4 text-lg text-left ${
            activeTab === 2
              ? "font-bold border-b-2 md:border-b-0 md:border-r-2 border-pink-500"
              : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </button>
        <button
          className={`flex-1 p-4 text-lg text-left ${
            activeTab === 3
              ? "font-bold border-b-2 md:border-b-0 md:border-r-2 border-pink-500"
              : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-grow w-full">
        {/* Write Review Tab */}
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg w-full md:max-w-md bg-[#242424] text-white border-gray-600"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>
                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg w-full md:max-w-md bg-[#242424] text-white border-gray-600"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please{" "}
                <Link to="/login" className="text-pink-500">
                  sign in
                </Link>{" "}
                to write a review
              </p>
            )}
          </div>
        )}

        {/* All Reviews Tab */}
        {activeTab === 2 && (
          <div className="mt-4">
            {product.reviews.length === 0 && <p>No Reviews</p>}
            <div className="flex flex-col gap-4">
              {product.reviews.map((review) => (
                <div key={review._id} className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="flex justify-between">
                    <strong className="text-[#B0B0B0]">{review.name}</strong>
                    <p className="text-[#B0B0B0]">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p className="my-4">{review.comment}</p>
                  <Ratings value={review.rating} className="text-pink-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products Tab */}
        {activeTab === 3 && (
          <div className="mt-4">
            {!data ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((product) => (
                  <div key={product._id}>
                    <SmallProduct product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
