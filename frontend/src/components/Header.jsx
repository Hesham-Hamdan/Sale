import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";
import Message from "./Message";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">ERROR</Message>;
  }

  return (
    <div className="mx-auto p-4 flex justify-around ">
      <div className="block lg:hidden">
        <div className="grid grid-cols-2 gap-4">
          {data.map((product) => (
            <div key={product._id}>
              <SmallProduct product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;
