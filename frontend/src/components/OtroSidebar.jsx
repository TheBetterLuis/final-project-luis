import { useLocation } from "react-router-dom";
import { navRoutes } from "./navConfig";
import { useNavigate } from "react-router-dom";

function OtroSidebar({ buttons = null, userData = null }) {
  const navigate = useNavigate();
  const myLocation = useLocation();
  const locationName = myLocation.pathname.slice(1);
  const currentRoute = navRoutes[locationName] || navRoutes.default;

  return (
    <>
      {/*<div className="absolute w-full h-screen bg-black/30 top-0 right-0"></div>*/}
      <div
        aria-modal="true"
        aria-describedby="drawer-dialog-:r1:"
        role="dialog"
        data-testid="flowbite-drawer"
        className="fixed z-40 overflow-y-auto p-4 transition-transform dark:bg-gray-800 left-0 top-0 h-screen w-80 transform-none bg-azul6 sidebar-toggle hidden"
      >
        <div>
          <h5
            className="mb-4 inline-flex items-center text-base font-semibold text-white dark:text-gray-400"
            id=":r1:"
          >
            MENU
          </h5>
          {userData !== null && (
            <img
              src={`${userData.profilePicture}`}
              alt="user profile image"
              className="rounded-full border border-4 border-[#074572] dark:border-gray-400 w-36 h-36 mx-auto mb-6 cursor-pointer"
              onClick={() => {
                navigate("/profilepicture");
              }}
            />
          )}

          {userData === null && <div className="my-4"></div>}

          <button
            data-testid="close-drawer"
            className="group absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-white hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                document
                  .querySelector(".sidebar-toggle")
                  .classList.toggle("hidden");

                document
                  .querySelector(".wrapper")
                  .classList.remove("bg-black/30");
              }}
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <span className="hidden" id="flowbite-drawer-header-:r3:"></span>
        </div>
        <div data-testid="flowbite-drawer-items">
          <div className="grid place-items-center gap-9">
            {buttons !== null &&
              buttons.map((theButton) => (
                <button
                  type="button"
                  className="group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 bg-azul2 text-gray-100 rounded w-36 h-12 drop-shadow-lg hover:-translate-y-1 hover:scale-110 duration-300"
                  onClick={() => {
                    window.location.href = `/#${theButton.link}`;
                  }}
                >
                  <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm">
                    {`${theButton.name}`}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OtroSidebar;
