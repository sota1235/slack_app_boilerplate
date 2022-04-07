import Sentry from '@sentry/node';

export abstract class AppError extends Error {
  abstract errorLevel: Sentry.Severity;
  abstract getExtras(): Record<string, any>;
}
