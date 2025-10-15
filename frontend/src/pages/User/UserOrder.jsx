// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import { Link } from "react-router-dom";
// import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

// const UserOrder = () => {
//   const { data: orders, isLoading, error } = useGetMyOrdersQuery();

//   return (
//     <div className="container mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">My Orders </h2>

//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error?.data?.error || error.error}</Message>
//       ) : (
//         <table className="w-full">
//           <thead>
//             <tr>
//               <td className="py-2">IMAGE</td>
//               <td className="py-2">ID</td>
//               <td className="py-2">DATE</td>
//               <td className="py-2">TOTAL</td>
//               <td className="py-2">PAID</td>
//               <td className="py-2">DELIVERED</td>
//               <td className="py-2"></td>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <img
//                   src={order.orderItems[0].image}
//                   alt={order.user}
//                   className="w-[6rem] mb-5"
//                 />

//                 <td className="py-2">{order._id}</td>
//                 <td className="py-2">{order.createdAt.substring(0, 10)}</td>
//                 <td className="py-2">$ {order.totalPrice}</td>

//                 <td className="py-2">
//                   {order.isPaid ? (
//                     <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
//                       Completed
//                     </p>
//                   ) : (
//                     <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
//                       Pending
//                     </p>
//                   )}
//                 </td>

//                 <td className="px-2 py-2">
//                   {order.isDelivered ? (
//                     <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
//                       Completed
//                     </p>
//                   ) : (
//                     <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
//                       Pending
//                     </p>
//                   )}
//                 </td>

//                 <td className="px-2 py-2">
//                   <Link to={`/order/${order._id}`}>
//                     <button className="bg-pink-400 text-back py-2 px-3 rounded cursor-pointer">
//                       View Details
//                     </button>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserOrder;

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
