import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen
            ? "lg:top-2 lg:right-2 top-17 right-4"
            : "lg:top-5 lg:right-7 top-20 right-9"
        } bg-[#151515] p-2 fixed rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-[#151515] p-4 fixed lg:right-7 lg:top-5  top-20 right-9">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;

// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { FaTimes } from "react-icons/fa";

// const AdminMenu = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <>
//       {/* This button is now positioned below a typical top-nav height */}
//       <button
//         className="fixed top-20 right-4 bg-[#151515] p-2 rounded-lg z-50"
//         onClick={toggleMenu}
//       >
//         {isMenuOpen ? (
//           <FaTimes color="white" />
//         ) : (
//           <>
//             <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
//             <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
//             <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
//           </>
//         )}
//       </button>

//       {isMenuOpen && (
//         <section className="bg-[#151515] p-4 fixed right-4 top-20 rounded-lg z-50">
//           <ul className="list-none mt-12">
//             <li>
//               <NavLink
//                 className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
//                 to="/admin/dashboard"
//                 style={({ isActive }) => ({
//                   color: isActive ? "greenyellow" : "white",
//                 })}
//               >
//                 Admin Dashboard
//               </NavLink>
//             </li>
//             {/* ... other list items ... */}
//             <li>
//               <NavLink
//                 className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
//                 to="/admin/orderlist"
//                 style={({ isActive }) => ({
//                   color: isActive ? "greenyellow" : "white",
//                 })}
//               >
//                 Manage Orders
//               </NavLink>
//             </li>
//           </ul>
//         </section>
//       )}
//     </>
//   );
// };

// export default AdminMenu;
