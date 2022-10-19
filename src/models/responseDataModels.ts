export class ResponseDataType {
  Code: number;
  Message: ResponseMessageType;
  Data: never[];
  ErrorId: string;

  constructor(
    code: number = 0,
    message: ResponseMessageType = new ResponseMessageType("", ""),
    data: never[] = [],
    errorId: string = ""
  ) {
    this.Code = code;
    this.Message = message;
    this.Data = data;
    this.ErrorId = errorId;
  }
}

export class ResponseMessageType {
  Message: string = "";
  ExMessage: string = "";

  constructor(message: string, exMessage: string) {
    this.Message = message;
    this.ExMessage = exMessage;
  }
}
