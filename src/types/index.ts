/**
 * @file index.ts
 * @description Defines types and interfaces used throughout the logger package.
 */

/**
 * Interface for logger options, specifying required options for initialization.
 * @interface LoggerOptions
 * @property {string} [level='info'] - The default log level.
 * @property {string} newRelicApiKey - The New Relic API Key
 * @property {string} newRelicApplicationId - The New Relic Application ID
 */

export interface LoggerOption {
  level?: string
  newRelicApiKey: string
  newRelicApplicationId: string
}

export interface RequestOptions {
  method: string
  url: string
  headers?: { [key: string]: string }
  body?: string
}
