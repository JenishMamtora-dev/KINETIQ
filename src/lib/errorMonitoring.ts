/**
 * Error Monitoring & Telemetry Hook (Sentry-ready)
 */

export function initErrorMonitoring() {
  const dsn = typeof window !== 'undefined' ? (window as unknown as { SENTRY_DSN?: string }).SENTRY_DSN : undefined;
  if (!dsn) {
    // Sentry not configured - telemetry operates in non-sensitive local logging mode
    return;
  }
}

export function captureException(error: Error | unknown, context?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'development') {
    console.error('[KINETIQ Telemetry Exception]:', error, context);
  }
  // In production with Sentry configured: Sentry.captureException(error, { extra: context });
}

export function logAuditEventLocally(action: string, details: string) {
  if (process.env.NODE_ENV === 'development') {
    console.info(`[KINETIQ Audit Log] [${new Date().toISOString()}] ${action}: ${details}`);
  }
}
