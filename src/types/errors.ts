//this class is used to pass errors between the controllers and it's routes
export class Errors {
  message: string;
  code: number;
  constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
  }
}
