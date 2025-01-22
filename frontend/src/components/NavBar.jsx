import {Navbar} from "flowbite-react";
import {useLocation} from "react-router-dom";

export function NavBar() {
  const myLocation = useLocation();
  const navRoutes = {
    feed: {
      first: {name: "feed", link: "/feed"}
      ,
      second: {name: "feed", link: "/feed"},
      third: {name: "feed", link: "/feed"},

    },

  };

  const locationName = myLocation.pathname.slice(1);
  const currentRoute = navRoutes[locationName];


  return (
    <Navbar className="bg-azul6">
      <Navbar.Brand href="#navbar">
        <img
          src="../../public/img/logo1.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href={`/#${currentRoute.first.link}`}>
          {currentRoute.first.name}
        </Navbar.Link>
        <Navbar.Link href={`/#${currentRoute.second.link}`}>
          {currentRoute.second.name}
        </Navbar.Link>
        <Navbar.Link href={`/#${currentRoute.third.link}`}>
          {currentRoute.third.name}


        </Navbar.Link>       <Navbar.Link href="#navbar">inicio de sesion</Navbar.Link>
        <Navbar.Link href="#navbar">registrate</Navbar.Link>
        <Navbar.Link href="#navbar">reportar ticket</Navbar.Link>
      </Navbar.Collapse>
    </Navbar >
  );
}

export default NavBar;

