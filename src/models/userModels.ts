export class UserModel {
  _id: string;
  Address: string;
  DateCreated: string;
  DateUpdated: string;
  Email: string;
  FullName: string;
  Image: string;
  Password: string;
  Phone: string;
  RoleId: number;
  Status: number;
  UserName: string;

  constructor(
    _id: string = "",
    address: string = "",
    dateCreated: string = "",
    dateUpdated: string = "",
    email: string = "",
    fullName: string = "",
    image: string = "",
    password: string = "",
    phone: string = "",
    roleId: number = 3,
    status: number = 0,
    userName: string = ""
  ) {
    this._id = _id;
    this.Address = address;
    this.DateCreated = dateCreated;
    this.DateUpdated = dateUpdated;
    this.Email = email;
    this.FullName = fullName;
    this.Image = image;
    this.Password = password;
    this.Phone = phone;
    this.RoleId = roleId;
    this.Status = status;
    this.UserName = userName;
  }
}

export class UserUpdateModel {
  UserId: string;
  Password: string;
  FullName: string;
  Email: string;
  Phone: string;
  Address: string;
  Image: string;
  RoleId: number;
  AccountStatus: number;

  constructor(
    userId: string = "",
    password: string = "",
    fullName: string = "",
    email: string = "",
    phone: string = "",
    address: string = "",
    image: string = "",
    roleId: number = 3,
    accountStatus: number = 0
  ) {
    this.UserId = userId;
    this.Password = password;
    this.FullName = fullName;
    this.Email = email;
    this.Phone = phone;
    this.Address = address;
    this.Image = image;
    this.RoleId = roleId;
    this.AccountStatus = accountStatus;
  }
}

export class UserCreateModel {
  UserName: string;
  Password: string;
  FullName: string;
  Phone: string;
  Email: string;
  Address: string;
  Image: string;
  Role: number;

  constructor(
    userName: string = "",
    password: string = "",
    fullName: string = "",
    phone: string = "",
    email: string = "",
    address: string = "",
    image: string = "",
    role: number = 3
  ) {
    this.UserName = userName;
    this.Password = password;
    this.FullName = fullName;
    this.Phone = phone;
    this.Email = email;
    this.Address = address;
    this.Image = image;
    this.Role = role;
  }
}
