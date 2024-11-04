import { BaseError } from "./error";


export class DomainError extends BaseError {
  constructor(message: string) {
    super(message);
  }
}