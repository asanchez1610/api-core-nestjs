import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { LogService } from '../log/log.service';
  
  @Catch()
  export class HttpErrorFilter implements ExceptionFilter {

    constructor(
      private readonly logService: LogService
    ) {}

    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const errorResponse = {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message:
          status !== HttpStatus.INTERNAL_SERVER_ERROR
            ? exception.message.error || exception.message || null
            : 'Internal server error',
      };
  
      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logService.error(
          'Error',
          exception.stack
        );
      } else {
        this.logService.error(
          'Error',
          JSON.stringify(errorResponse)
        );
      }
  
      response.status(status).json(errorResponse);
    }
  }