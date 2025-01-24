export const navRoutes = {
  landing: {
    first: { name: "Inicia sesion", link: "/login" },
    second: { name: "Registrate", link: "/register" },
    third: { name: "Reportar ticket", link: "/ticket" },
    logo: { link: "/landing" },
    drawer: {
      display: true,
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/ticket" },
      },
    },
  },
  login: {
    first: { name: "Inicia sesion", link: "/login" },
    second: { name: "Registrate", link: "/register" },
    third: { name: "Reportar ticket", link: "/ticket" },
    logo: { link: "/login" },
    drawer: {
      display: true,
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/ticket" },
      },
    },
  },
  register: {
    first: { name: "Inicia sesion", link: "/login" },
    second: { name: "Registrate", link: "/register" },
    third: { name: "Reportar ticket", link: "/ticket" },
    logo: { link: "/register" },
    drawer: {
      display: true,
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/ticket" },
      },
    },
  },

  feed: {
    first: { name: "Cerrar sesion", link: "/logout" },
    second: { name: "Perfil", link: "/profile" },
    third: { name: "Reportar ticket", link: "/ticket" },
    logo: { link: "/feed" },
    drawer: {
      display: true,
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/ticket" },
      },
    },
  },

  profile: {
    first: { name: "Cerrar sesion", link: "/logout" },
    second: { name: "Feed", link: "/feed" },
    third: { name: "Reportar ticket", link: "/ticket" },
    logo: { link: "/profile" },
    drawer: {
      display: true,
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/ticket" },
      },
    },
  },
  dashboard: {
    first: { name: "Cerrar sesion", link: "/logout" },
    second: { name: "Feed", link: "/feed" },
    third: { name: "Reportar ticket", link: "/ticket" },
    logo: { link: "/dashboard" },
    drawer: {
      display: true,
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/ticket" },
      },
    },
  },
  crud: {
    first: { name: "Cerrar sesion", link: "/logout" },
    second: { name: "Dashboard", link: "/dashboard" },
    third: { name: "Reportar ticket", link: "/ticket" },
    logo: { link: "/crud" },
    drawer: {
      display: true,
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/ticket" },
      },
    },
  },
  chat: {
    first: { name: "Cerrar sesion", link: "/logout" },
    second: { name: "Dashboard", link: "/dashboard" },
    third: { name: "Reportar ticket", link: "/ticket" },
    logo: { link: "/chat" },
    drawer: {
      display: true,
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/ticket" },
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
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/ticket" },
      },
    },
  },
  default: {
    first: { name: "Registrate", link: "/register" },
    second: { name: "Inicia sesion", link: "/login" },
    third: { name: "Landing", link: "/landing" },
    logo: { link: "/landing" },
    drawer: {
      display: true,
      buttons: {
        first: { name: "Cerrar sesion", link: "/logout" },
        second: { name: "Feed", link: "/feed" },
        third: { name: "Reportar ticket", link: "/ticket" },
      },
    },
  },
};
