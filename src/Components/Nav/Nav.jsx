import { NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import SearchBar from "./Shared/SearchBar";
import usePackages from "../../Hooks/usePackages";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { packages } = usePackages();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = (
    <>
      <li className="transition duration-300 ease-in-out">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 font-semibold border-b-2 border-teal-600"
              : "text-gray-600 font-semibold hover:text-teal-600 transition duration-300 ease-in-out"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="transition duration-300 ease-in-out">
        {!user ? (
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive
                ? "text-teal-600 font-semibold border-b-2 border-teal-600"
                : "text-gray-600 font-semibold hover:text-teal-600 transition duration-300 ease-in-out"
            }
          >
            Community
          </NavLink>
        ) : (
          <NavLink
            to="/allPackages"
            className={({ isActive }) =>
              isActive
                ? "text-teal-600 font-semibold border-b-2 border-teal-600"
                : "text-gray-600 font-semibold hover:text-teal-600 transition duration-300 ease-in-out"
            }
          >
            Packages
          </NavLink>
        )}
      </li>
      <li className="transition duration-300 ease-in-out">
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 font-semibold border-b-2 border-teal-600"
              : "text-gray-600 font-semibold hover:text-teal-600 transition duration-300 ease-in-out"
          }
        >
          Blog
        </NavLink>
      </li>
      <li className="transition duration-300 ease-in-out">
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 font-semibold border-b-2 border-teal-600"
              : "text-gray-600 font-semibold hover:text-teal-600 transition duration-300 ease-in-out"
          }
        >
          About Us
        </NavLink>
      </li>
      <li className="transition duration-300 ease-in-out">
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 font-semibold border-b-2 border-teal-600"
              : "text-gray-600 font-semibold hover:text-teal-600 transition duration-300 ease-in-out"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar bg-gradient-to-r from-indigo-200 via-indigo-100 to-indigo-200 shadow-lg sticky top-0 z-50 px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu Button */}
        <div className="dropdown">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          {isMobileMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white text-gray-800 rounded-box w-52"
            >
              {navLinks}
              {/* Mobile SearchBar */}
              <li className="mt-3">
                <SearchBar packages={packages} />
              </li>
            </ul>
          )}
        </div>
        {/* Brand Logo */}
        <a className="btn btn-ghost text-xl text-teal-600 font-bold" href="/">
          BrandName
        </a>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal xl:space-x-8 px-1">{navLinks}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-4">
        {/* Desktop SearchBar */}
        <div className="hidden md:flex justify-end w-full">
          <SearchBar packages={packages} />
        </div>

        {/* User Authentication */}
        {user ? (
          <div className="dropdown dropdown-end ml-4">
            <div
              tabIndex={0}
              className="avatar btn btn-ghost btn-circle"
              role="button"
            >
              <img
                src={user.photoURL}
                alt={`${user.displayName}'s avatar`}
                className="w-10 h-10 rounded-full border-2 border-teal-500"
              />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white text-gray-800 rounded-box w-52"
            >
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className="hover:text-teal-500"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:text-teal-500">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="btn bg-teal-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-teal-600 transition ml-4"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
