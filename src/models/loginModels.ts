export class LoginModel {
  UserName: string;
  Password: string;

  /**
   * constructor
   */
  constructor(userName: string = "", passWord: string = "") {
    this.UserName = userName;
    this.Password = passWord;
  }
}

export class LoginResponseModel {
  FullName: string;
  Image: string;
  RoleId: number;
  Token: string;
  UserId: string;

  constructor(
    fullName: string,
    image: string,
    roleId: number,
    token: string,
    userId: string
  ) {
    this.FullName = fullName;
    this.Image = image;
    this.RoleId = roleId;
    this.Token = token;
    this.UserId = userId;
  }
}
