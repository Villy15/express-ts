import dayjs from 'dayjs';
import logger from 'pino';

const log = logger({
  base: {
    pid: false,
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ')}"`,
});

export default log;
