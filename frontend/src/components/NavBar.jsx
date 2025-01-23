import { Navbar } from "flowbite-react";
import { useLocation } from "react-router-dom";

export function NavBar() {
  const navRoutes = {
    landing: {
      first: { name: "Inicia sesion", link: "/login" },
      second: { name: "Registrate", link: "/register" },
      third: { name: "Reportar ticket", link: "/ticket" },
      logo: { link: "/landing" },
    },
    login: {
      first: { name: "Inicia sesion", link: "/login" },
      second: { name: "Registrate", link: "/register" },
      third: { name: "Reportar ticket", link: "/ticket" },
      logo: { link: "/login" },
    },
    register: {
      first: { name: "Inicia sesion", link: "/login" },
      second: { name: "Registrate", link: "/register" },
      third: { name: "Reportar ticket", link: "/ticket" },
      logo: { link: "/register" },
    },

    feed: {
      first: { name: "Cerrar sesion", link: "/logout" },
      second: { name: "Perfil", link: "/profile" },
      third: { name: "Reportar ticket", link: "/ticket" },
      logo: { link: "/feed" },
    },

    profile: {
      first: { name: "Cerrar sesion", link: "/logout" },
      second: { name: "Feed", link: "/feed" },
      third: { name: "Reportar ticket", link: "/ticket" },
      logo: { link: "/profile" },
    },
    dashboard: {
      first: { name: "Cerrar sesion", link: "/logout" },
      second: { name: "Feed", link: "/feed" },
      third: { name: "Reportar ticket", link: "/ticket" },
      logo: { link: "/dashboard" },
    },
    crud: {
      first: { name: "Cerrar sesion", link: "/logout" },
      second: { name: "Dashboard", link: "/dashboard" },
      third: { name: "Reportar ticket", link: "/ticket" },
      logo: { link: "/crud" },
    },
    chat: {
      first: { name: "Cerrar sesion", link: "/logout" },
      second: { name: "Dashboard", link: "/dashboard" },
      third: { name: "Reportar ticket", link: "/ticket" },
      logo: { link: "/chat" },
    },

    ticket: {
      first: { name: "Cerrar sesion", link: "/logout" },
      second: { name: "Feed", link: "/feed" },
      third: { name: "Perfil", link: "/profile" },
      logo: { link: "/register" },
    },
    default: {
      first: { name: "Registrate", link: "/register" },
      second: { name: "Inicia sesion", link: "/login" },
      third: { name: "Landing", link: "/landing" },
      logo: { link: "/landing" },
    },
  };

  const myLocation = useLocation();
  const locationName = myLocation.pathname.slice(1);
  const currentRoute = navRoutes[locationName] || navRoutes.default;

  const textStyles = {
    color:
      "text-white dark:text-white hover:text-black md:hover:text-gray-400 md:dark:hover:text-gray-400",
  };

  return (
    <Navbar className="bg-azul6 ">
      <Navbar.Brand href={`/#${currentRoute.logo.link}`}>
        <img
          src="../../public/img/logo1.png"
          className="mr-3 h-6 sm:h-9"
          alt="L&E Telecoms Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle className={`${textStyles.color}`} />
      <Navbar.Collapse>
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
