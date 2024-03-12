/**
 * @file Logger.ts
 * @description Defines a base logger class with common logging functionality.
 */

import { Log } from '@/types'
import { LOGGER_TAGS } from '@/constants'

/**
 * Interface for logger options, specifying optional configurations for the logger.
 * @interface LoggerOptions
 * @property {boolean} [isEnabled=true] - Indicates whether the logger is enabled or not. Defaults to true.
 * @property {(error: any) => void} [customErrorHandler] - A custom error handler function.
 */
interface LoggerOptions {
  isEnabled?: boolean // Indicates whether the logger is enabled or not. Defaults to true.
  customErrorHandler?: (error: any) => void // A custom error handler function.
}

/**
 * Represents a base logger class with common logging functionality.
 * This class provides methods to log events at different levels (info, warning, error).
 * @class
 */
class Logger {
  protected options: LoggerOptions

  /**
   * Creates an instance of Logger.
   * @param {LoggerOptions} [options={}] - Optional configurations for the logger.
   */
  constructor(options: LoggerOptions = {}) {
    this.options = {
      isEnabled: true,
      customErrorHandler: undefined,
      ...options
    }
  }

  /**
   * Logs an event with the specified level.
   * @param {any} event - The event to log.
   * @param {any} message - The message associated with the event.
   * @param {string} [level=LOGGER_TAGS.INFO] - The log level.
   * @protected
   */
  protected log(event: any, message: any, level: string = LOGGER_TAGS.INFO) {
    const logMessage = `[${level.toUpperCase()}] | Event: ${event} | Message: ${String(message)}`

    // Check if logging is enabled
    if (this.options.isEnabled) {
      // Execute custom error handler if provided
      if (this.options.customErrorHandler) {
        try {
          this.options.customErrorHandler(logMessage)
        } catch (error) {
          console.error('Error in custom error handler:', error)
        }
      }
    }
  }

  /**
   * Logs an event with the INFO level.
   * @param {Log} params - The parameters containing the event and message to log.
   */
  public logInfo(params: Log) {
    this.log(params.event, params.message, LOGGER_TAGS.INFO)
  }

  /**
   * Logs an event with the WARNING level.
   * @param {Log} params - The parameters containing the event and message to log.
   */
  public logWarning(params: Log) {
    this.log(params.event, params.message, LOGGER_TAGS.WARNING)
  }

  /**
   * Logs an event with the ERROR level.
   * @param {Log} params - The parameters containing the event and message to log.
   */
  public logError(params: Log) {
    this.log(params.event, params.message, LOGGER_TAGS.ERROR)
  }
}

export default Logger
