import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    // MAIN PAGE WRAPPER: Handles spacing for navigation bars
    <div className="container mx-auto p-4 pt-24 lg:ml-24 lg:pt-6">
      <AdminMenu />

      <div className="mb-6">
        <h1 className="text-2xl font-bold">All Products ({products.length})</h1>
      </div>

      {/* RESPONSIVE PRODUCT LIST */}
      <div className="flex flex-col gap-6 lg:w-5/6">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/admin/product/update/${product._id}`}
            className="block p-4 bg-[#181818] rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            {/* RESPONSIVE PRODUCT CARD */}
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 sm:w-40 sm:h-40 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start">
                    <h5 className="text-xl font-semibold mb-2">
                      {product?.name}
                    </h5>
                    <p className="text-gray-400 text-xs whitespace-nowrap">
                      {moment(product.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {product?.description?.substring(0, 160)}...
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg">
                    Update Product
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </span>
                  <p className="font-bold text-lg">$ {product?.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
