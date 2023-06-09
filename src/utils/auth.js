export function getBasicAuth() {
  const username = localStorage.getItem("basicauth-username") || "";
  const password = localStorage.getItem("basicauth-password") || "";
  return { username: username, password: password };
}

export function setBasicAuth(username, password) {
  localStorage.setItem("basicauth-username", username);
  localStorage.setItem("basicauth-password", password);
}

export function removeBasicAuth() {
  localStorage.setItem("basicauth-username", "");
  localStorage.setItem("basicauth-password", "");
}
