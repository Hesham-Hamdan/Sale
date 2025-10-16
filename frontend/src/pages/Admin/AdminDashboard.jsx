import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales = [], isLoading } = useGetTotalSalesQuery();
  const { data: customers = [], isLoading: loading } = useGetUsersQuery();
  const { data: orders = [], isLoading: loadingTwo } = useGetTotalOrdersQuery();

  return (
    <>
      <AdminMenu />

      <section className="p-4 pt-24 lg:ml-24 lg:pt-6">
        {/* STATS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sales Card */}
          <div className="rounded-lg bg-black p-5">
            <div className="font-bold rounded-full w-12 h-12 bg-pink-500 flex justify-center items-center text-xl">
              $
            </div>
            <p className="mt-5">Sales</p>
            <h1 className="text-2xl font-bold">
              $ {isLoading ? <Loader /> : sales?.totalSales.toFixed(2)}
            </h1>
          </div>
          {/* Customers Card */}
          <div className="rounded-lg bg-black p-5">
            <div className="font-bold rounded-full w-12 h-12 bg-pink-500 flex justify-center items-center text-xl">
              $
            </div>
            <p className="mt-5">Customers</p>
            <h1 className="text-2xl font-bold">
              {loading ? <Loader /> : customers?.length}
            </h1>
          </div>
          {/* Orders Card */}
          <div className="rounded-lg bg-black p-5">
            <div className="font-bold rounded-full w-12 h-12 bg-pink-500 flex justify-center items-center text-xl">
              $
            </div>
            <p className="mt-5">All Orders</p>
            <h1 className="text-2xl font-bold">
              {loadingTwo ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>
        <div className="mt-12 p-4 bg-black rounded-lg w-full">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
