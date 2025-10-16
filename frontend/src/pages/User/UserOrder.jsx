import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="container mx-auto p-4 lg:ml-20 lg:my-0 mt-15">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="border-b-2 border-gray-700">
                <th className="p-2 text-left">IMAGE</th>
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">DATE</th>
                <th className="p-2 text-left">TOTAL</th>
                <th className="p-2 text-left">PAID</th>
                <th className="p-2 text-left">DELIVERED</th>
                <th className="p-2"></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-800">
                  {/* ✅ Fixed HTML structure: <img> is inside a <td> */}
                  <td className="p-2">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.user}
                      className="w-16 h-16 object-cover"
                    />
                  </td>

                  <td className="p-2 whitespace-nowrap">{order._id}</td>
                  <td className="p-2 whitespace-nowrap">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="p-2">$ {order.totalPrice}</td>

                  <td className="p-2">
                    {order.isPaid ? (
                      <p className="p-1 text-center bg-green-500 text-white rounded-full text-xs">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-500 text-white rounded-full text-xs">
                        Pending
                      </p>
                    )}
                  </td>

                  <td className="p-2">
                    {order.isDelivered ? (
                      <p className="p-1 text-center bg-green-500 text-white rounded-full text-xs">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-500 text-white rounded-full text-xs">
                        Pending
                      </p>
                    )}
                  </td>

                  <td className="p-2">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-pink-500 text-sm text-white py-1 px-3 rounded cursor-pointer">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
