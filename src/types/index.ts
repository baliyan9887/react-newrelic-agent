/**
 * @file index.ts
 * @description Defines types and interfaces used throughout the logger package.
 */

/**
 * Interface for logger options, specifying required options for initialization.
 * @interface LoggerOptions
 */

export interface LoggerOption {
  level?: string;
  newRelicApiKey: string;
  newRelicApplicationId: string;
}
