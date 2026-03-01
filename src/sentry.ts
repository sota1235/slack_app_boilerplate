import * as Sentry from "@sentry/node";

const environment = process.env.NODE_ENV;
const isProduction = process.env.NODE_ENV === "production";
let isInitialized = false;

export function initSentry() {
  if (isProduction && process.env.SENTRY_DSN !== undefined) {
    Sentry.init({
      release: "v0.0.1",
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: !isProduction,
      environment,
    });
    isInitialized = true;
  }
}

export function captureException(
  err: Error,
  hint?: Parameters<typeof Sentry.captureException>[1],
) {
  if (isProduction && isInitialized) {
    Sentry.captureException(err, hint);
  } else {
    console.error(err);
  }
}
