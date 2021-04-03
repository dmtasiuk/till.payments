import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {

  private readonly _errors = [];

  constructor(message?: string | object | any, error = 'Validation error') {
    super(
      { message, error },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    this._errors = message
  }

  public getErrors(): any[] {
    return this._errors;
  }
}
