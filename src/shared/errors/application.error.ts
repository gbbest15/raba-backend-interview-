import { BaseError } from "./error";

export class ApplicationError extends BaseError {
    constructor(message: string) {
      super(message);
    }
  }