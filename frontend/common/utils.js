function isSomeoneLogged() {
  if (localStorage.getItem("tokenSesion")) {
    return true;
  } else {
    return false;
  }
}

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // getUTCMonth() returns 0-11, so we add 1
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

export { isSomeoneLogged, formatDate };
