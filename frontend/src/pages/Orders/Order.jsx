import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="container mx-auto p-4 pt-24 lg:ml-24 lg:pt-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="border border-gray-700 p-4 rounded-lg">
            {order.orderItems.length === 0 ? (
              <Messsage>Order is empty</Messsage>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead className="border-b-2 border-gray-700">
                    <tr>
                      <th className="p-2 text-left">Image</th>
                      <th className="p-2 text-left">Product</th>
                      <th className="p-2 text-center">Quantity</th>
                      <th className="p-2 text-center">Unit Price</th>
                      <th className="p-2 text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="p-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="p-2">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </td>
                        <td className="p-2 text-center">{item.qty}</td>
                        <td className="p-2 text-center">$ {item.price}</td>
                        <td className="p-2 text-center">
                          $ {(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="border border-gray-700 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Shipping</h2>
            <p className="mb-2">
              <strong>Order:</strong> {order._id}
            </p>
            <p className="mb-2">
              <strong>Name:</strong> {order.user.username}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {order.user.email}
            </p>
            <p className="mb-2">
              <strong>Address:</strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            <p className="mb-4">
              <strong>Method:</strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Messsage variant="success">
                Paid on {order.paidAt.substring(0, 10)}
              </Messsage>
            ) : (
              <Messsage variant="danger">Not paid</Messsage>
            )}
          </div>

          <div className="border border-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>$ {order.itemsPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$ {order.shippingPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>$ {order.taxPrice}</span>
            </div>
            <hr className="my-2 border-gray-700" />
            <div className="flex justify-between mb-2 font-bold">
              <span>Total</span>
              <span>$ {order.totalPrice}</span>
            </div>

            {!order.isPaid && (
              <div>
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                )}
              </div>
            )}

            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <button
                  type="button"
                  className="bg-pink-500 text-white w-full py-2 mt-4 rounded"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
