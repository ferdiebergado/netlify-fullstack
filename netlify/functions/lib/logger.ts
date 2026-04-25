import pino from 'pino';

const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};

const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  customLevels: levels,
  useOnlyCustomLevels: true,
  formatters: {
    level: label => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    target: process.env.ENV === 'development' ? 'pino-pretty' : 'pino/file',
  },
  base: undefined,
});

export default logger;
