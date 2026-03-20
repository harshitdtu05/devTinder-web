import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-white text-xl">
          devTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-3 mx-3">
          <p className="font-thin font-serif px-4">
            Welcome, {user?.firstName}
          </p>

          <div className="relative">
            <details>
              <summary className="list-none cursor-pointer">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    alt="Profile"
                    src={user?.photoUrl}
                    className="w-full h-full object-cover"
                  />
                </div>
              </summary>
              <ul className="bg-gray-100 bg-opacity-25 rounded-box shadow-md p-2 absolute right-0 top-12 w-32 z-50">
                <li>
                  <Link
                    to="/profile"
                    className="cursor-pointer text-sm hover:-translate-y-1"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="cursor-pointer text-sm">
                    Settings
                  </Link>
                </li>
              </ul>
            </details>
          </div>
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/connections">Connections</Link>
            </li>
          </ul>
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/requests">Requests</Link>
            </li>
          </ul>
          <ul className="menu menu-horizontal px-1">
            <li>
              <a onClick={handleClickLogout}>Logout</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
