import { Injectable, LoggerService } from '@nestjs/common';
import { getLogger, Configuration, configure, Logger } from 'log4js';
import { ConfigEnvService } from '../config/env/configenv.service';

@Injectable()
export class LogService implements LoggerService {
  private readonly log4jsLogger: Logger;
  private config = new ConfigEnvService(`${process.env.NODE_ENV || ''}.env`);
  constructor() {
    this.log4jsLogger = getLogger();

    const log4jsConfig: Configuration = {
      appenders: {
        app: {
          type: 'file',
          filename: `${this.config.get('PATH_LOG')}/api.log`,
          maxLogSize: 5242880,
          numBackups: 5,
        },
        errorFile: {
          type: 'file',
          filename: `${this.config.get('PATH_LOG')}/error.log`,
        },
        errors: {
          type: 'logLevelFilter',
          level: 'ERROR',
          appender: 'errorFile',
        },
      },
      categories: {
        default: {  appenders: ['app', 'errors'], level: 'INFO'}
      },
    };

    if (process.env.NODE_ENV !== 'production') {
      log4jsConfig.appenders.console = {
        type: 'console',
      };
      log4jsConfig.categories.default.appenders.push('console');
      log4jsConfig.categories.default.level = 'INFO';
    }

    configure(log4jsConfig);
  }

  log(message: string) {
      this.log4jsLogger.info(message);
  }
  error(message: string, trace: string) {
    this.log4jsLogger.error(message, trace);
  }
  warn(message: string) {
    this.log4jsLogger.warn(message);
  }

  debug(message: string) {
    this.log4jsLogger.info(message);
  }

}