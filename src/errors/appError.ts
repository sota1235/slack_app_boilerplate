import type { SeverityLevel } from "@sentry/node";

export abstract class AppError extends Error {
  abstract errorLevel: SeverityLevel;
  abstract getExtras(): Record<string, any>;
}
