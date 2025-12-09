import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsList } from "react-icons/bs";
const Navbar = () => {
  var navigate = useNavigate();
 
  const [open, setOpen] = useState(false);
  const [isMobile] = useState(window.outerWidth <= 500);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  console.log(username);
  function mobilenav() {
    setOpen(true);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <div className="flex justify-between items-center p-2 shadow-md">
      {!isMobile ? (
        <>
         <Link to={"/"}>
           <img
            src="https://edupoly.in/assets/fullstack-training-hyderabad.png"
            width="180px"
            alt="logo"
          />
         </Link>

          <div className="flex items-center">
            {role == "admin" ? (
              <Link
                className="m-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md 
                            hover:shadow-lg transition"
              >
                ADMIN
              </Link>
            ) : (
              <Link
                className="m-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md 
                            hover:shadow-lg transition"
                to={`/dashboard/${userId}`}
              >
                Dashboard
              </Link>
            )}
            <div>
              {!token && (
                <Link
                  to={"/login"}
                  className="m-2 px-6 py-2 bg-blue-600 hover:bg-green-700 text-white rounded-lg shadow-md 
                          hover:shadow-lg transition"
                >
                  Login
                </Link>
              )}
            </div>
            <div>
              {token && (
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="m-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md 
                          hover:shadow-lg transition"
                >
                  Logout
                </button>
              )}
              {token && username && (
                <span className="mr-4 font-semibold text-white text-2xl">
                  Hello, {username.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <img
            src="https://edupoly.in/assets/fullstack-training-hyderabad.png"
            width="180px"
            alt="logo"
          />

          <div className="flex">
            <BsList
              className="text-white text-4xl"
              onClick={() => {
                mobilenav();
              }}
            />
          </div>
          {isMobile && open && (
  <div className="absolute right-2 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 z-50">
    
    <Link
      to={`/dashboard/${userId}`}
      className="block px-4 py-2 rounded hover:bg-gray-100"
      onClick={() => setOpen(false)}
    >
      Dashboard
    </Link>

    {!token && (
      <Link
        to={"/login"}
        className="block px-4 py-2 rounded hover:bg-gray-100"
        onClick={() => setOpen(false)}
      >
        Login
      </Link>
    )}

    {token && (
      <button
        onClick={() => {
          logout();
          setOpen(false);
        }}
        className="block px-4 py-2 rounded hover:bg-gray-100"
      >
        Logout
      </button>
    )}
  </div>
)}

        </>
      )}
    </div>
  );
};

export default Navbar;
