import { Either, left, right } from "../../shared/either";
import { DomainError } from "../../shared/errors/domain.error";


export class Price {
  private constructor(private readonly value: number) {}

  static create(value: number): Either<DomainError, Price> {
    if (value < 0) {
      return left(new DomainError('Price cannot be negative'));
    }
    return right(new Price(value));
  }

  getValue(): number {
    return this.value;
  }
}