import LoggerService from '@/library/loggerService'
import type { LoggerOption } from '@/types'

/**
 * LoggerService instance for direct usage.
 * @type LoggerService | null
 */

let loggerServiceInstance: LoggerService | null = null

/**
 * Initialize the logger service with provided options.
 * @param {LoggerOptions} options - Options for logger initialization.
 */

function initializeLoggerService(options: LoggerOption): void {
  if (!loggerServiceInstance) {
    loggerServiceInstance = LoggerService.getInstance(options)
  } else {
    console.warn(
      'Logger Service is already initialized. Ignoring duplicate initialization.'
    )
  }
}

export default initializeLoggerService
