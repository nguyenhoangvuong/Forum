import { FULL_NAME, ROLE_ID, TOKEN, USER_ID, USER_IMAGE } from "../../utils/constants";

export class LocalStoreServices {
  static saveToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  static isExistToken() {
    return localStorage.getItem(TOKEN) === null ? false : true;
  }

  static removeToken() {
    localStorage.removeItem(TOKEN);
  }

  // static saveRoleID(roleID: string) {
  //   localStorage.setItem(ROLE_ID, roleID);
  // }

  // static getRoleID() {
  //   return localStorage.getItem(ROLE_ID);
  // }

  static saveUser(
    fullName: string,
    image: string,
    userId: string
  ) {
    // this.saveRoleID(String(roleId));
    localStorage.setItem(FULL_NAME, fullName);
    localStorage.setItem(USER_IMAGE, image);
    localStorage.setItem(USER_ID, userId);
  }

  static getCurrentUser(): {fullName: string | null, image: string | null, userId: string | null} {
      let fullName = localStorage.getItem(FULL_NAME);
      let image = localStorage.getItem(USER_IMAGE);
      let userId = localStorage.getItem(USER_ID);
      // let roleId = this.getRoleID();
      return {fullName, image, userId};
  }

  static removeUser() {
    // localStorage.removeItem(ROLE_ID);
    localStorage.removeItem(FULL_NAME);
    localStorage.removeItem(USER_IMAGE);
    localStorage.removeItem(USER_ID);
  }
}
