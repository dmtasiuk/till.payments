import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationException } from '../exceptions/validation.exception';
import { ValidationError } from 'class-validator';
import { v4 as uuid } from 'uuid';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Catching http exception
   * @param exception
   * @param host
   */
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const responseBody: any = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
      correlation_id: uuid(),
    };

    if (exception instanceof ValidationException) {
      responseBody.errors = this.convertValidationErrors(exception.getErrors());
      responseBody.message = exception.message;
    }

    response
      .status(status)
      .json(responseBody);
  }

  /**
   * Convert validation errors to human output
   * @param errors
   */
  convertValidationErrors(errors: any[]) {
    let output = {};
    errors.forEach((rule: ValidationError | {key: string, error: string}) => {
      if (rule instanceof ValidationError) {
        output[rule.property] = Object.keys(rule.constraints).map((key: string) => {
          return rule.constraints[key];
        });
        return;
      }
      output = Object.assign(output, rule);
    });
    return output;
  }
}
