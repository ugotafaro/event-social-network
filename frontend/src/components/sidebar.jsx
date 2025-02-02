import React from "react";
import { Compass } from "lucide-react";
import { Heart } from "lucide-react";
import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Sidebar({ user }) {
  const [activeTab, setActiveTab] = useState();
  const location = useLocation();

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed bg-white top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col m-3 mb-6">
          <span className="text-indigo-500 text-5xl font-bold">Discover</span>
          <span className=" ml-20 text-5xl font-bold">Events</span>
        </div>

        <Link
          to="/profile"
          className="flex items-center px-3 py-3 space-x-3 hover:bg-gray-300 m-2 rounded-lg"
        >
          <img
            className="w-13 h-13 mb-3 rounded-full shadow-lg"
            src="/me.jpeg"
            alt="Bonnie image"
          />
          <h2 className="text-lg font-semibold">{user?.email}</h2>
        </Link>

        <div className="h-full px-3 py-4 overflow-y-auto ">
          <ul className="flex flex-col gap-3 font-medium">
            <Link to="/">
              <a
                href="#"
                className={`flex items-center p-2 ${
                  location.pathname === "/" ? "text-blue-500" : "text-gray-900"
                }  rounded-lg  hover:bg-gray-300  group`}
              >
                <Compass className="w-5 h-5  transition duration-75 " />

                <span className="ms-3">Discover events</span>
              </a>
            </Link>
            <Link to="/liked-event">
              <a
                href="#"
                className={`flex items-center p-2  rounded-lg hover:bg-gray-300 ${
                  location.pathname.includes("liked-event")
                    ? "text-blue-500"
                    : "text-gray-900"
                } group`}
              >
                <Heart className="shrink-0 w-5 h-5 transition duration-75  " />

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Liked events
                </span>
              </a>
            </Link>
            <Link to="/login">
              <a
                href="#"
                className={`flex items-center p-2 = rounded-lg text-gray-900   hover:bg-gray-300  group`}
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                <LogOut className="shrink-0 w-5 h-5 transition duration-75  " />

                <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
              </a>
            </Link>
          </ul>
        </div>
      </aside>
    </>
  );
}
