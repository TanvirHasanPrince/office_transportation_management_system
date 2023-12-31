import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { errorlogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorlogger.error('uncaughtException detected', error);

  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`🛢Database is connected successfully`);

    server = app.listen(config.port, () => {
      logger.info(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    errorlogger.error('Failed to connect to MongoDB', err);
  }
}

main();

process.on('unhandledRejection', error => {
  if (server) {
    server.close(() => {
      errorlogger.error(error);
    });
  } else {
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');

  if (server) {
    server.close();
  }
});
