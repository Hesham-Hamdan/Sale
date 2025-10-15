import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import "./Navigation.css";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div
        id="navigation-container"
        className="hidden lg:flex flex-col p-4 text-white bg-black w-20 hover:w-56 h-screen fixed top-0 left-0 z-50 transition-all duration-300 group "
        onMouseLeave={handleMouseLeave}
      >
        {/* Top Navigation Links */}
        <div className="flex flex-col space-y-15 mt-10">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome size={26} />
            <span className="hidden group-hover:inline ml-4">HOME</span>
          </Link>

          <Link
            to="/shop"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShopping size={26} />
            <span className="hidden group-hover:inline ml-4">SHOP</span>
          </Link>
          {userInfo && (
            <>
              <Link
                to="/cart"
                className="flex items-center transition-transform transform hover:translate-x-2 relative"
              >
                <AiOutlineShoppingCart size={26} />
                <span className="hidden group-hover:inline ml-4">CART</span>
                {cartItems.length > 0 && (
                  <div className="absolute -top-3 left-4">
                    <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </span>
                  </div>
                )}
              </Link>

              <Link
                to="/favorite"
                className="flex items-center transition-transform transform hover:translate-x-2 relative"
              >
                <FaHeart size={26} />
                <span className="hidden group-hover:inline ml-4">
                  FAVORITES
                </span>
                <FavoritesCount />
              </Link>
            </>
          )}
        </div>

        {/* Spacer to push user section to the bottom */}
        <div className="flex-grow"></div>

        {/* Bottom User/Profile Section */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-white focus:outline-none w-full justify-center lg:justify-start"
          >
            {userInfo ? (
              <>
                <span className="hidden group-hover:inline">
                  {userInfo.username}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            ) : null}
          </button>

          {dropdownOpen && userInfo && (
            <ul className="absolute bottom-full mb-2 w-full bg-gray-800 rounded-md">
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/productlist"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/categorylist"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/orderlist"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/userlist"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Users
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

          {!userInfo && (
            <div className="flex flex-col items-center space-y-6 ">
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:translate-x-2 "
              >
                <AiOutlineLogin size={26} />
                <span className="hidden group-hover:inline ml-4">LOGIN</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden group-hover:inline ml-4">REGISTER</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 w-full bg-black text-white flex justify-around items-center py-3 z-50">
        <Link to="/" className="flex flex-col items-center justify-center">
          <AiOutlineHome size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/shop" className="flex flex-col items-center justify-center">
          <AiOutlineShopping size={24} />
          <span className="text-xs mt-1">Shop</span>
        </Link>
        {userInfo && (
          <>
            <Link
              to="/cart"
              className="flex flex-col items-center justify-center relative"
            >
              <AiOutlineShoppingCart size={24} />
              <span className="text-xs mt-1">Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1.5 px-1.5 py-0.5 text-xs font-bold text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
            <Link
              to="/favorite"
              className="flex flex-col items-center justify-center relative"
            >
              <FaHeart size={24} />
              <span className="text-xs mt-1">Favorites</span>
              <FavoritesCount mobile={true} />
            </Link>
          </>
        )}

        {userInfo ? (
          <button
            onClick={toggleMobileMenu}
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <AiOutlineUser size={24} />
            <span className="text-xs mt-1">{userInfo.username}</span>
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="flex flex-col items-center justify-center"
            >
              <AiOutlineLogin size={24} />
              <span className="text-xs mt-1">Login</span>
            </Link>
            <Link
              to="/register"
              className="flex flex-col items-center justify-center"
            >
              <AiOutlineUserAdd size={24} />
              <span className="text-xs mt-1">REGISTER</span>
            </Link>
          </>
        )}
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && userInfo && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={toggleMobileMenu}
          ></div>

          {/* Menu Content */}
          <ul className="absolute top-16 right-4 w-56 bg-gray-800 rounded-md text-white">
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    onClick={toggleMobileMenu}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    onClick={toggleMobileMenu}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    onClick={toggleMobileMenu}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    onClick={toggleMobileMenu}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    onClick={toggleMobileMenu}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/profile"
                onClick={toggleMobileMenu}
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navigation;
