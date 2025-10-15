import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    // MAIN PAGE WRAPPER
    <div className="container mx-auto p-4 pt-24 lg:ml-24 lg:pt-6">
      <ProgressSteps step1 step2 step3 />

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Left Side: Order Items & Shipping Details */}
        <div className="lg:w-2/3">
          {cart.cartItems.length === 0 ? (
            <Message>Your cart is empty</Message>
          ) : (
            <div className="overflow-x-auto bg-[#181818] p-4 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
              <table className="w-full text-sm md:text-base">
                <thead className="border-b-2 border-gray-700">
                  <tr>
                    <th className="p-2 text-left">Image</th>
                    <th className="p-2 text-left">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2 text-center">Price</th>
                    <th className="p-2 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>
                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">
                        $ {item.price.toFixed(2)}
                      </td>
                      <td className="p-2 text-center">
                        $ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 bg-[#181818] p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Shipping & Payment</h2>
            <p className="mb-4">
              <strong>Address:</strong> {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
              {cart.shippingAddress.country}
            </p>
            <p>
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-[#181818] p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <ul className="text-lg space-y-2">
              <li>
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>$ {cart.itemsPrice}</span>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>$ {cart.shippingPrice}</span>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>$ {cart.taxPrice}</span>
                </div>
              </li>
              <hr className="my-2 border-gray-700" />
              <li>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>$ {cart.totalPrice}</span>
                </div>
              </li>
            </ul>

            {error && (
              <Message variant="danger" extraClasses="mt-4">
                {error.data.message}
              </Message>
            )}

            <button
              type="button"
              className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-6"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
