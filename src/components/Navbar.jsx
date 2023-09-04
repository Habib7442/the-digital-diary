import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import svg from "../assets/logopng.png";
import { Paper, Stack } from "@mui/material";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <>
      <div className="w-full flex justify-between p-2">
        <div className="logo">
          <Link>
            <img src={svg} alt="" width={80} height={80} />
          </Link>
        </div>

        <h5 className="text-white">Login to write</h5>

        <div className="currentUser flex gap-2 mt-2">
          {currentUser ? (
            <div className="space-x-2">
              <span className="text-white">{currentUser?.email}</span>
              <button
                onClick={logout}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-black font-bold text-xs">
              <button className="bg-teal-200 px-4 py-2 rounded">Login</button>
            </Link>
          )}
          {currentUser && (
            <div className="write mr-4">
              <Link to="/write" className="text-teal-500 font-bold text-xs">
                Write
              </Link>
            </div>
          )}
        </div>
      </div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap py-2 flex-col md:flex-row items-center">
          <nav className="md:ml-auto md:mr-auto flex flex-wrap mt-4 mb-4 items-center text-base justify-center">
            <Link className="mr-5" to="/new?cat=coding">
              <button className="bg-red-400 hover:bg-red-600 text-xs text-white font-bold py-2 px-2 rounded">
                CODING
              </button>
            </Link>
            <Link className="mr-5" to="/new?cat=art">
              <button className="bg-blue-400 hover:bg-blue-600 text-xs text-white font-bold py-2 px-4 rounded">
                ART
              </button>
            </Link>
            <Link className="mr-5" to="/new?cat=movie">
              <button className="bg-green-400 hover:bg-green-600 text-xs text-white font-bold py-2 px-4 rounded">
                MOVIE
              </button>
            </Link>
            <Link className="mr-5" to="/new?cat=sports">
              <button className="bg-yellow-400 hover:bg-yellow-600 text-xs text-white font-bold py-2 px-4 rounded">
                SPORTS
              </button>
            </Link>
            <Link className="mr-5" to="/new?cat=food">
              <button className="bg-pink-400 hover:bg-pink-600 text-xs text-white font-bold py-2 px-4 rounded">
                FOOD
              </button>
            </Link>
            <Link className="mr-5" to="/new?cat=technology">
              <button className="bg-purple-400 hover:bg-purple-600 text-xs text-white font-bold py-2 px-4 rounded">
                TECHNOLOGY
              </button>
            </Link>
            <Link className="mr-5" to="/new?cat=business">
              <button className="bg-orange-400 hover:bg-orange-600 text-white text-xs font-bold py-2 px-2 rounded">
                BUSINESS
              </button>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
