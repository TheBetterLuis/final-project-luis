import { Navbar } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { navRoutes } from "./navConfig";

export function NavBar() {
  const myLocation = useLocation();
  const locationName = myLocation.pathname.startsWith("/#")
    ? myLocation.pathname.slice(2).split("/")[0]
    : myLocation.pathname.split("/")[1]; // Adjust for hash routing
  //const locationName = myLocation.pathname.slice(1);
  const currentRoute = navRoutes[locationName] || navRoutes.default;

  const textStyles = {
    color:
      "text-white dark:text-white hover:text-black md:hover:text-gray-400 md:dark:hover:text-gray-400",
  };

  return (
    <Navbar className="bg-azul6">
      <Navbar.Brand href={`/#${currentRoute.logo.link}`}>
        <img
          src="../../public/img/logo1.png"
          className="mr-3 h-6 sm:h-9"
          alt="L&E Telecoms Logo"
        />
      </Navbar.Brand>
      <div className="flex">
        {currentRoute.drawer.display && (
          <button
            className="inline-flex items-center rounded-lg p-2 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden text-white dark:text-white hover:text-black md:hover:text-gray-400 md:dark:hover:text-gray-400"
            onClick={() =>
              document
                .querySelector(".sidebar-toggle")
                .classList.toggle("hidden")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="2em"
              RoutesRoutes
              height="2em"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        )}
        <Navbar.Toggle className={`${textStyles.color}`} />
      </div>
      <Navbar.Collapse>
        {currentRoute.drawer.display && (
          <Navbar.Link
            className={`${textStyles.color}`}
            onClick={() =>
              document
                .querySelector(".sidebar-toggle")
                .classList.toggle("hidden")
            }
          >
            {currentRoute.drawer.title}
          </Navbar.Link>
        )}

        <Navbar.Link
          href={`/#${currentRoute.first.link}`}
          className={`${textStyles.color}`}
        >
          {currentRoute.first.name}
        </Navbar.Link>
        <Navbar.Link
          href={`/#${currentRoute.second.link}`}
          className={`${textStyles.color}`}
        >
          {currentRoute.second.name}
        </Navbar.Link>
        <Navbar.Link
          href={`/#${currentRoute.third.link}`}
          className={`${textStyles.color}`}
        >
          {currentRoute.third.name}
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
