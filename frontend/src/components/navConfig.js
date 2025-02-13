export const navRoutes = {
  landing: {
    first: { name: "Inicia sesion", link: "/login" },
    second: { name: "Registrate", link: "/register" },
    third: { name: "Reportar ticket", link: "/createticket" },
    logo: { link: "/landing" },
    drawer: {
      display: true,
      title: "Menu",
      image: { src: "../../public/img/default-profile-icon.jpg" },
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/createticket" },
      },
    },
  },
  login: {
    first: { name: "Inicia sesion", link: "/login" },
    second: { name: "Registrate", link: "/register" },
    third: { name: "Cambio de clave", link: "/change-password" },
    logo: { link: "/login" },
    drawer: {
      display: false,
      title: "Menu",
      image: { src: "../../public/img/default-profile-icon.jpg" },
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/createticket" },
      },
    },
  },
  register: {
    first: { name: "Inicia sesion", link: "/login" },
    second: { name: "Registrate", link: "/register" },
    third: { name: "Reportar ticket", link: "/createticket" },
    logo: { link: "/register" },
    drawer: {
      display: false,
      title: "Menu",
      image: { src: "../../public/img/default-profile-icon.jpg" },
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/createticket" },
      },
    },
  },

  feed: {
    first: { name: "Cerrar sesion", link: "/logout" },
    second: { name: "Perfil", link: "/profile" },
    third: { name: "Reportar ticket", link: "/createticket" },
    logo: { link: "/feed" },
    drawer: {
      display: true,
      title: "Menu",
      image: { src: "../../public/img/default-profile-icon.jpg" },
      buttons: {
        first: { name: "Perfil", link: "/profile" },
        second: { name: "Chat", link: "/chat" },
        third: { name: "Ticket", link: "/createticket" },
      },
    },
  },

  profile: {
    first: { name: "Cerrar sesion", link: "/logout" },
    second: { name: "Feed", link: "/feed" },
    third: { name: "Reportar ticket", link: "/createticket" },
    logo: { link: "/profile" },
    drawer: {
      display: false,
      title: "Menu",
      image: { src: "../../public/img/default-profile-icon.jpg" },
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/createticket" },
      },
    },
  },
  dashboard: {
    first: { name: "Cerrar sesion", link: "/logout" },
    second: { name: "Feed", link: "/feed" },
    third: { name: "Reportar ticket", link: "/createticket" },
    logo: { link: "/dashboard" },
    drawer: {
      display: true,
      title: "Menu",
      image: { src: "../../public/img/default-profile-icon.jpg" },
      buttons: {
        first: { name: "Pedro Herrera", link: "/profile" },
        second: { name: "Chat", link: "/chat" },
        third: { name: "Reportar ticket", link: "/createticket" },
      },
    },
  },
  crud: {
    first: { name: "Cerrar sesion", link: "/logout" },
    second: { name: "Dashboard", link: "/dashboard" },
    third: { name: "Reportar ticket", link: "/createticket" },
    logo: { link: "/crud" },
    drawer: {
      display: true,
      title: "Menu",
      image: { src: "../../public/img/default-profile-icon.jpg" },
      buttons: {
        first: { name: "Pedro Herrera", link: "/profile" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/createticket" },
      },
    },
  },
  chat: {
    first: { name: "Cerrar sesion", link: "/logout" },
    second: { name: "Dashboard", link: "/dashboard" },
    third: { name: "Reportar ticket", link: "/createticket" },
    logo: { link: "/chat" },
    drawer: {
      display: true,
      title: "Menu",
      image: { src: "../../public/img/default-profile-icon.jpg" },
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/createticket" },
      },
    },
  },
  createticket: {
    first: { name: "Cerrar sesion", link: "/logout" },
    second: { name: "Feed", link: "/feed" },
    third: { name: "Perfil", link: "/profile" },
    logo: { link: "/register" },
    drawer: {
      display: true,
      title: "Menu",
      image: { src: "../../public/img/default-profile-icon.jpg" },
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/createticket" },
      },
    },
  },

  ticket: {
    first: { name: "Cerrar sesion", link: "/logout" },
    second: { name: "Feed", link: "/feed" },
    third: { name: "Perfil", link: "/profile" },
    logo: { link: "/register" },
    drawer: {
      display: true,
      title: "Menu",
      image: { src: "../../public/img/default-profile-icon.jpg" },
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/createticket" },
      },
    },
  },
  default: {
    first: { name: "Registrate", link: "/register" },
    second: { name: "Inicia sesion", link: "/login" },
    third: { name: "Landing", link: "/" },
    logo: { link: "/landing" },
    drawer: {
      display: false,
      title: "Menu",
      image: { src: "../../public/img/default-profile-icon.jpg" },
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/createticket" },
      },
    },
  },
};
