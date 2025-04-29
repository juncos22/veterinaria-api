export class ResponseDto<T> {
  success: boolean;
  message?: string;
  data?: T | T[];

  constructor(success: boolean, message?: string, data?: T | T[]) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}
