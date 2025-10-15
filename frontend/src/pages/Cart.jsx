import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto p-4 pt-24 lg:ml-24 lg:pt-6">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link
            to="/shop"
            className="bg-pink-500 text-white py-2 px-6 rounded-full"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-8 lg:items-center">
            <h1 className="text-2xl font-semibold mb-4 ">Shopping Cart</h1>
            {/* Cart Items Section */}
            <div className="lg:w-2/3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 mb-4 p-4 bg-[#181818] rounded-lg"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-pink-500 text-sm md:text-base"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-1 text-xs md:text-sm text-gray-400">
                      {item.brand}
                    </div>
                    <div className="mt-1 font-bold text-sm md:text-base">
                      $ {item.price}
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-full p-2 border border-gray-700 rounded bg-[#242424] text-white"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary Section */}
            <div className="lg:w-2/3">
              <div className="p-6 bg-[#181818] rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                <div className="text-2xl font-bold mb-4">
                  ${" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </div>
                <button
                  className="bg-pink-500 py-2 px-4 rounded-full text-lg w-full"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
