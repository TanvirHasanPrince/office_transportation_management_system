// import { createLogger, format, transports } from 'winston';
// import path from 'path';
// import DailyRotateFile from 'winston-daily-rotate-file';

// //Custom log format

// const { combine, timestamp, label, printf, colorize } = format;

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   const date = new Date(timestamp);
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   const seconds = date.getSeconds();

//   return `${date.toDateString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
// });

// const logger = createLogger({
//   level: 'info',
//   format: combine(
//     label({ label: 'Office Transportation Management' }),
//     timestamp(),
//     myFormat,
//     colorize(),
//   ),
//   transports: [
//     new transports.Console(),
//     new DailyRotateFile({
//       filename: path.join(
//         process.cwd(),
//         'logs',
//         'winston',
//         'success',
//         'GM-%DATE%-success.log',
//       ),
//       datePattern: 'YYYY-MM-DD-HH',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//     }),
//   ],
// });

// const errorlogger = createLogger({
//   level: 'error',
//   format: combine(
//     label({ label: 'Office Transportation Management' }),
//     timestamp(),
//     myFormat,
//     colorize(),
//   ),
//   transports: [
//     new transports.Console(),
//     new DailyRotateFile({
//       filename: path.join(
//         process.cwd(),
//         'logs',
//         'winston',
//         'errors',
//         'GM-%DATE%-errors.log',
//       ),
//       datePattern: 'YYYY-MM-DD-HH',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//     }),
//   ],
// });

// export { logger, errorlogger };
