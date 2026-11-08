// Minimal structured logger (one JSON line per event).
const write = (level, message) =>
  process.stdout.write(`${JSON.stringify({ time: new Date().toISOString(), level, message })}\n`);

export const logger = {
  info: (message) => write('info', message),
  warn: (message) => write('warn', message),
  error: (message) => write('error', message),
};
