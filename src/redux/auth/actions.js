import { USER_LOGIN, USER_LOGOUT } from "./constants";

export function userLogin(token, user, role, getDataApproved, getDataRejected) {
  return {
    type: USER_LOGIN,
    token,
    user,
    role,
    getDataApproved,
    getDataRejected,
  };
}

export function userLogout() {
  localStorage.removeItem("auth");
  return {
    type: USER_LOGOUT,
  };
}
