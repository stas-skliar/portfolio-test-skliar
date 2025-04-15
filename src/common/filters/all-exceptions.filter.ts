import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage =
      exception instanceof HttpException
        ? exception.getResponse()
        : String(exception);

    const maskedBody = this.maskSensitiveData(request.body);

    const userId = (request as any)?.user?.id ?? 'anonymous';

    const logPayload = {
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.url,
      statusCode: status,
      message: errorMessage,
      params: request.params,
      query: request.query,
      body: maskedBody,
      ip: request.ip,
      userId,
      stack: (exception as any)?.stack || '',
    };

    this.logger.error(logPayload);

    response.status(status).json({
      statusCode: status,
      message: errorMessage,
      timestamp: logPayload.timestamp,
      path: request.url,
    });
  }

  private maskSensitiveData(body: any): any {
    if (!body || typeof body !== 'object') return body;

    const clone = { ...body };

    const sensitiveFields = ['password', 'confirmPassword', 'token'];

    for (const field of sensitiveFields) {
      if (field in clone) {
        clone[field] = '[PROTECTED]';
      }
    }

    return clone;
  }
}
