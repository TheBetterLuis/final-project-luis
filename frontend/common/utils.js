function isSomeoneLogged() {
  if (localStorage.getItem("tokenSesion")) {
    return true;
  } else {
    return false;
  }
}

export { isSomeoneLogged };
