import { BaseError } from "./error";

export class RepositoryError extends BaseError {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(message: string, public readonly originalError?: any) {
      super(message);
    }
  }
