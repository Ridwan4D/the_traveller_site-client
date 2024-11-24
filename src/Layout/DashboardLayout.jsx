import { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { CgProfile } from "react-icons/cg";
import useAdmin from "../Hooks/useAdmin";
import { HiUserGroup } from "react-icons/hi";
import { TbPackages } from "react-icons/tb";
import { TiHomeOutline } from "react-icons/ti";
import useGuide from "../Hooks/useGuide";
import {
  MdAddCard,
  MdAssignmentAdd,
  MdAssignmentTurnedIn,
  MdOutlineAssignment,
} from "react-icons/md";
import { VscGitPullRequestCreate } from "react-icons/vsc";

const DashboardLayout = () => {
  const { logout } = useAuth();
  const { isAdmin } = useAdmin();
  const { isGuide } = useGuide();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  //   console.log(isGuide, isAdmin);
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      {/* Mobile trigger */}
      <button
        title="Side navigation"
        type="button"
        className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45"
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? "true" : "false"}
        aria-controls="nav-menu-3"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </button>

      {/* Side Navigation */}
      <aside
        id="nav-menu-3"
        aria-label="Side navigation"
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          to="/"
          aria-label="WindUI logo"
          className="flex items-center gap-2 whitespace-nowrap p-6 text-xl font-medium focus:outline-none"
        >
          <img
            src="https://res.cloudinary.com/duv5fiurz/image/upload/v1732204179/2_lmjnt4.png"
            alt=""
            className="w-10 h-10"
          />
          Traveler Site
        </Link>
        <hr />
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <ul className="flex flex-1 flex-col gap-1 py-3">
            <li className="px-3">
              <NavLink
                to="profile"
                className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500"
              >
                <div className="flex items-center self-center">
                  <CgProfile />
                </div>
                <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                  Profile
                </div>
              </NavLink>
            </li>
            {isAdmin && (
              <>
                <li>
                  <NavLink
                    to="addPackage"
                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500"
                  >
                    <MdAddCard />
                    <span>Add Package</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manageUsers"
                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500"
                  >
                    <HiUserGroup />
                    <span>Manage Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="managePackages"
                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500"
                  >
                    <TbPackages />
                    <span>Manage Packages</span>
                  </NavLink>
                </li>
              </>
            )}
            {isGuide && (
              <>
                <li>
                  <NavLink
                    to="assignedTour"
                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500"
                  >
                    <MdAssignmentTurnedIn />
                    <span>My Assigned Tours</span>
                  </NavLink>
                </li>
              </>
            )}
            {!isAdmin && !isGuide && (
              <>
                <li>
                  <NavLink
                    to="wishlist"
                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500"
                  >
                    <MdOutlineAssignment />
                    <span>My Wishlist</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="bookings"
                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500"
                  >
                    <MdAssignmentAdd />
                    <span>My Bookings</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="requestToAdmin"
                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500"
                  >
                    <VscGitPullRequestCreate />
                    <span>Request To Admin</span>
                  </NavLink>
                </li>
              </>
            )}
            <hr />
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500"
              >
                <div className="flex items-center self-center">
                  <TiHomeOutline />
                </div>
                <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                  Home
                </div>
              </Link>
            </li>
          </ul>
        </nav>
        <footer className="border-t border-slate-200 p-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded p-3 text-slate-900 transition-colors hover:text-emerald-500"
          >
            <div className="flex items-center self-center ">
              <RiLogoutCircleLine />
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium">
              Logout
            </div>
          </button>
        </footer>
      </aside>

      {/* Backdrop */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>

      {/* Content area for child components */}
      <main className="ml-0 lg:ml-72 p-2 md:p-6">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
