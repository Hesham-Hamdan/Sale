// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import { Link } from "react-router-dom";
// import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
// import AdminMenu from "./AdminMenu";

// const OrderList = () => {
//   const { data: orders, isLoading, error } = useGetOrdersQuery();

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error.error}
//         </Message>
//       ) : (
//         <table className="container mx-auto">
//           <AdminMenu />

//           <thead className="w-full border">
//             <tr className="mb-[5rem]">
//               <th className="text-left pl-1">ITEMS</th>
//               <th className="text-left pl-1">ID</th>
//               <th className="text-left pl-1">USER</th>
//               <th className="text-left pl-1">DATA</th>
//               <th className="text-left pl-1">TOTAL</th>
//               <th className="text-left pl-1">PAID</th>
//               <th className="text-left pl-1">DELIVERED</th>
//               <th></th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>
//                   <img
//                     src={order.orderItems[0].image}
//                     alt={order._id}
//                     className="w-[5rem] pt-4"
//                   />
//                 </td>
//                 <td>{order._id}</td>

//                 <td>{order.user ? order.user.username : "N/A"}</td>

//                 <td>
//                   {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
//                 </td>

//                 <td>$ {order.totalPrice}</td>

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

//                 <td>
//                   <Link to={`/order/${order._id}`}>
//                     <button className="bg-pink-400 text-back py-2 px-3 rounded cursor-pointer">
//                       More
//                     </button>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </>
//   );
// };

// export default OrderList;

import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <AdminMenu />
          {/* This wrapper allows the table to scroll horizontally on small screens */}
          <div className="overflow-x-auto lg:ml-20 lg:my-0 mt-15">
            <table className="w-full text-sm md:text-base">
              <thead className="border-b-2 border-gray-700">
                <tr>
                  <th className="p-2 text-left">ITEMS</th>
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">USER</th>
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
                    <td className="p-2">
                      <img
                        src={order.orderItems[0].image}
                        alt={order._id}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-2 whitespace-nowrap">{order._id}</td>
                    <td className="p-2">
                      {order.user ? order.user.username : "N/A"}
                    </td>
                    <td className="p-2">
                      {order.createdAt
                        ? order.createdAt.substring(0, 10)
                        : "N/A"}
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
                        <button className="bg-pink-500 text-white py-1 px-3 rounded cursor-pointer">
                          More
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default OrderList;
