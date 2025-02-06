import { useLocation } from "react-router-dom";
import { navRoutes } from "./navConfig";

function CustomSidebar({ name, lastName, image }) {
  const myLocation = useLocation();
  const locationName = myLocation.pathname.slice(1);
  const currentRoute = navRoutes[locationName] || navRoutes.default;

  return (
    <div
      aria-modal="true"
      aria-describedby="drawer-dialog-:r1:"
      role="dialog"
      tabindex="-1"
      data-testid="flowbite-drawer"
      class="fixed z-40 overflow-y-auto p-4 transition-transform dark:bg-gray-800 left-0 top-0 h-screen w-80 transform-none bg-white/30 sidebar-toggle hidden"
    >
      <div class="">
        <h5
          class="mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
          id=":r1:"
        >
          MENU
        </h5>
        <img
          src={image || `${currentRoute.drawer.image.src}`}
          alt="user profile image"
          className="rounded-full border border-4 border-[#074572] dark:border-gray-400 w-36 h-36 mx-auto mb-6"
        />
        <button
          data-testid="close-drawer"
          class="group absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="h-4 w-4"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() =>
              document
                .querySelector(".sidebar-toggle")
                .classList.toggle("hidden")
            }
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
          <span class="sr-only">Close menu</span>
        </button>
        <span class="hidden" id="flowbite-drawer-header-:r3:"></span>
      </div>
      <div data-testid="flowbite-drawer-items" class="">
        <div class="grid place-items-center gap-9">
          <button
            type="button"
            class="group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 bg-azul2 text-gray-100 rounded w-36 h-12 drop-shadow-lg hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={() => {
              window.location.href = `/#${currentRoute.drawer.buttons.first.link}`;
            }}
          >
            <span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm">
              {`${name || "Nombre"} ${lastName || "Usuario"}`}
            </span>
          </button>

          <button
            type="button"
            class="group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 bg-azul2 text-gray-100 rounded w-36 h-12 drop-shadow-lg hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={() => {
              window.location.href = `/#${currentRoute.drawer.buttons.first.link}`;
            }}
          >
            <span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm">
              {currentRoute.drawer.buttons.first.name}
            </span>
          </button>
          <button
            type="button"
            class="group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 bg-azul2 text-gray-100 rounded w-36 h-12 drop-shadow-lg hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={() => {
              window.location.href = `/#${currentRoute.drawer.buttons.second.link}`;
            }}
          >
            <span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm">
              {currentRoute.drawer.buttons.second.name}
            </span>
          </button>
          <button
            type="button"
            class="group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 bg-azul2 text-gray-100 rounded w-36 h-12 drop-shadow-lg hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={() => {
              window.location.href = `/#${currentRoute.drawer.buttons.third.link}`;
            }}
          >
            <span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm">
              {currentRoute.drawer.buttons.third.name}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomSidebar;
