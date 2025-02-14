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

const toggleLike = (index) => {
  const element = document.querySelector(`[post-id='${index}']`);

  if (element.classList.contains("liked")) {
    element.classList.remove("liked");
    element.classList.add("not-liked");
  }

  if (element.classList.contains("not-liked")) {
    element.classList.remove("not-liked");
    element.classList.add("liked");
  }

  return index;
};

export { isSomeoneLogged, formatDate, toggleLike };
