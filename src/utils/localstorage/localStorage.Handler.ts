const setLocalStorageForLogin = () => {
  localStorage.setItem("is_logged", "true");
};

const removeLocalStorageForLogin = () => {
  localStorage.removeItem("is_logged");
};

const getLocalStorageForLogin = () => {
  const value = localStorage.getItem("is_logged");
  if (value === "true") return true;
  return false;
};

export {
  setLocalStorageForLogin,
  removeLocalStorageForLogin,
  getLocalStorageForLogin,
};
