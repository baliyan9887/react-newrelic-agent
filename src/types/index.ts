/**
 * @file index.ts
 * @description Defines types and interfaces used throughout the logger package.
 */

/**
 * Interface for logger options, specifying required options for initialization.
 * @interface LoggerOptions
 * @property {string} [level='info'] - The default log level.
 * @property {string} newRelicApiKey - The New Relic API Key.
 * @property {string} newRelicApplicationId - The New Relic Application ID.
 */
export interface LoggerOptions {
  level?: string
  newRelicApiKey: string
  newRelicApplicationId: string
}

/**
 * Interface for HTTP request options.
 * @interface RequestOptions
 * @property {string} method - The HTTP method (e.g., 'GET', 'POST').
 * @property {string} url - The URL to send the request to.
 * @property {Object.<string, string>} [headers] - The optional headers for the request.
 * @property {string} [body] - The body of the request.
 */
export interface RequestOptions {
  method: string
  url: string
  headers?: { [key: string]: string }
  body?: string
}

/**
 * Interface for New Relic initialization parameters.
 * @interface NewRelicInitParams
 * @property {string} accountId - The New Relic account ID.
 * @property {string} applicationId - The New Relic application ID.
 * @property {string} browserLicenseKey - The New Relic browser license key.
 * @property {string} [ApiLicenseKey] - Optional API license key.
 * @property {string} [appName] - Optional application name.
 */
export interface NewRelicInitParams {
  accountId: string
  applicationId: string
  browserLicenseKey: string
  ApiLicenseKey?: string
  appName?: string
}

/**
 * Interface for logging events.
 * @interface Log
 * @property {any} event - The event being logged.
 * @property {any} message - The message associated with the event.
 */
export interface Log {
  event: any
  message: any
}
